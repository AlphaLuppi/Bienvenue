import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '../auth/strategies/supabase-jwt.strategy';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
	constructor(private profileService: ProfileService) {}

	@Get()
	async getProfile(@CurrentUser() user: AuthenticatedUser) {
		return this.profileService.getProfile(user.id);
	}

	@Put()
	async updateProfile(@CurrentUser() user: AuthenticatedUser, @Body() dto: UpdateProfileDto) {
		return this.profileService.updateProfile(user.id, dto);
	}
}
