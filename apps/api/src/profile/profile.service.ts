import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UpdateProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
	constructor(private supabaseService: SupabaseService) {}

	async getProfile(userId: string) {
		const supabase = this.supabaseService.getAdminClient();

		const { data, error } = await supabase
			.from('profiles')
			.select('id, username, full_name, website, avatar_url, updated_at')
			.eq('id', userId)
			.single();

		if (error) {
			if (error.code === 'PGRST116') {
				throw new NotFoundException('Profile not found');
			}
			throw new BadRequestException(error.message);
		}

		return {
			success: true,
			profile: {
				id: data.id,
				username: data.username,
				fullName: data.full_name,
				website: data.website,
				avatarUrl: data.avatar_url,
				updatedAt: data.updated_at
			}
		};
	}

	async updateProfile(userId: string, dto: UpdateProfileDto) {
		const supabase = this.supabaseService.getAdminClient();

		const { data, error } = await supabase
			.from('profiles')
			.upsert({
				id: userId,
				full_name: dto.fullName,
				username: dto.username,
				website: dto.website,
				avatar_url: dto.avatarUrl,
				updated_at: new Date().toISOString()
			})
			.select()
			.single();

		if (error) {
			throw new BadRequestException(error.message);
		}

		return {
			success: true,
			profile: {
				id: data.id,
				username: data.username,
				fullName: data.full_name,
				website: data.website,
				avatarUrl: data.avatar_url,
				updatedAt: data.updated_at
			}
		};
	}
}
