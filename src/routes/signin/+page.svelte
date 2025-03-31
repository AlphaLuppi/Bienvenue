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
