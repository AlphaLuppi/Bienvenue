import { IsEmail, IsString, MinLength, IsIn } from 'class-validator';

export class SignUpDto {
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8)
	password: string;
}

export class SignInDto {
	@IsEmail()
	email: string;

	@IsString()
	password: string;
}

export class SignInWithOtpDto {
	@IsEmail()
	email: string;
}

export class OAuthDto {
	@IsString()
	@IsIn(['google', 'github', 'discord'])
	provider: 'google' | 'github' | 'discord';

	@IsString()
	redirectUrl: string;
}

export class ExchangeCodeDto {
	@IsString()
	code: string;
}

export class VerifyOtpDto {
	@IsString()
	tokenHash: string;

	@IsString()
	type: string;
}
