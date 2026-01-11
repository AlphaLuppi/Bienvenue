<script lang="ts">
    import { mapState, chatState } from '$lib/states/map.svelte';
    import Chat from '$lib/components/chat/Chat.svelte';
    import Map from '$lib/components/map/Map.svelte';
    import { Button } from "$lib/components/ui/button";
    import { Avatar, AvatarFallback } from "$lib/components/ui/avatar";
    import { fly } from 'svelte/transition';
    import { cn } from "$lib/utils";
    import logo from '$lib/images/bienvenue_logo_preview.png';
    import 'leaflet/dist/leaflet.css';

    const DEFAULT_CENTER: [number, number] = [46.603354, 1.888334];
    const DEFAULT_ZOOM = 6;
</script>

<svelte:head>
    <title>Carte Interactive | Bienvenue</title>
    <meta name="description" content="Explorez les opportunités de nouvelle vie sur notre carte interactive" />
</svelte:head>

<div class="flex flex-col h-screen w-screen">
    <!-- Header -->
    <header class="bg-background border-b h-14 flex items-center justify-between px-4 z-10">
        <a href="/" class="h-8">
            <img src={logo} alt="Bienvenue" class="h-full w-auto" />
        </a>
        <div class="flex items-center gap-4">
            <Button variant="ghost" size="sm" class="hidden md:flex">Enregistrer la recherche</Button>
            <Button variant="ghost" size="sm" class="hidden md:flex">Mes favoris</Button>
            <Avatar class="h-8 w-8 bg-muted">
                <AvatarFallback>AB</AvatarFallback>
            </Avatar>
        </div>
    </header>

    <!-- Contenu principal -->
    <div class="flex flex-1 overflow-hidden relative">
        <!-- Chat -->
        <Chat />
        
        <!-- Bouton pour ouvrir le chat sur mobile -->
        {#if !chatState.isOpen}
            <div transition:fly={{ x: -50, duration: 300 }}>
                <Button 
                    variant="default" 
                    class="fixed left-4 bottom-4 z-30 shadow-lg md:hidden" 
                    on:click={() => chatState.isOpen = true}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle mr-2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    Assistant
                </Button>
            </div>
        {/if}
        
        <!-- Carte -->
        <div class="relative w-full h-full">
            <Map center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} />
        </div>
    </div>
</div> 