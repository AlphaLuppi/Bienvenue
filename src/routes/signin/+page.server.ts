import { redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import type { Provider } from '@supabase/supabase-js';

export const actions: Actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signUp({ email, password });
		if (error) {
			console.error(error);
			redirect(303, '/signin/error');
		} else {
			redirect(303, '/');
		}
	},

	login: async ({ request, locals: { supabase }, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			console.error(error);
			redirect(303, '/signin/error');
		} else {
			redirect(303, '/account');
		}
	},

	oauth: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const provider = formData.get('provider') as Provider;
		
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
