<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import Header from './Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { cubicOut, quintOut } from 'svelte/easing';
	import {
		Play,
		ArrowRight,
		MapPin,
		Sparkles,
		CheckCircle2,
		Home,
		Briefcase,
		Heart,
		Star,
		Check,
		Sun,
		ChevronDown,
		Shield,
		Clock,
		Users
	} from 'lucide-svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	// State for parallax and interactions
	let scrollY = $state(0);
	let isVideoPlaying = $state(false);
	let email = $state('');
	let isSubmitting = $state(false);
	let mounted = $state(false);

	// Intersection observer refs
	let heroRef: HTMLElement | null = $state(null);
	let statsRef: HTMLElement | null = $state(null);
	let stepsRef: HTMLElement | null = $state(null);
	let videoRef: HTMLElement | null = $state(null);
	let trustRef: HTMLElement | null = $state(null);
	let ctaRef: HTMLElement | null = $state(null);

	let heroVisible = $state(false);
	let statsVisible = $state(false);
	let stepsVisible = $state(false);
	let videoVisible = $state(false);
	let trustVisible = $state(false);
	let ctaVisible = $state(false);

	// Animated counter state
	let userCount = $state(0);
	let regionCount = $state(0);
	let satisfactionCount = $state(0);
	const targetUserCount = data.waitlistCount || 2500;
	const targetRegionCount = 96;
	const targetSatisfactionCount = 98;

	// Counter animation
	function animateCounter(target: number, setter: (val: number) => void, duration: number = 2000) {
		const start = performance.now();
		const step = (timestamp: number) => {
			const progress = Math.min((timestamp - start) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			setter(Math.floor(target * eased));
			if (progress < 1) {
				requestAnimationFrame(step);
			}
		};
		requestAnimationFrame(step);
	}

	onMount(() => {
		mounted = true;
		document.documentElement.style.scrollBehavior = 'smooth';

		const observerOptions = {
			threshold: 0.15,
			rootMargin: '0px 0px -10% 0px'
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.target === heroRef && entry.isIntersecting) heroVisible = true;
				if (entry.target === statsRef && entry.isIntersecting) {
					if (!statsVisible) {
						statsVisible = true;
						animateCounter(targetUserCount, (v) => userCount = v);
						animateCounter(targetRegionCount, (v) => regionCount = v);
						animateCounter(targetSatisfactionCount, (v) => satisfactionCount = v);
					}
				}
				if (entry.target === stepsRef && entry.isIntersecting) stepsVisible = true;
				if (entry.target === videoRef && entry.isIntersecting) videoVisible = true;
				if (entry.target === trustRef && entry.isIntersecting) trustVisible = true;
				if (entry.target === ctaRef && entry.isIntersecting) ctaVisible = true;
			});
		}, observerOptions);

		if (heroRef) observer.observe(heroRef);
		if (statsRef) observer.observe(statsRef);
		if (stepsRef) observer.observe(stepsRef);
		if (videoRef) observer.observe(videoRef);
		if (trustRef) observer.observe(trustRef);
		if (ctaRef) observer.observe(ctaRef);

		setTimeout(() => {
			heroVisible = true;
		}, 100);

		return () => {
			observer.disconnect();
			document.documentElement.style.scrollBehavior = '';
		};
	});

	function handleVideoClick() {
		isVideoPlaying = !isVideoPlaying;
	}

	function scrollToSteps() {
		stepsRef?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// Parallax calculations
	const parallaxOffset = $derived(scrollY * 0.3);
	const parallaxOffsetSlow = $derived(scrollY * 0.15);
	const parallaxOffsetFast = $derived(scrollY * 0.5);

	const steps = [
		{
			title: 'Partagez vos envies',
			desc: 'Dites-nous ce qui compte pour vous : style de vie, métier, loisirs...'
		},
		{
			title: 'Explorez les possibilités',
			desc: 'Notre carte interactive révèle les lieux qui matchent avec vos critères'
		},
		{
			title: 'Vivez votre nouvelle vie',
			desc: 'Découvrez des opportunités concrètes : logements, emplois, communautés'
		}
	];

	const imaginePoints = [
		'Vous travaillez dans un métier qui vous passionne',
		'Vous vivez dans un endroit qui vous ressemble',
		'Vous êtes entouré de personnes qui partagent vos valeurs'
	];

	const trustBadges = [
		{ icon: Shield, text: 'Données sécurisées' },
		{ icon: Clock, text: 'Disponible 24/7' },
		{ icon: Users, text: 'Support dédié' }
	];
</script>

<svelte:window bind:scrollY />

<svelte:head>
	<title>Bienvenue - Trouvez votre nouvelle vie</title>
	<meta name="description"
				content="Bienvenue vous aide à découvrir de nouvelles opportunités de vie. Rejoignez notre liste d'attente et soyez parmi les premiers à explorer." />
</svelte:head>

<Header user={data.user} />

<main class="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-green-50/30 to-white dark:from-emerald-950/20 dark:via-green-950/10 dark:to-background">

	<!-- Fixed Parallax Background -->
	<div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
		<!-- Large gradient orbs with parallax -->
		<div
			class="absolute -top-40 -right-40 w-[700px] h-[700px] bg-gradient-to-br from-emerald-200/40 via-green-300/20 to-transparent rounded-full blur-3xl"
			style="transform: translateY({parallaxOffsetSlow}px)"
		></div>
		<div
			class="absolute top-1/3 -left-60 w-[600px] h-[600px] bg-gradient-to-tr from-green-300/30 via-emerald-200/20 to-transparent rounded-full blur-3xl"
			style="transform: translateY({parallaxOffset}px)"
		></div>
		<div
			class="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-gradient-to-tl from-emerald-200/25 via-green-100/15 to-transparent rounded-full blur-3xl"
			style="transform: translateY({-parallaxOffsetSlow}px)"
		></div>

		<!-- Floating particles -->
		<div class="absolute top-32 left-1/4 w-3 h-3 bg-emerald-400/40 rounded-full animate-float"></div>
		<div class="absolute top-48 right-1/3 w-4 h-4 bg-green-400/30 rounded-full animate-float" style="animation-delay: 1s"></div>
		<div class="absolute top-64 left-1/3 w-2 h-2 bg-emerald-500/30 rounded-full animate-float" style="animation-delay: 2s"></div>
		<div class="absolute top-96 right-1/4 w-5 h-5 bg-green-300/25 rounded-full animate-float" style="animation-delay: 0.5s"></div>
		<div class="absolute top-80 left-1/5 w-3 h-3 bg-emerald-300/35 rounded-full animate-float" style="animation-delay: 1.5s"></div>
	</div>

	<!-- Hero Section: Split Layout -->
	<section
		bind:this={heroRef}
		class="relative min-h-screen flex items-center pt-20 pb-20"
	>
		<div class="container mx-auto px-6 relative z-10">
			<div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
				<!-- Left: Content -->
				<div class="space-y-8">
					{#if mounted}
						<!-- Badge with shimmer -->
						<div
							class={cn(
								"transition-all duration-700 ease-out",
								heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
							)}
						>
							<span
								class="relative inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full text-emerald-700 dark:text-emerald-300 text-sm font-medium overflow-hidden group">
								<Sun class="w-4 h-4 animate-pulse" />
								Une nouvelle façon de vivre
								<span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
							</span>
						</div>

						<h1
							class={cn(
								"text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-1000 delay-100 ease-out",
								heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
							)}
						>
							<span class="text-gray-900 dark:text-white">Trouvez l'endroit où</span>
							<br />
							<span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 animate-text-gradient bg-[200%_auto]">
								votre vie s'épanouit
							</span>
						</h1>

						<p
							class={cn(
								"text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-all duration-1000 delay-200 ease-out",
								heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
							)}
						>
							Bienvenue repense la façon dont vous cherchez un lieu de vie.
							Plus qu'une maison, découvrez l'endroit qui correspond à vos aspirations
							professionnelles et personnelles.
						</p>

						<!-- Emotional storytelling with staggered animation -->
						<div
							class={cn(
								"space-y-4 transition-all duration-1000 delay-300 ease-out",
								heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
							)}
						>
							<p class="text-lg font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
								<Sparkles class="w-5 h-5" />
								Imaginez un instant...
							</p>
							<ul class="space-y-3">
								{#each imaginePoints as point, i}
									<li
										class={cn(
											"flex items-center gap-3 text-gray-600 dark:text-gray-300 transition-all duration-700",
											heroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
										)}
										style="transition-delay: {400 + i * 100}ms"
									>
										<div
											class="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/25">
											<Check class="w-4 h-4 text-white" />
										</div>
										<span>{point}</span>
									</li>
								{/each}
							</ul>
						</div>

						<!-- CTA Form with Pulse -->
						<div
							class={cn(
								"transition-all duration-1000 delay-500 ease-out",
								heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
							)}
						>
							<form
								method="POST"
								action="?/waitlist"
								use:enhance={() => {
									isSubmitting = true;
									return async ({ update }) => {
										await update();
										isSubmitting = false;
									};
								}}
								class="relative flex flex-col sm:flex-row gap-3 max-w-md"
							>
								<!-- Pulse ring around form -->
								<div class="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full blur-xl animate-pulse opacity-50"></div>

								<input
									type="email"
									name="email"
									bind:value={email}
									placeholder="votre@email.com"
									required
									class={cn(
										"relative flex-1 h-14 px-6 rounded-full border-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm",
										"focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500",
										"transition-all duration-300 text-lg shadow-lg",
										form?.errors?.email ? "border-red-400" : "border-emerald-200 dark:border-emerald-800"
									)}
								/>
								<Button
									type="submit"
									disabled={isSubmitting}
									class="relative h-14 px-8 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-lg font-medium shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300"
								>
									{#if isSubmitting}
										<span class="animate-pulse">...</span>
									{:else}
										Rejoindre
										<ArrowRight class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
									{/if}
								</Button>
							</form>

							{#if form?.errors?.email}
								<p class="mt-3 text-sm text-red-500 flex items-center gap-2">
									<span class="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
									{form.errors.email}
								</p>
							{/if}

							{#if form?.success}
								<div
									class="mt-4 p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 rounded-2xl flex items-center gap-3 shadow-lg"
									in:scale={{ duration: 400, easing: cubicOut }}
								>
									<div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
										<CheckCircle2 class="w-6 h-6 text-white" />
									</div>
									<span class="font-medium">{form.message}</span>
								</div>
							{/if}

							<!-- Social proof inline -->
							<div class="mt-6 flex items-center gap-4">
								<div class="flex -space-x-2">
									{#each Array(4) as _, i}
										<div
											class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 border-2 border-white dark:border-gray-900 flex items-center justify-center text-white text-xs font-bold shadow-md"
										>
											{String.fromCharCode(65 + i)}
										</div>
									{/each}
								</div>
								<p class="text-sm text-gray-500 dark:text-gray-400">
									<span class="font-bold text-emerald-600 dark:text-emerald-400">{data.waitlistCount}+</span> personnes inscrites
								</p>
							</div>
						</div>
					{/if}
				</div>

				<!-- Right: Video/Visual with Enhanced Depth -->
				<div
					class={cn(
						"relative transition-all duration-1000 delay-300 ease-out",
						heroVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-16 scale-95"
					)}
				>
					<!-- Glow behind video -->
					<div class="absolute -inset-8 bg-gradient-to-r from-emerald-400/20 via-green-400/30 to-emerald-400/20 rounded-[3rem] blur-3xl animate-glow-pulse"></div>

					<div
						class="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/30 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50 cursor-pointer group border border-emerald-200/50 dark:border-emerald-700/50"
						role="button"
						tabindex="0"
						onclick={handleVideoClick}
						onkeydown={(e) => e.key === 'Enter' && handleVideoClick()}
					>
						{#if isVideoPlaying}
							<iframe
								class="w-full h-full"
								src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
								title="Présentation de Bienvenue"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
							></iframe>
						{:else}
							<!-- Video placeholder -->
							<div class="absolute inset-0 flex items-center justify-center text-center flex-col bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-900/30 dark:to-green-900/30">
								<div class="relative mb-4">
									<!-- Animated rings -->
									<div class="absolute inset-0 bg-emerald-400/30 rounded-full blur-xl scale-150 animate-pulse"></div>
									<div class="absolute -inset-4 rounded-full border-2 border-emerald-400/30 animate-pulse-ring"></div>
									<div class="absolute -inset-8 rounded-full border border-emerald-400/20 animate-pulse-ring" style="animation-delay: 0.5s"></div>
									<div
										class="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
										<Play class="w-8 h-8 text-emerald-600 ml-1" fill="currentColor" />
									</div>
								</div>
								<p class="text-gray-700 dark:text-gray-200 font-medium text-lg">Découvrez Bienvenue en 2 minutes</p>
								<p class="text-gray-500 dark:text-gray-400 text-sm mt-1">Cliquez pour regarder</p>
							</div>
						{/if}
					</div>

					<!-- Floating elements with animation -->
					<div
						class="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-emerald-200 to-green-300 dark:from-emerald-800 dark:to-green-700 rounded-3xl flex items-center justify-center shadow-xl rotate-12 hidden md:flex animate-float"
						style="animation-delay: 0.2s"
					>
						<Home class="w-10 h-10 text-emerald-700 dark:text-emerald-200" />
					</div>
					<div
						class="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-green-200 to-emerald-300 dark:from-green-800 dark:to-emerald-700 rounded-3xl flex items-center justify-center shadow-xl -rotate-12 hidden md:flex animate-float"
						style="animation-delay: 0.8s"
					>
						<Briefcase class="w-8 h-8 text-green-700 dark:text-green-200" />
					</div>
					<div
						class="absolute top-1/2 -right-10 w-16 h-16 bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-800 dark:to-orange-700 rounded-2xl flex items-center justify-center shadow-xl rotate-6 hidden lg:flex animate-float"
						style="animation-delay: 1.2s"
					>
						<Star class="w-7 h-7 text-amber-700 dark:text-amber-200" />
					</div>
				</div>
			</div>
		</div>

		<!-- Scroll Indicator -->
		<div
			class={cn(
				"absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-700 cursor-pointer group",
				heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
			)}
			role="button"
			tabindex="0"
			onclick={scrollToSteps}
			onkeydown={(e) => e.key === 'Enter' && scrollToSteps()}
		>
			<span class="text-xs text-gray-400 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">Découvrir</span>
			<div class="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-start justify-center p-1.5 group-hover:border-emerald-500 transition-colors">
				<div class="w-1.5 h-3 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce-subtle group-hover:bg-emerald-500 transition-colors"></div>
			</div>
			<ChevronDown class="w-5 h-5 text-gray-400 animate-bounce-subtle group-hover:text-emerald-500 transition-colors" />
		</div>
	</section>

	<!-- Stats Section -->
	<section
		bind:this={statsRef}
		class="relative py-20"
	>
		<div class="container mx-auto px-6">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
				{#each [
					{ value: userCount, suffix: '+', label: 'Inscrits sur la liste' },
					{ value: regionCount, suffix: '', label: 'Départements couverts' },
					{ value: satisfactionCount, suffix: '%', label: 'Taux de satisfaction' }
				] as stat, i}
					<div
						class={cn(
							"relative cursor-pointer overflow-hidden rounded-2xl border p-6",
							"border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
							"dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
							"transition-all duration-300",
							statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
						)}
						style="transition-delay: {i * 100}ms"
					>
						<div class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
							{stat.value.toLocaleString()}{stat.suffix}
						</div>
						<p class="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- How It Works Section -->
	<section
		bind:this={stepsRef}
		class="relative py-24 px-6"
	>
		<div class="container mx-auto max-w-4xl">
			<div class="text-center mb-12">
				<h2
					class={cn(
						"text-3xl md:text-4xl font-bold mb-4 transition-all duration-700",
						stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					)}
				>
					Comment ça marche ?
				</h2>
				<p
					class={cn(
						"text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto transition-all duration-700 delay-100",
						stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					)}
				>
					Oubliez les recherches séparées pour le logement et l'emploi.
				</p>
			</div>

			<div class="grid md:grid-cols-3 gap-6">
				{#each steps as step, i}
					<div
						class={cn(
							"relative cursor-pointer overflow-hidden rounded-2xl border p-6",
							"border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
							"dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
							"transition-all duration-300",
							stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
						)}
						style="transition-delay: {150 + i * 100}ms"
					>
						<div class="flex items-center gap-3 mb-3">
							<span class="text-sm font-medium text-gray-400 dark:text-gray-500">{i + 1}</span>
							<h3 class="text-base font-semibold text-gray-900 dark:text-white">{step.title}</h3>
						</div>
						<p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Video Showcase Section -->
	<section
		bind:this={videoRef}
		class="relative py-24 px-6 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm"
	>
		<div class="container mx-auto max-w-5xl">
			<div class="text-center mb-12">
				<h2
					class={cn(
						"text-3xl md:text-4xl font-bold mb-4 transition-all duration-700",
						videoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					)}
				>
					Découvrez la plateforme
				</h2>
				<p
					class={cn(
						"text-lg text-gray-600 dark:text-gray-400 transition-all duration-700 delay-100",
						videoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					)}
				>
					Une nouvelle façon de visualiser où votre vie peut s'épanouir
				</p>
			</div>

			<div
				class={cn(
					"relative aspect-video rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 cursor-pointer group",
					videoVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
				)}
				role="button"
				tabindex="0"
				onclick={handleVideoClick}
				onkeydown={(e) => e.key === 'Enter' && handleVideoClick()}
			>
				{#if isVideoPlaying}
					<iframe
						class="w-full h-full"
						src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
						title="Présentation de Bienvenue"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				{:else}
					<div class="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600">
						<div class="absolute inset-0 bg-black/10"></div>
						<!-- Animated background pattern -->
						<div class="absolute inset-0 opacity-20">
							<div class="absolute top-10 left-10 w-32 h-32 border border-white/30 rounded-full"></div>
							<div class="absolute bottom-10 right-10 w-48 h-48 border border-white/20 rounded-full"></div>
							<div class="absolute top-1/2 left-1/4 w-24 h-24 border border-white/25 rounded-full"></div>
						</div>
						<div class="absolute inset-0 flex items-center justify-center text-center text-white flex-col">
							<div class="relative mb-6">
								<div class="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-150 animate-pulse"></div>
								<div class="absolute -inset-6 rounded-full border-2 border-white/30 animate-pulse-ring"></div>
								<div class="absolute -inset-12 rounded-full border border-white/20 animate-pulse-ring" style="animation-delay: 0.5s"></div>
								<div
									class="relative w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
									<Play class="w-12 h-12 text-emerald-600 ml-1" fill="currentColor" />
								</div>
							</div>
							<p class="text-2xl md:text-3xl font-bold mb-2">Voir la démo</p>
							<p class="text-lg opacity-80">2 minutes pour tout comprendre</p>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- Trust Badges Section -->
	<section
		bind:this={trustRef}
		class="relative py-16 px-6"
	>
		<div class="container mx-auto max-w-4xl">
			<div
				class={cn(
					"flex flex-wrap justify-center gap-8 transition-all duration-700",
					trustVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				)}
			>
				{#each trustBadges as badge, i}
					<div
						class="flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
						style="transition-delay: {i * 100}ms"
					>
						<div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
							<badge.icon class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
						</div>
						<span class="font-medium text-gray-700 dark:text-gray-300">{badge.text}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Final CTA Section -->
	<section
		bind:this={ctaRef}
		class="relative py-28 px-6 overflow-hidden"
	>
		<!-- Gradient background -->
		<div class="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600"></div>
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_rgba(0,0,0,0.2)_100%)]"></div>

		<!-- Animated floating shapes -->
		<div class="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-float"></div>
		<div class="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float" style="animation-delay: 1s"></div>
		<div class="absolute top-1/2 left-1/4 w-20 h-20 bg-white/5 rounded-full blur-xl animate-float" style="animation-delay: 2s"></div>
		<div class="absolute top-1/3 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-float" style="animation-delay: 1.5s"></div>

		<div class="container mx-auto max-w-3xl text-center text-white relative z-10">
			<div
				class={cn(
					"inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-white/20 backdrop-blur-sm rounded-full transition-all duration-700",
					ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				)}
			>
				<Sparkles class="w-5 h-5" />
				<span class="font-medium">Rejoignez l'aventure</span>
			</div>

			<h2
				class={cn(
					"text-4xl md:text-6xl font-bold mb-6 transition-all duration-700 delay-100",
					ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				)}
			>
				Prêt à découvrir votre futur chez-vous ?
			</h2>
			<p
				class={cn(
					"text-xl md:text-2xl opacity-90 mb-12 transition-all duration-700 delay-200",
					ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				)}
			>
				Rejoignez la liste d'attente et soyez parmi les premiers à explorer.
			</p>

			<form
				method="POST"
				action="?/waitlist"
				use:enhance={() => {
					isSubmitting = true;
					return async ({ update }) => {
						await update();
						isSubmitting = false;
					};
				}}
				class={cn(
					"flex flex-col sm:flex-row gap-4 max-w-lg mx-auto transition-all duration-700 delay-300",
					ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				)}
			>
				<input
					type="email"
					name="email"
					placeholder="votre@email.com"
					required
					class="flex-1 h-16 px-8 rounded-full bg-white/20 backdrop-blur border-2 border-white/40 placeholder-white/70 text-white focus:bg-white/30 focus:border-white outline-none text-lg transition-all duration-300"
				/>
				<Button
					type="submit"
					disabled={isSubmitting}
					class="h-16 px-10 rounded-full bg-white text-emerald-600 hover:bg-gray-50 text-lg font-bold shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300"
				>
					{#if isSubmitting}
						<span class="animate-pulse">...</span>
					{:else}
						Rejoindre
						<ArrowRight class="ml-2 w-6 h-6" />
					{/if}
				</Button>
			</form>

			{#if form?.success}
				<div
					class="mt-8 p-4 bg-white/20 backdrop-blur rounded-2xl inline-flex items-center gap-3"
					in:scale={{ duration: 400, easing: cubicOut }}
				>
					<CheckCircle2 class="w-6 h-6" />
					<span class="font-medium text-lg">{form.message}</span>
				</div>
			{/if}

			<!-- Social proof avatars -->
			<div
				class={cn(
					"mt-12 flex flex-col items-center gap-4 transition-all duration-700 delay-400",
					ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				)}
			>
				<div class="flex -space-x-3">
					{#each Array(6) as _, i}
						<div
							class="w-12 h-12 rounded-full bg-white/30 backdrop-blur border-2 border-white/60 flex items-center justify-center text-sm font-bold shadow-lg hover:scale-110 hover:z-10 transition-transform cursor-default"
						>
							{String.fromCharCode(65 + i)}
						</div>
					{/each}
					<div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur border-2 border-white/40 flex items-center justify-center text-sm font-medium">
						+{Math.max(0, data.waitlistCount - 6)}
					</div>
				</div>
				<p class="text-lg opacity-90">
					<span class="font-bold text-xl">{data.waitlistCount}+</span> personnes nous ont déjà rejoints
				</p>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
