import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { profileApi, authApi } from '$lib/api/client';

export const load: PageServerLoad = async ({ locals }) => {
	const token = locals.getAccessToken();
	const user = locals.user;

	if (!token || !user) {
		redirect(303, '/signin');
	}

	// Profile is already loaded in hooks.server.ts as part of the user object
	return {
		user,
		profile: user.profile
	};
};

export const actions: Actions = {
	update: async ({ request, locals }) => {
		const formData = await request.formData();
		const fullName = formData.get('fullName') as string;
		const username = formData.get('username') as string;
		const avatarUrl = formData.get('avatarUrl') as string;

		const token = locals.getAccessToken();

		if (!token) {
			return fail(401, { message: 'Non authentifié' });
		}

		// Call NestJS API for profile update
		const result = await profileApi.updateProfile(token, {
			fullName,
			username,
			avatarUrl: avatarUrl || undefined
		});

		if (!result.success) {
			return fail(500, {
				message: result.error || 'Erreur lors de la mise à jour',
				fullName,
				username,
				avatarUrl
			});
		}

		return {
			success: true,
			fullName,
			username,
			avatarUrl
		};
	},

	signout: async ({ locals, cookies }) => {
		const token = locals.getAccessToken();

		if (token) {
			// Call backend to sign out
			await authApi.signOut(token);
		}

		// Clear auth cookies
		cookies.delete('access_token', { path: '/' });
		cookies.delete('refresh_token', { path: '/' });

		redirect(303, '/');
	}
};
