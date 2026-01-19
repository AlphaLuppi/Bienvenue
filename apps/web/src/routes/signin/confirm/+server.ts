import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { authApi } from '$lib/api/client';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const tokenHash = url.searchParams.get('token_hash');
	const type = url.searchParams.get('type');
	const next = url.searchParams.get('next') ?? '/account';

	// Clean up the redirect URL
	const redirectTo = new URL(url);
	redirectTo.pathname = next;
	redirectTo.searchParams.delete('token_hash');
	redirectTo.searchParams.delete('type');

	if (!tokenHash || !type) {
		redirectTo.pathname = '/signin/error';
		redirect(303, redirectTo);
	}

	// Verify OTP via backend API
	const result = await authApi.verifyOtp(tokenHash, type);

	if (!result.success || !result.data?.session) {
		redirectTo.pathname = '/signin/error';
		redirect(303, redirectTo);
	}

	// Store tokens in httpOnly cookies
	cookies.set('access_token', result.data.session.access_token, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7 // 7 days
	});
	cookies.set('refresh_token', result.data.session.refresh_token, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 30 // 30 days
	});

	redirectTo.searchParams.delete('next');
	redirect(303, redirectTo);
};
