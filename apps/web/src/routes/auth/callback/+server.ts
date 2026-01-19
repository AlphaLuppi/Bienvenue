import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { authApi } from '$lib/api/client';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const next = url.searchParams.get('next') ?? '/account';

	if (!code) {
		redirect(303, '/signin/error?message=Code manquant');
	}

	// Exchange code for session via backend API
	const result = await authApi.exchangeCodeForSession(code);

	if (!result.success || !result.data?.session) {
		console.error('OAuth callback error:', result.error);
		redirect(303, `/signin/error?message=${encodeURIComponent(result.error || 'Erreur OAuth')}`);
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

	redirect(303, `/${next.replace(/^\//, '')}`);
};
