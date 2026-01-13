<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';

	let { data, form } = $props();

	let loading = $state(false);
	let successMessage = $state('');
	let errorMessage = $state('');

	// Derive initial values from props (reactive to data/form changes)
	let profileFullName = $derived(form?.fullName ?? data.profile?.fullName ?? '');
	let profileUsername = $derived(form?.username ?? data.profile?.username ?? '');
	let profileWebsite = $derived(form?.website ?? data.profile?.website ?? '');
	let profileAvatarUrl = $derived(form?.avatarUrl ?? data.profile?.avatarUrl ?? '');

	// Form fields for editing
	let fullName = $state('');
	let username = $state('');
	let website = $state('');
	let avatarUrl = $state('');

	// Sync form fields when profile data changes (on load or after form submission)
	$effect.pre(() => {
		fullName = profileFullName;
		username = profileUsername;
		website = profileWebsite;
		avatarUrl = profileAvatarUrl;
	});

	// Derived initials for avatar fallback
	let initials = $derived.by(() => {
		if (fullName) {
			return fullName
				.split(' ')
				.map((n: string) => n[0])
				.join('')
				.toUpperCase()
				.slice(0, 2);
		}
		if (data.user?.email) {
			return data.user.email.slice(0, 2).toUpperCase();
		}
		return '?';
	});

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		successMessage = '';
		errorMessage = '';

		return async ({ result }) => {
			loading = false;

			if (result.type === 'success') {
				successMessage = 'Profil mis à jour avec succès';
				setTimeout(() => (successMessage = ''), 3000);
			} else if (result.type === 'failure') {
				errorMessage = 'Erreur lors de la mise à jour du profil';
				setTimeout(() => (errorMessage = ''), 5000);
			}
		};
	};

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div class="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
	<Card.Root class="w-full max-w-md">
		<Card.Header class="text-center">
			<div class="mb-4 flex justify-center">
				<Avatar.Root class="h-24 w-24">
					{#if avatarUrl}
						<Avatar.Image src={avatarUrl} alt={fullName || 'Avatar'} />
					{/if}
					<Avatar.Fallback class="text-2xl">{initials}</Avatar.Fallback>
				</Avatar.Root>
			</div>
			<Card.Title class="text-2xl">Mon Profil</Card.Title>
			<Card.Description>Gérez vos informations personnelles</Card.Description>
		</Card.Header>

		<Card.Content>
			{#if successMessage}
				<div
					class="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400"
				>
					{successMessage}
				</div>
			{/if}

			{#if errorMessage}
				<div
					class="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400"
				>
					{errorMessage}
				</div>
			{/if}

			<form method="post" action="?/update" use:enhance={handleSubmit} class="space-y-4">
				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						type="email"
						value={data.user?.email ?? ''}
						disabled
						class="bg-muted"
					/>
				</div>

				<div class="space-y-2">
					<Label for="fullName">Nom complet</Label>
					<Input
						id="fullName"
						name="fullName"
						type="text"
						bind:value={fullName}
						placeholder="Votre nom complet"
					/>
				</div>

				<div class="space-y-2">
					<Label for="username">Nom d'utilisateur</Label>
					<Input
						id="username"
						name="username"
						type="text"
						bind:value={username}
						placeholder="@username"
					/>
				</div>

				<div class="space-y-2">
					<Label for="website">Site web</Label>
					<Input
						id="website"
						name="website"
						type="url"
						bind:value={website}
						placeholder="https://example.com"
					/>
				</div>

				<div class="space-y-2">
					<Label for="avatarUrl">URL de l'avatar</Label>
					<Input
						id="avatarUrl"
						name="avatarUrl"
						type="url"
						bind:value={avatarUrl}
						placeholder="https://example.com/avatar.jpg"
					/>
				</div>

				<Button type="submit" class="w-full" disabled={loading}>
					{loading ? 'Mise à jour...' : 'Mettre à jour le profil'}
				</Button>
			</form>
		</Card.Content>

		<Card.Footer class="flex flex-col gap-4">
			<div class="w-full border-t pt-4">
				<form method="post" action="?/signout" use:enhance={handleSignOut}>
					<Button variant="outline" class="w-full" disabled={loading}>
						Se déconnecter
					</Button>
				</form>
			</div>
		</Card.Footer>
	</Card.Root>
</div>
