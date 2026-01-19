// User and Session types (aligned with Supabase types)
export interface User {
	id: string;
	email: string;
	created_at: string;
	updated_at: string;
	user_metadata?: Record<string, unknown>;
}

export interface Profile {
	id: string;
	username: string | null;
	full_name: string | null;
	website: string | null;
	avatar_url: string | null;
	updated_at: string;
}

// API Request DTOs
export interface SignUpRequest {
	email: string;
	password: string;
}

export interface SignInRequest {
	email: string;
	password: string;
}

export interface SignInWithOtpRequest {
	email: string;
}

export type OAuthProvider = 'google' | 'github' | 'discord';

export interface OAuthRequest {
	provider: OAuthProvider;
	redirectUrl: string;
}

export interface UpdateProfileRequest {
	fullName?: string;
	username?: string;
	website?: string;
	avatarUrl?: string;
}

// API Responses
export interface AuthResponse {
	success: boolean;
	message?: string;
	redirectUrl?: string;
}

export interface SignInResponse {
	success: boolean;
	accessToken?: string;
	refreshToken?: string;
	user?: User;
	message?: string;
}

export interface OAuthResponse {
	success: boolean;
	url?: string;
	message?: string;
}

export interface ProfileResponse {
	success: boolean;
	profile?: Profile;
	message?: string;
}

export interface ApiError {
	statusCode: number;
	message: string;
	error?: string;
}
