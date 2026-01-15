import { IsEmail, IsOptional, IsString, IsObject } from 'class-validator';

export class AddToWaitlistDto {
	@IsEmail({}, { message: 'Please provide a valid email address' })
	email: string;

	@IsOptional()
	@IsString()
	source?: string;

	@IsOptional()
	@IsObject()
	metadata?: Record<string, unknown>;
}

export class WaitlistEntryDto {
	id: string;
	email: string;
	source: string;
	status: 'pending' | 'invited' | 'registered';
	metadata: Record<string, unknown>;
	created_at: string;
	updated_at: string;
}

export class WaitlistResponseDto {
	success: boolean;
	message: string;
	data?: WaitlistEntryDto;
}
