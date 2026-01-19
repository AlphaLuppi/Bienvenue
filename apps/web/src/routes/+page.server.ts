// src/routes/+page.server.ts
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { waitlistApi } from '$lib/api/client';

export const prerender = false;

export const load: PageServerLoad = async ({ url, locals }) => {
	// Get waitlist count for social proof
	let waitlistCount = 500; // Default fallback
	try {
		const countResult = await waitlistApi.getCount();
		if (countResult.success && countResult.data) {
			waitlistCount = Math.max(countResult.data.count, 500); // Show at least 500
		}
	} catch {
		// Keep default count on error
	}

	return {
		url: url.origin,
		user: locals.user,
		waitlistCount
	};
};

export const actions: Actions = {
	waitlist: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const validEmail = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email);

		if (!validEmail) {
			return fail(400, {
				success: false,
				errors: { email: 'Veuillez entrer une adresse email valide' },
				email
			});
		}

		try {
			const result = await waitlistApi.addToWaitlist(email, 'landing_page', {
				userAgent: request.headers.get('user-agent') || undefined,
				timestamp: new Date().toISOString()
			});

			if (!result.success) {
				return fail(500, {
					success: false,
					errors: { email: result.error || 'Une erreur est survenue' },
					email
				});
			}

			return {
				success: true,
				message: result.data?.message || 'Merci ! Vous êtes sur la liste d\'attente. Nous vous contacterons bientôt.'
			};
		} catch (error) {
			console.error('Waitlist error:', error);
			return fail(500, {
				success: false,
				errors: { email: 'Une erreur est survenue. Veuillez réessayer.' },
				email
			});
		}
	}
};
