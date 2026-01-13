// src/routes/+page.server.ts
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { authApi } from '$lib/api/client';

export const prerender = false;

export const load: PageServerLoad = async ({ url, locals: { safeGetSession } }) => {
	const { session } = await safeGetSession();

	// if the user is already logged in return them to the account page
	if (session) {
		console.log('Already logged in');
	}

	return { url: url.origin };
};

export const actions: Actions = {
	default: async (event) => {
		const { request } = event;
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const validEmail = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email);

		if (!validEmail) {
			return fail(400, { errors: { email: 'Please enter a valid email address' }, email });
		}

		const result = await authApi.signInWithOtp(email);

		if (!result.success) {
			return fail(400, {
				success: false,
				email,
				message: result.error || 'There was an issue, Please contact support.'
			});
		}

		return {
			success: true,
			message: 'Please check your email for a magic link to log into the website.'
		};
	}
};
