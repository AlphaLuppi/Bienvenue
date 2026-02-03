<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { AlignJustify, XIcon, LogOut, Settings } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import logo from '$lib/images/bienvenue_logo_preview.png';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	interface Props {
		user?: {
			id: string;
			email: string;
			profile?: {
				username: string | null;
				fullName: string | null;
				avatarUrl: string | null;
			} | null;
		} | null;
	}

	let { user = null }: Props = $props();

	const MENU_ITEMS_GUEST = [
		{ id: 'connection', label: 'Connexion', href: '/signin' },
		{ id: 'inscription', label: 'Inscription', href: '/signup' }
	] as const;

	let initials = $derived.by(() => {
		if (user?.profile?.fullName) {
			return user.profile.fullName
				.split(' ')
				.map((n: string) => n[0])
				.join('')
				.toUpperCase()
				.slice(0, 2);
		}
		if (user?.email) {
			return user.email.slice(0, 2).toUpperCase();
		}
		return '?';
	});

	let hamburgerMenuIsOpen = $state(false);

	function toggleOverflowHidden(node: HTMLElement) {
		node.addEventListener('click', () => {
			hamburgerMenuIsOpen = !hamburgerMenuIsOpen;
			const html = document.querySelector('html');
			if (html) {
				html.classList.toggle('overflow-hidden', hamburgerMenuIsOpen);
			}
		});
	}
</script>

<header class="fixed left-0 top-0 z-50 w-full border-b bg-background">
	<div class="container flex h-14 items-center justify-between">
		<a href="/" class="flex items-center">
			<img src={logo} alt="Bienvenue" class="h-8 w-auto md:h-auto md:w-48" />
		</a>

		<div class="ml-auto hidden md:flex h-full items-center">
			{#if user}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="flex items-center gap-2 mr-6 cursor-pointer hover:opacity-80 transition-opacity">
						<Avatar.Root class="h-8 w-8">
							{#if user.profile?.avatarUrl}
								<Avatar.Image src={user.profile.avatarUrl} alt={user.profile?.fullName || 'Avatar'} />
							{/if}
							<Avatar.Fallback class="text-xs">{initials}</Avatar.Fallback>
						</Avatar.Root>
						<span class="text-sm font-medium">
							{user.profile?.fullName || user.profile?.username || 'Mon compte'}
						</span>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end" class="w-56">
						<DropdownMenu.Label>
							<div class="flex flex-col space-y-1">
								<p class="text-sm font-medium">{user.profile?.fullName || 'Utilisateur'}</p>
								<p class="text-xs text-muted-foreground">{user.email}</p>
							</div>
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item href="/account" class="cursor-pointer">
							<Settings class="mr-2 h-4 w-4" />
							Mon compte
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<form method="POST" action="/account?/signout" class="w-full">
							<button type="submit" class="w-full">
								<DropdownMenu.Item class="cursor-pointer text-destructive focus:text-destructive">
									<LogOut class="mr-2 h-4 w-4" />
									Se déconnecter
								</DropdownMenu.Item>
							</button>
						</form>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<Button variant="outline" class="mr-6 text-sm" href="/signin">Se connecter</Button>
				<Button variant="default" class="mr-6 text-sm" href="/signup">S'inscrire</Button>
			{/if}
		</div>

		<button class="ml-6 md:hidden" use:toggleOverflowHidden>
			<span class="sr-only">Toggle menu</span>
			{#if hamburgerMenuIsOpen}
				<XIcon strokeWidth={1.4} class="text-gray-300"/>
			{:else}
				<AlignJustify strokeWidth={1.4} class="text-gray-300" />
			{/if}
		</button>
	</div>
</header>

{#if hamburgerMenuIsOpen}
	<nav class="fixed inset-0 z-50 bg-background">
		<div class="container flex h-14 items-center justify-between">
			<a href="/" class="flex items-center">
				<img src={logo} alt="Bienvenue" class="h-8 w-auto md:h-auto md:w-48" />
			</a>
			<button class="md:hidden" use:toggleOverflowHidden>
				<span class="sr-only">Toggle menu</span>
				<XIcon strokeWidth={1.4} class="text-gray-300"/>
			</button>
		</div>

		<div class="container">
			{#if user}
				<div in:fly={{ y: -30, duration: 400 }} class="flex items-center gap-3 border-b border-gray-200 py-4">
					<Avatar.Root class="h-10 w-10">
						{#if user.profile?.avatarUrl}
							<Avatar.Image src={user.profile.avatarUrl} alt={user.profile?.fullName || 'Avatar'} />
						{/if}
						<Avatar.Fallback>{initials}</Avatar.Fallback>
					</Avatar.Root>
					<div>
						<p class="font-medium">{user.profile?.fullName || user.profile?.username || 'Utilisateur'}</p>
						<p class="text-sm text-muted-foreground">{user.email}</p>
					</div>
				</div>
				<ul in:fly={{ y: -30, duration: 400 }} class="flex flex-col space-y-4 pt-4">
					<li class="border-b border-gray-200 py-2">
						<a href="/account" class="flex items-center gap-2 text-lg hover:text-primary">
							<Settings class="h-5 w-5" />
							Mon compte
						</a>
					</li>
					<li class="border-b border-gray-200 py-2">
						<form method="POST" action="/account?/signout">
							<button type="submit" class="flex items-center gap-2 text-lg text-destructive hover:text-destructive/80">
								<LogOut class="h-5 w-5" />
								Se déconnecter
							</button>
						</form>
					</li>
				</ul>
			{:else}
				<ul in:fly={{ y: -30, duration: 400 }} class="flex flex-col space-y-4 pt-4">
					{#each MENU_ITEMS_GUEST as item (item.id)}
						<li class="border-b border-gray-200 py-2">
							<a href={item.href} class="block text-lg hover:text-primary">
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</nav>
{/if}
