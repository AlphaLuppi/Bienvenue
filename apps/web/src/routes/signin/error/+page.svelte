<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	// Get error from URL params if available
	let errorMessage = $derived($page.url.searchParams.get('message') || 'Une erreur est survenue lors de la connexion');
</script>

<div class="container mx-auto flex min-h-screen items-center justify-center px-4">
	<Card.Root class="w-full max-w-md">
		<Card.Header class="text-center">
			<Card.Title class="text-2xl text-red-600">Erreur de connexion</Card.Title>
		</Card.Header>
		<Card.Content class="space-y-4">
			<p class="text-center text-muted-foreground">{errorMessage}</p>
			<div class="flex justify-center">
				<Button href="/signin" variant="outline">Retour à la connexion</Button>
			</div>
		</Card.Content>
	</Card.Root>
</div>
