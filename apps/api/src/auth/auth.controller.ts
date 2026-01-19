import { Controller, Post, Body, UseGuards, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, SignInWithOtpDto, OAuthDto, ExchangeCodeDto, VerifyOtpDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthenticatedUser } from './strategies/supabase-jwt.strategy';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	async signUp(@Body() dto: SignUpDto) {
		return this.authService.signUp(dto.email, dto.password);
	}

	@Post('signin')
	async signIn(@Body() dto: SignInDto) {
		return this.authService.signIn(dto.email, dto.password);
	}

	@Post('signin/otp')
	async signInWithOtp(@Body() dto: SignInWithOtpDto) {
		return this.authService.signInWithOtp(dto.email);
	}

	@Post('oauth')
	async getOAuthUrl(@Body() dto: OAuthDto) {
		return this.authService.getOAuthUrl(dto.provider, dto.redirectUrl);
	}

	@Post('oauth/callback')
	async exchangeCodeForSession(@Body() dto: ExchangeCodeDto) {
		return this.authService.exchangeCodeForSession(dto.code);
	}

	@Post('verify-otp')
	async verifyOtp(@Body() dto: VerifyOtpDto) {
		return this.authService.verifyOtp(dto.tokenHash, dto.type);
	}

	@Post('signout')
	@UseGuards(JwtAuthGuard)
	async signOut(@Headers('authorization') auth: string) {
		const token = auth?.replace('Bearer ', '');
		return this.authService.signOut(token);
	}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	async getCurrentUser(@CurrentUser() user: AuthenticatedUser) {
		return { success: true, user };
	}
}
