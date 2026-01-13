import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
	sub: string;
	email: string;
	aud: string;
	role: string;
	exp: number;
	iat: number;
}

export interface AuthenticatedUser {
	id: string;
	email: string;
	role: string;
}

@Injectable()
export class SupabaseJwtStrategy extends PassportStrategy(Strategy, 'supabase-jwt') {
	constructor(private configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('SUPABASE_JWT_SECRET'),
			algorithms: ['HS256']
		});
	}

	async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
		if (!payload.sub) {
			throw new UnauthorizedException('Invalid token');
		}

		return {
			id: payload.sub,
			email: payload.email,
			role: payload.role
		};
	}
}
