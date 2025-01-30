<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import "../app.css";
	import { cn } from "$lib/utils";
	import Header from "./Header.svelte";
	import InteractiveHover from "$lib/components/InteractiveHover.svelte";
	import WordsPullUp from "$lib/components/WordsPullUp.svelte";

	let jobs = [
		"Médecin,",
		"Boulanger,",
		"Epicier,",
		"Maçon,",
		"Plombier,",
		"Cuisinier,",
		"Electricien,",
	]
	let currentJob = 0;
	let interval: number;
	const browser = typeof window !== "undefined";

	const startInterval = () => {
		interval = setInterval(() => {
			currentJob = (currentJob + 1) % jobs.length;
		}, 2000);
	}
</script>

<!-- Header -->
<svelte:head>
	<title>Bienvenue</title>
	<meta name="description" content="Bienvenue est une plateforme permettant à n'importe quel citoyen de trouver une opportunité de nouvelle vie." />
</svelte:head>

<Header />

<section id="hero" class="relative mx-auto mt-32 max-w-7xl px-6 text-center md:px-8">

<h1
	class="text-5xl font-bold"
>
	<span class="inline-flex items-center gap-2">
		{#each jobs as job, i}
			{#if i === currentJob}
				<WordsPullUp
					class="text-5xl font-bold tracking-tight text-black dark:text-white md:text-3xl md:leading-[5rem]"
					words={job}
				/>
			{/if}
		{/each}
		<span class="text-5xl font-bold tracking-tight text-black dark:text-white md:text-3xl md:leading-[5rem]">
			le monde s'ouvre enfin à vous.
		</span>
	</span>
</h1>

{#if browser}
	{@const interval = startInterval()}
{/if}
<!-- Call to action -->
	<InteractiveHover text="Commencer" class="mt-10" />
</section>