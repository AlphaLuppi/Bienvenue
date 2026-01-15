import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { AddToWaitlistDto, WaitlistEntryDto, WaitlistResponseDto } from './dto/waitlist.dto';

@Injectable()
export class WaitlistService {
	private readonly logger = new Logger(WaitlistService.name);

	constructor(private readonly supabaseService: SupabaseService) {}

	/**
	 * Add an email to the waitlist
	 */
	async addToWaitlist(dto: AddToWaitlistDto): Promise<WaitlistResponseDto> {
		const supabase = this.supabaseService.getAdminClient();

		// Check if email already exists
		const { data: existing } = await supabase
			.from('waitlist')
			.select('id, email')
			.eq('email', dto.email.toLowerCase().trim())
			.single();

		if (existing) {
			return {
				success: true,
				message: 'Vous êtes déjà sur la liste d\'attente!'
			};
		}

		// Insert new waitlist entry
		const { data, error } = await supabase
			.from('waitlist')
			.insert({
				email: dto.email.toLowerCase().trim(),
				source: dto.source || 'landing_page',
				metadata: dto.metadata || {}
			})
			.select()
			.single();

		if (error) {
			this.logger.error('Failed to add to waitlist:', error);

			if (error.code === '23505') {
				// Unique constraint violation
				return {
					success: true,
					message: 'Vous êtes déjà sur la liste d\'attente!'
				};
			}

			throw error;
		}

		this.logger.log(`New waitlist signup: ${dto.email}`);

		return {
			success: true,
			message: 'Merci! Vous êtes sur la liste d\'attente. Nous vous contacterons bientôt.',
			data: data as WaitlistEntryDto
		};
	}

	/**
	 * Get all waitlist entries (admin only)
	 */
	async getAllEntries(): Promise<WaitlistEntryDto[]> {
		const supabase = this.supabaseService.getAdminClient();

		const { data, error } = await supabase
			.from('waitlist')
			.select('*')
			.order('created_at', { ascending: false });

		if (error) {
			this.logger.error('Failed to fetch waitlist entries:', error);
			throw error;
		}

		return data as WaitlistEntryDto[];
	}

	/**
	 * Get waitlist count
	 */
	async getCount(): Promise<number> {
		const supabase = this.supabaseService.getAdminClient();

		const { count, error } = await supabase
			.from('waitlist')
			.select('*', { count: 'exact', head: true });

		if (error) {
			this.logger.error('Failed to get waitlist count:', error);
			throw error;
		}

		return count || 0;
	}

	/**
	 * Check if email is on waitlist
	 */
	async checkEmail(email: string): Promise<boolean> {
		const supabase = this.supabaseService.getAdminClient();

		const { data } = await supabase
			.from('waitlist')
			.select('id')
			.eq('email', email.toLowerCase().trim())
			.single();

		return !!data;
	}
}
