<script lang="ts">
    import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import "../app.css";
	import { cn } from "$lib/utils";
	import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { formState, updateField } from './formState.svelte';
    import SelectionDropdown from '$lib/components/SelectionDropdown.svelte';
    import MultiSelectionDropdown from '$lib/components/MultiSelectionDropdown.svelte';
    import { goto } from '$app/navigation';

    let { begin = $bindable() } = $props();
    let typeAction = $state("");
    let typeBien = $state("");
    let localisationType = $state("");
    let localisationsResult = $state<string[]>([]);
    let metiersResult = $state<string[]>([]);
    let loisirsResult = $state<string[]>([]);

    const typeActionOptions = ["acheter", "louer"];
    const typeBienOptions = ["appartement", "maison"];
    const localisationTypeOptions = ["village", "ville", "metropole"];
    const cardinaliteOptions = ["Nord", "Sud", "Est", "Ouest", "Nord-Est", "Nord-Ouest", "Sud-Est", "Sud-Ouest"];
    const metiersOptions = ["médecin", "enseignant", "développeur"];
    const loisirsOptions = ["tennis", "football", "ping-pong", "paddel", "vélo", "randonnée", "ski", "plongée", "escalade", "natation", "yoga", "pilates", "danse", "musique", "cinéma", "lecture", "voyage", "cuisine", "art", "photographie", "informatique", "jeux vidéo", "sport"];

    function handleSubmit() {
		console.log({
			typeAction,
			typeBien,
			localisationType,
			localisationsResult,
			metiersResult,
			loisirsResult
		});
        
        // Rediriger vers la page de carte
        goto('/map');
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
		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});

</script>

<div 
    class="h-full w-full bg-background/95"  
    transition:fade={{ duration: 150 }}
    onclick={handleOutsideClick}
    onkeydown={handleKeydown}
    role="button"
    tabindex="0"
>
    <div class="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] will-change-transform">
        <Card.Root class="w-[90vw] max-w-[400px]">
            <Card.Header>
                <Card.Title>Questionnaire</Card.Title>
                <Card.Description>
                    Répondez à ces quelques questions pour commencer.
                </Card.Description>
            </Card.Header>
            <Card.Content>
                <form onsubmit={e => { e.preventDefault(); handleSubmit(); }} class="space-y-6">
                    <p class="text-lg leading-relaxed">
                        J'aimerais 
                        <SelectionDropdown
                            value={formState.typeAction}
                            options={typeActionOptions}
                            onChange={value => updateField('typeAction', value)}
                        />
                        {#if formState.typeBien === "maison"}une{:else}un{/if}
                        <SelectionDropdown
                            value={formState.typeBien}
                            options={typeBienOptions}
                            onChange={value => updateField('typeBien', value)}
                        />
                        dans {#if formState.localisationType === "village"}un {:else}une {/if}
                        <SelectionDropdown
                            value={formState.localisationType}
                            options={localisationTypeOptions}
                            onChange={value => updateField('localisationType', value)}
                        />
                        {#if formState.localisationType === "village"}situé {:else}située {/if} au
                        <MultiSelectionDropdown
                            values={formState.cardinalite}
                            options={cardinaliteOptions}
                            onChange={values => updateField('cardinalite', values)}
                        />
                    </p>

                    <p class="text-lg leading-relaxed">
                        {#if formState.metiers.length > 1}Nous sommes{:else}Je suis{/if}
                        <MultiSelectionDropdown
                            values={formState.metiers}
                            options={metiersOptions}
                            onChange={values => updateField('metiers', values)}
                        />
                        et j'aime
                        <MultiSelectionDropdown
                            values={formState.loisirs}
                            options={loisirsOptions}
                            onChange={values => updateField('loisirs', values)}
                        />
                    </p>

                    <Button type="submit" class="w-full">Rechercher</Button>
                </form>
            </Card.Content>
        </Card.Root>
    </div>
</div>
