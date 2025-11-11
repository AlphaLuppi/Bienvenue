<script lang="ts">
    import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import "../app.css";
	import { cn } from "$lib/utils";
	import { fade, scale, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { formState, updateField } from './formState.svelte';
    import SelectionDropdown from '$lib/components/SelectionDropdown.svelte';
    import MultiSelectionDropdown from '$lib/components/MultiSelectionDropdown.svelte';
    import { goto } from '$app/navigation';
    import { cubicOut } from 'svelte/easing';
    import { X } from 'lucide-svelte';

    let { begin = $bindable() } = $props();
    let currentStep = $state(1);
    let isSubmitting = $state(false);

    const totalSteps = 2;
    const progress = $derived((currentStep / totalSteps) * 100);

    const typeActionOptions = ["acheter", "louer"];
    const typeBienOptions = ["appartement", "maison"];
    const localisationTypeOptions = ["village", "ville", "métropole"];
    const cardinaliteOptions = ["Nord", "Sud", "Est", "Ouest", "Nord-Est", "Nord-Ouest", "Sud-Est", "Sud-Ouest"];
    const metiersOptions = ["médecin", "enseignant", "développeur", "artisan", "commerçant", "fonctionnaire", "agriculteur"];
    const loisirsOptions = ["tennis", "football", "ping-pong", "padel", "vélo", "randonnée", "ski", "plongée", "escalade", "natation", "yoga", "pilates", "danse", "musique", "cinéma", "lecture", "voyage", "cuisine", "art", "photographie", "informatique", "jeux vidéo", "sport"];

    function canProceed() {
        if (currentStep === 1) {
            return formState.typeAction && formState.typeBien && formState.localisationType && formState.cardinalite.length > 0;
        }
        if (currentStep === 2) {
            return formState.metiers.length > 0 && formState.loisirs.length > 0;
        }
        return false;
    }

    function nextStep() {
        if (currentStep < totalSteps) {
            currentStep++;
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
        }
    }

    async function handleSubmit() {
        isSubmitting = true;
		console.log({
			typeAction: formState.typeAction,
			typeBien: formState.typeBien,
			localisationType: formState.localisationType,
			cardinalite: formState.cardinalite,
			metiers: formState.metiers,
			loisirs: formState.loisirs
		});

        // Simule un petit délai pour l'animation
        await new Promise(resolve => setTimeout(resolve, 800));

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
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    transition:fade={{ duration: 300, easing: cubicOut }}
    onclick={handleOutsideClick}
    onkeydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
>
    <div
        class="relative w-[95vw] max-w-[500px] max-h-[90vh] overflow-hidden"
        transition:scale={{ duration: 300, easing: cubicOut, start: 0.95 }}
    >
        <Card.Root class="border-0 shadow-2xl bg-card/95 backdrop-blur-md">
            <Card.Header class="relative pb-4">
                <button
                    onclick={handleClose}
                    class="absolute right-0 top-0 p-2 rounded-full hover:bg-muted transition-colors"
                    aria-label="Fermer"
                >
                    <X class="h-4 w-4" />
                </button>

                <div class="pr-8">
                    <Card.Title class="text-2xl font-semibold mb-2">
                        Trouvez votre nouveau chez-vous
                    </Card.Title>
                    <Card.Description class="text-base">
                        Étape {currentStep} sur {totalSteps} - Parlez-nous de vos préférences
                    </Card.Description>
                </div>

                <!-- Progress bar -->
                <div class="w-full bg-muted rounded-full h-2 mt-4 overflow-hidden">
                    <div
                        class="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                        style="width: {progress}%"
                    ></div>
                </div>
            </Card.Header>

            <Card.Content class="pt-2 pb-6">
                <form onsubmit={e => { e.preventDefault(); }} class="space-y-8">
                    {#if currentStep === 1}
                        <div
                            class="space-y-6"
                            in:fly={{ x: 20, duration: 300, delay: 100 }}
                            out:fly={{ x: -20, duration: 200 }}
                        >
                            <div class="space-y-4">
                                <h3 class="font-medium text-lg text-foreground/90">Votre projet immobilier</h3>
                                <p class="text-base leading-relaxed text-muted-foreground">
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
                                        placeholder="choisir une région"
                                    />
                                </p>
                            </div>
                        </div>
                    {/if}

                    {#if currentStep === 2}
                        <div
                            class="space-y-6"
                            in:fly={{ x: 20, duration: 300, delay: 100 }}
                            out:fly={{ x: -20, duration: 200 }}
                        >
                            <div class="space-y-4">
                                <h3 class="font-medium text-lg text-foreground/90">À propos de vous</h3>
                                <p class="text-base leading-relaxed text-muted-foreground">
                                    {#if formState.metiers.length > 1}Nous sommes{:else}Je suis{/if}
                                    <MultiSelectionDropdown
                                        values={formState.metiers}
                                        options={metiersOptions}
                                        onChange={values => updateField('metiers', values)}
                                        placeholder="votre métier"
                                    />
                                    et j'aime
                                    <MultiSelectionDropdown
                                        values={formState.loisirs}
                                        options={loisirsOptions}
                                        onChange={values => updateField('loisirs', values)}
                                        placeholder="vos loisirs"
                                    />
                                </p>
                            </div>
                        </div>
                    {/if}
                </form>
            </Card.Content>

            <Card.Footer class="flex justify-between items-center pt-4 border-t">
                <Button
                    variant="ghost"
                    onclick={prevStep}
                    disabled={currentStep === 1}
                    class="transition-all duration-200"
                >
                    Précédent
                </Button>

                <div class="flex items-center gap-2">
                    {#each Array(totalSteps) as _, i}
                        <div
                            class="h-2 w-2 rounded-full transition-all duration-300 {currentStep > i ? 'bg-primary' : 'bg-muted'}"
                        ></div>
                    {/each}
                </div>

                {#if currentStep < totalSteps}
                    <Button
                        onclick={nextStep}
                        disabled={!canProceed()}
                        class="transition-all duration-200 min-w-[100px]"
                    >
                        Suivant
                    </Button>
                {:else}
                    <Button
                        onclick={handleSubmit}
                        disabled={!canProceed() || isSubmitting}
                        class="transition-all duration-200 min-w-[100px]"
                    >
                        {#if isSubmitting}
                            <div class="flex items-center gap-2">
                                <div class="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                Recherche...
                            </div>
                        {:else}
                            Rechercher
                        {/if}
                    </Button>
                {/if}
            </Card.Footer>
        </Card.Root>
    </div>
</div>
