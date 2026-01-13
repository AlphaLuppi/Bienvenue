<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import "../app.css";
	import { cn } from "$lib/utils";
	import Header from "./Header.svelte";
	import InteractiveHover from "$lib/components/InteractiveHover.svelte";
	import WordsPullUp from "$lib/components/WordsPullUp.svelte";
	import { fade, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
    import CardBody from "$lib/components/magic_card/CardBody.svelte";
    import CardContainer from "$lib/components/magic_card/CardContainer.svelte";
    import * as Form from "$lib/components/ui/form";
    import { onMount, onDestroy } from 'svelte';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import Phrase from "./Phrase.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import LifestyleFeatures from "$lib/components/LifestyleFeatures.svelte";
	import Separator from "$lib/components/Separator.svelte";
	import Testimonials from "$lib/components/Testimonials.svelte";
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let begin = $state(false);
	
	const jobs = ["médecin", "boulanger", "épicier"] as const;
	let currentJobIndex = $state(0);
	const currentJob = $derived(jobs[currentJobIndex % jobs.length]);

	const browser = typeof window !== "undefined";

	let typeAction = "";
	let typeBien = "";
	let localisationType = "";
	let localisationsResult: string[] = [];
	let metiersResult: string[] = [];
	let loisirsResult: string[] = [];

	// Utilisation de requestAnimationFrame pour une animation plus fluide
	let animationFrameId: number;
	let lastUpdate = 0;
	const UPDATE_INTERVAL = 2000; // 2 secondes

	function updateJob(timestamp: number) {
		if (!lastUpdate) lastUpdate = timestamp;
		const elapsed = timestamp - lastUpdate;

		if (elapsed >= UPDATE_INTERVAL) {
			currentJobIndex++;
			lastUpdate = timestamp;
		}

		animationFrameId = requestAnimationFrame(updateJob);
	}

	function handleSubmit() {
		console.log({
			typeAction,
			typeBien,
			localisationType,
			localisationsResult,
			metiersResult,
			loisirsResult
		});
	}

	function handleClose() {
		begin = false;
	}

	function handleOutsideClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleClose();
		}
	}

	onMount(() => {
		if (browser) {
			animationFrameId = requestAnimationFrame(updateJob);
		}
		document.addEventListener('keydown', handleKeydown);
		
		return () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<!-- Header -->
<svelte:head>
	<title>Bienvenue</title>
	<meta name="description" content="Bienvenue est une plateforme permettant à n'importe quel citoyen de trouver une opportunité de nouvelle vie." />
</svelte:head>

<Header user={data.user} />

<main class="relative">
	<div class="relative h-[600px]">
		<section id="hero" class="relative mx-auto mt-32 max-w-7xl px-6 text-center md:px-8">
			<div class="flex flex-col items-center">
				<h1 class="inline-flex bg-gradient-to-r from-[#ACACAC] via-[#363636] to-[#ACACAC] bg-[200%_auto] text-5xl text-center text-transparent font-medium bg-clip-text mb-16 animate-text-gradient will-change-transform">
					Le monde s'ouvre enfin à vous.
				</h1>
				
				<div class="flex flex-col items-center justify-center min-h-[120px] mb-16">
					<span class="inline-flex items-center gap-2 font-bold text-4xl">
						Vous êtes
						<span class="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem] will-change-transform gpu-accelerate">
							<WordsPullUp words={currentJob}/>
						</span>
						?
					</span>
				</div>

				<div class="flex items-center justify-center">
					{#if !begin}
						<InteractiveHover 
							text="Commencer" 
							bind:value={begin}
						/>
					{/if}
				</div>
			</div>
		</section>
	</div>

	{#if begin}
		<div class="fixed inset-0 z-50 flex items-center justify-center">
			<Phrase bind:begin={begin} />
		</div>
	{/if}

	<div class="relative bg-background">
		<Separator gradient={true} />
		<LifestyleFeatures />
		<Separator gradient={true} />
		<div class="container mx-auto px-4 py-16">
			<Testimonials />
		</div>
	</div>
</main>

<Footer />

<style>
	.gpu-accelerate {
		transform: translateZ(0);
		backface-visibility: hidden;
		perspective: 1000px;
	}
</style>