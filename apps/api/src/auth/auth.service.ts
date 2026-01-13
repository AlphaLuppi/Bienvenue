import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import type { Provider } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
	constructor(private supabaseService: SupabaseService) {}

	async signUp(email: string, password: string) {
		const supabase = this.supabaseService.getClient();
		const { data, error } = await supabase.auth.signUp({
			email,
			password
		});

		if (error) {
			throw new BadRequestException(error.message);
		}

		return {
			success: true,
			user: data.user,
			session: data.session
		};
	}

	async signIn(email: string, password: string) {
		const supabase = this.supabaseService.getClient();
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			throw new UnauthorizedException(error.message);
		}

		return {
			success: true,
			session: data.session,
			user: data.user
		};
	}

	async signInWithOtp(email: string) {
		const supabase = this.supabaseService.getClient();

		const emailRegex = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,8}$/;
		if (!emailRegex.test(email)) {
			throw new BadRequestException('Please enter a valid email address');
		}

		const { error } = await supabase.auth.signInWithOtp({ email });

		if (error) {
			throw new BadRequestException('There was an issue. Please contact support.');
		}

		return {
			success: true,
			message: 'Please check your email for a magic link to log into the website.'
		};
	}

	async getOAuthUrl(provider: Provider, redirectUrl: string) {
		const supabase = this.supabaseService.getClient();

		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: redirectUrl
			}
		});

		if (error || !data.url) {
			throw new BadRequestException(error?.message || 'OAuth initialization failed');
		}

		return {
			success: true,
			url: data.url
		};
	}

	async signOut(jwt: string) {
		const supabase = this.supabaseService.getClientWithAuth(jwt);
		const { error } = await supabase.auth.signOut();

		if (error) {
			throw new BadRequestException(error.message);
		}

		return { success: true };
	}
}
