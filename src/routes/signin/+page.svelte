<script>
	import { supabase } from '$lib/supabaseClient.js';

	function signInWithGoogle() {
		supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: 'http://localhost:5173/signin/confirmOAuth'
			}
		});
	}
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
	<button type="button" on:click={signInWithGoogle} class="btn">Google</button>
</form>
