import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { profileApi } from '$lib/api/client';

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
	const { session } = await safeGetSession();

	if (!session) {
		redirect(303, '/');
	}

	// Call NestJS API for profile data
	const result = await profileApi.getProfile(session.access_token);

	if (!result.success || !result.data) {
		return { session, profile: null };
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
		session,
		profile: {
			username: apiProfile.profile.username,
			full_name: apiProfile.profile.fullName,
			website: apiProfile.profile.website,
			avatar_url: apiProfile.profile.avatarUrl
		}
	};
};

export const actions: Actions = {
	update: async ({ request, locals: { safeGetSession } }) => {
		const formData = await request.formData();
		const fullName = formData.get('fullName') as string;
		const username = formData.get('username') as string;
		const website = formData.get('website') as string;
		const avatarUrl = formData.get('avatarUrl') as string;

		const { session } = await safeGetSession();

		if (!session) {
			return fail(401, { message: 'Not authenticated' });
		}

		// Call NestJS API for profile update
		const result = await profileApi.updateProfile(session.access_token, {
			fullName,
			username,
			website: website || undefined,
			avatarUrl: avatarUrl || undefined
		});

		if (!result.success) {
			return fail(500, {
				fullName,
				username,
				website,
				avatarUrl
			});
		}

		return {
			fullName,
			username,
			website,
			avatarUrl
		};
	},
	signout: async ({ locals: { supabase, safeGetSession } }) => {
		const { session } = await safeGetSession();
		if (session) {
			// Keep using Supabase directly for signout as it needs to clear cookies
			await supabase.auth.signOut();
			redirect(303, '/');
		}
	}
};
