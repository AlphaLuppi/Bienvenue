import { IsString, IsOptional, IsUrl } from 'class-validator';

export class UpdateProfileDto {
	@IsString()
	@IsOptional()
	fullName?: string;

	@IsString()
	@IsOptional()
	username?: string;

	@IsUrl()
	@IsOptional()
	avatarUrl?: string;
}
