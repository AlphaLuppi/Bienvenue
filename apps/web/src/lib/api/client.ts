import { env } from '$env/dynamic/private';

const API_BASE_URL = env.API_URL || 'http://localhost:3000';

interface RequestOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	body?: unknown;
	token?: string;
}

interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
}

export async function apiClient<T>(
	endpoint: string,
	options: RequestOptions = {}
): Promise<ApiResponse<T>> {
	const { method = 'GET', body, token } = options;

	const headers: Record<string, string> = {
		'Content-Type': 'application/json'
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	try {
		const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
			method,
			headers,
			body: body ? JSON.stringify(body) : undefined
		});

		const data = await response.json();

		if (!response.ok) {
			return {
				success: false,
				error: data.message || 'API request failed'
			};
		}

		return {
			success: true,
			data
		};
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Network error'
		};
	}
}

// Auth API methods
export const authApi = {
	signUp: (email: string, password: string) =>
		apiClient('/auth/signup', {
			method: 'POST',
			body: { email, password }
		}),

	signIn: (email: string, password: string) =>
		apiClient('/auth/signin', {
			method: 'POST',
			body: { email, password }
		}),

	signInWithOtp: (email: string) =>
		apiClient('/auth/signin/otp', {
			method: 'POST',
			body: { email }
		}),

	getOAuthUrl: (provider: string, redirectUrl: string) =>
		apiClient<{ url: string }>('/auth/oauth', {
			method: 'POST',
			body: { provider, redirectUrl }
		}),

	signOut: (token: string) =>
		apiClient('/auth/signout', {
			method: 'POST',
			token
		}),

	exchangeCodeForSession: (code: string) =>
		apiClient<{ session: { access_token: string; refresh_token: string }; user: unknown }>(
			'/auth/oauth/callback',
			{
				method: 'POST',
				body: { code }
			}
		),

	verifyOtp: (tokenHash: string, type: string) =>
		apiClient<{ session: { access_token: string; refresh_token: string }; user: unknown }>(
			'/auth/verify-otp',
			{
				method: 'POST',
				body: { tokenHash, type }
			}
		)
};

// Profile API methods
export const profileApi = {
	getProfile: (token: string) =>
		apiClient('/profile', {
			method: 'GET',
			token
		}),

	updateProfile: (
		token: string,
		data: {
			fullName?: string;
			username?: string;
			website?: string;
			avatarUrl?: string;
		}
	) =>
		apiClient('/profile', {
			method: 'PUT',
			token,
			body: data
		})
};
