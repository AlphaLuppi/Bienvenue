<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';
	import { AlignJustify, XIcon } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import logo from '$lib/images/bienvenue_logo_preview.png';
	
	// TODO: Ajouter les liens pertinents ici.
	const MENU_ITEMS = [
		{ id: 'features', label: 'Features', href: '#' },
		{ id: 'pricing', label: 'Pricing', href: '#' }
	] as const;

	let hamburgerMenuIsOpen = $state(false);

	function toggleOverflowHidden(node: HTMLElement) {
		node.addEventListener('click', () => {
			hamburgerMenuIsOpen = !hamburgerMenuIsOpen;
			const html = document.querySelector('html');
			if (html) {
				if (hamburgerMenuIsOpen) {
					html.classList.add('overflow-hidden');
				} else {
					html.classList.remove('overflow-hidden');
				}
			}
		});
	}
	let innerWidth = $state(0);
</script>

<svelte:window bind:innerWidth />
<header
	class="fixed left-0 top-0 z-50 w-full border-b backdrop-blur-md"
>
	<div class="container flex h-14 items-center justify-between">
		<a class="text-md flex items-center" href="/">
			<img src={logo} alt="Bienvenue" class="h-auto w-48 aspect-auto" />
		</a>

		<div class="ml-auto flex h-full items-center">
			<Button variant="outline" class="mr-6 text-sm" href="/signin">Se connecter</Button>
			<Button variant="default" class="mr-6 text-sm" href="/signup">S'inscrire</Button>
		</div>
		<button class="ml-6 md:hidden" use:toggleOverflowHidden>
			<span class="sr-only">Toggle menu</span>
			{#if hamburgerMenuIsOpen}
				<XIcon  strokeWidth={1.4} class='text-gray-300'/>
			{:else}
				<AlignJustify strokeWidth={1.4} class='text-gray-300' />
			{/if}
		</button>
	</div>
</header>

<nav
	class={cn(
		`fixed left-0 top-0 z-50 h-screen w-full overflow-auto `,
		{
			'pointer-events-none': !hamburgerMenuIsOpen
		},
		{
			'bg-background/70 backdrop-blur-md': hamburgerMenuIsOpen
		}
	)}
>
	{#if hamburgerMenuIsOpen === true}
		<div class="container flex h-14 items-center justify-between">
			<a class="text-md flex items-center" href="/"> Bienvenue </a>

			<button class="md:hidden" use:toggleOverflowHidden>
				<span class="sr-only">Toggle menu</span>
				{#if hamburgerMenuIsOpen}
					<XIcon strokeWidth={1.4} class='text-gray-300'/>
				{:else}
					<AlignJustify strokeWidth={1.4} class='text-gray-300'/>
				{/if}
			</button>
		</div>
		<ul
			in:fly={{ y: -30, duration: 400 }}
			class="flex flex-col uppercase ease-in md:flex-row md:items-center md:normal-case"
		>
			{#each MENU_ITEMS as item, i}
				<li class="border-grey-dark border-b py-0.5 pl-6 md:border-none">
					<a
						class="hover:text-grey flex h-[var(--navigation-height)] w-full items-center text-xl transition-[color,transform] duration-300 md:translate-y-0 md:text-sm md:transition-colors {hamburgerMenuIsOpen
							? '[&_a]:translate-y-0'
							: ''}"
						href={item.href}
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</nav>
