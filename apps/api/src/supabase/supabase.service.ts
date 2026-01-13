import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
	private supabase: SupabaseClient;
	private supabaseAdmin: SupabaseClient;

	constructor(private configService: ConfigService) {
		const supabaseUrl = this.configService.get<string>('SUPABASE_URL')!;
		const supabaseAnonKey = this.configService.get<string>('SUPABASE_ANON_KEY')!;
		const supabaseServiceKey = this.configService.get<string>('SUPABASE_SERVICE_KEY');

		// Regular client (respects RLS)
		this.supabase = createClient(supabaseUrl, supabaseAnonKey);

		// Admin client (bypasses RLS) - use for server-side operations
		if (supabaseServiceKey) {
			this.supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
		} else {
			this.supabaseAdmin = this.supabase;
		}
	}

	/**
	 * Get the regular Supabase client (respects RLS)
	 */
	getClient(): SupabaseClient {
		return this.supabase;
	}

	/**
	 * Get the admin Supabase client (bypasses RLS)
	 * Use this for server-side operations that need elevated privileges
	 */
	getAdminClient(): SupabaseClient {
		return this.supabaseAdmin;
	}

	/**
	 * Create a Supabase client with a user's JWT for row-level security
	 */
	getClientWithAuth(jwt: string): SupabaseClient {
		const supabaseUrl = this.configService.get<string>('SUPABASE_URL')!;
		const supabaseAnonKey = this.configService.get<string>('SUPABASE_ANON_KEY')!;

		return createClient(supabaseUrl, supabaseAnonKey, {
			global: {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			}
		});
	}
}
