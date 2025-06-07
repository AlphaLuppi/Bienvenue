<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import '../../app.css';

	let email = '';
	let password = '';
</script>

<div class="container mx-auto flex min-h-screen items-center justify-center">
	<Card.Root class="w-full max-w-md">
		<Card.Header>
			<Card.Title>Se connecter</Card.Title>
			<Card.Description>Entrez vos identifiants pour accéder à votre compte</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" action="?/login" class="space-y-4">
				<div class="space-y-2">
					<label for="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						bind:value={email}
						class="w-full rounded-md border px-3 py-2"
						required
					/>
				</div>
				<div class="space-y-2">
					<label for="password">Mot de passe</label>
					<input
						type="password"
						id="password"
						name="password"
						bind:value={password}
						class="w-full rounded-md border px-3 py-2"
						required
					/>
				</div>
				<Button type="submit" class="w-full">Se connecter</Button>
				<Button type="submit" formaction="?/signup" class="w-full">S'inscrire</Button>
				<Button type="submit" formaction="?/oauth" value="google" name="provider" class="w-full">
					Se connecter avec Google
				</Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>
