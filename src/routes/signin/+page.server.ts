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

		//Managing OAuth login
		const provider = url.searchParams.get('provider') as Provider;
		if (provider) {
			const { data, error: err } = await supabase.auth.signInWithOAuth({
				provider: provider
			});
			if (err) {
				console.log(err);
				return fail(400, {
					message: "Une erreur d'authentification est survenue."
				});
			}
			console.log(data.url);
			throw redirect(303, data.url);
		}

		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			console.error(error);
			redirect(303, '/signin/error');
		} else {
			redirect(303, '/account');
		}
	}
};
