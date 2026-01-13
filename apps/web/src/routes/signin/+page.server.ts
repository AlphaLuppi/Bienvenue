import { fail, redirect } from '@sveltejs/kit';
import { authApi } from '$lib/api/client';

import type { Actions } from './$types';

export const actions: Actions = {
	signup: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			return fail(400, { message: 'Email et mot de passe requis' });
		}

		if (password.length < 8) {
			return fail(400, { message: 'Le mot de passe doit contenir au moins 8 caractères' });
		}

		const result = await authApi.signUp(email, password);

		if (!result.success) {
			return fail(400, { message: result.error || 'Erreur lors de l\'inscription' });
		}

		// If session is returned (email confirmation disabled), store tokens
		const data = result.data as { session?: { access_token: string; refresh_token: string } };
		if (data?.session) {
			cookies.set('access_token', data.session.access_token, {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'lax',
				maxAge: 60 * 60 * 24 * 7 // 7 days
			});
			cookies.set('refresh_token', data.session.refresh_token, {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'lax',
				maxAge: 60 * 60 * 24 * 30 // 30 days
			});
			redirect(303, '/account');
		}

		// Email confirmation required
		redirect(303, '/signin?message=Vérifiez votre email pour confirmer votre inscription');
	},

	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			return fail(400, { message: 'Email et mot de passe requis' });
		}

		const result = await authApi.signIn(email, password);

		if (!result.success) {
			if (result.error === 'Invalid login credentials') {
				return fail(400, { message: 'Email ou mot de passe incorrect' });
			}
			return fail(400, { message: result.error || 'Erreur de connexion' });
		}

		const data = result.data as { session: { access_token: string; refresh_token: string } };

		// Store tokens in httpOnly cookies
		cookies.set('access_token', data.session.access_token, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});
		cookies.set('refresh_token', data.session.refresh_token, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 30 // 30 days
		});

		redirect(303, '/account');
	},

	oauth: async ({ request }) => {
		const formData = await request.formData();
		const provider = formData.get('provider') as string;

		if (!provider) {
			return fail(400, { message: 'Provider non spécifié' });
		}

		const origin = new URL(request.url).origin;
		const result = await authApi.getOAuthUrl(provider, `${origin}/auth/callback`);

		if (!result.success) {
			return fail(400, { message: result.error || 'Erreur OAuth' });
		}

		const data = result.data as { url: string };
		if (data?.url) {
			redirect(303, data.url);
		}

		return fail(500, { message: 'Une erreur est survenue lors de la connexion' });
	}
};
