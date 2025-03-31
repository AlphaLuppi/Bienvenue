import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/';
	const provider = url.searchParams.get('provider') as string;

	//If we come back here from an OAuth page
	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			throw redirect(303, `/${next.slice(1)}`);
		} else {
			console.log('autre');
			console.log(error);
			throw redirect(503, '/signin/error');
		}
	}
};
