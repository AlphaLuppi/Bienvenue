import { redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import type { Provider } from '@supabase/supabase-js';

export const actions: Actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		// Use Supabase directly for signup since session cookies are handled here
		const { error } = await supabase.auth.signUp({ email, password });
		if (error) {
			console.error('Signup error:', error);
			redirect(303, `/signin/error?message=${encodeURIComponent(error.message)}`);
		} else {
			redirect(303, '/');
		}
	},

	login: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		// Use Supabase directly for login since session cookies are handled here
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			console.error('Login error:', error);
			redirect(303, `/signin/error?message=${encodeURIComponent(error.message)}`);
		} else {
			redirect(303, '/account');
		}
	},

	oauth: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const provider = formData.get('provider') as Provider;

		// Use Supabase directly for OAuth since redirect URL handling needs cookies
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${new URL(request.url).origin}/auth/callback`
			}
		});

		if (data.url) {
			redirect(303, data.url);
		} else {
			console.error(error);
		}
	}
};
