<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import "../app.css";
	import { cn } from "$lib/utils";
	import Header from "./Header.svelte";
</script>

<!-- Header -->
<svelte:head>
	<title>Bienvenue</title>
	<meta name="description" content="Bienvenue est une plateforme permettant à n'importe quel citoyen de trouver une opportunité de nouvelle vie." />
</svelte:head>

<Header />
<!-- Call to action -->
<div class="flex justify-center items-center h-screen">
	<Button class="margin-auto">
		Commencer
	</Button>
</div>

