<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';
	import { AlignJustify, XIcon } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import logo from '$lib/images/bienvenue_logo_preview.png';
	
	const MENU_ITEMS = [
		{ id: 'connection', label: 'Connexion', href: '/signin' },
		{ id: 'inscription', label: 'Inscription', href: '/signin' }
	] as const;

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
			<Button variant="outline" class="mr-6 text-sm" href="/signin">Se connecter</Button>
			<Button variant="default" class="mr-6 text-sm" href="/signin">S'inscrire</Button>
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
			<ul in:fly={{ y: -30, duration: 400 }} class="flex flex-col space-y-4 pt-4">
				{#each MENU_ITEMS as item (item.id)}
					<li class="border-b border-gray-200 py-2">
						<a href={item.href} class="block text-lg hover:text-primary">
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
{/if}
