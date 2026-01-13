import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { profileApi, authApi } from '$lib/api/client';

export const load: PageServerLoad = async ({ locals }) => {
	const token = locals.getAccessToken();
	const user = locals.user;

	if (!token || !user) {
		redirect(303, '/signin');
	}

	// Call NestJS API for profile data
	const result = await profileApi.getProfile(token);

	if (!result.success || !result.data) {
		return { user, profile: null };
	}

	// Map API response to expected format
	const apiProfile = result.data as {
		profile: {
			username: string | null;
			fullName: string | null;
			website: string | null;
			avatarUrl: string | null;
		};
	};

	return {
		user,
		profile: {
			username: apiProfile.profile.username,
			fullName: apiProfile.profile.fullName,
			website: apiProfile.profile.website,
			avatarUrl: apiProfile.profile.avatarUrl
		}
	};
};

export const actions: Actions = {
	update: async ({ request, locals }) => {
		const formData = await request.formData();
		const fullName = formData.get('fullName') as string;
		const username = formData.get('username') as string;
		const website = formData.get('website') as string;
		const avatarUrl = formData.get('avatarUrl') as string;

		const token = locals.getAccessToken();

		if (!token) {
			return fail(401, { message: 'Non authentifié' });
		}

		// Call NestJS API for profile update
		const result = await profileApi.updateProfile(token, {
			fullName,
			username,
			website: website || undefined,
			avatarUrl: avatarUrl || undefined
		});

		if (!result.success) {
			return fail(500, {
				message: result.error || 'Erreur lors de la mise à jour',
				fullName,
				username,
				website,
				avatarUrl
			});
		}

		return {
			success: true,
			fullName,
			username,
			website,
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
