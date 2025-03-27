import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {
	const provider = url.searchParams.get('provider') as string;
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/';

	if (provider) {
		console.log(`Provider détecté : ${provider}`);

		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: provider,
			options: {
				redirectTo: 'http://localhost:5173/signin/confirmOAuth',
				queryParams: { access_type: 'offline', prompt: 'consent' }
			}
		});

		if (error) {
			console.log(error);
			throw redirect(300, '/signin/error');
		}

		console.log(`Redirection vers : ${data.url}`);
		throw redirect(303, data.url);
	}

	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			throw redirect(303, `/${next.slice(1)}`);
		} else {
			console.log(error);
			throw redirect(303, '/signin/error');
		}
	}

	return {};
};
