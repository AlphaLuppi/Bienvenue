<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { goto } from '$app/navigation';

	function navigateToProvider(provider) {
		const url = new URL('/signin/confirmOAuth', window.location.origin);
		url.searchParams.set('provider', provider);
		goto(url.toString());
	}

	const signInWithGoogle = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${window.location.origin}/auth/callback`,
		},
		});
		
		if (error) console.error('Erreur lors de la connexion avec Google:', error.message);
	};
</script>

<form method="POST" action="?/login">
	<label>
		Email
		<input name="email" type="email" />
	</label>
	<label>
		Password
		<input name="password" type="password" />
	</label>
	<button type="submit">Login</button>
	<button type="button" formaction="?/signup">Sign up</button>

	<button formaction="?/oauth" value="google" name="provider">Sign in with Google</button>
</form>

<button on:click={() => navigateToProvider('google')}> Se connecter avec Google </button>
