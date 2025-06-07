<script lang="ts">
    import { page } from '$app/stores';
    import { mapState } from '$lib/states/map.svelte';
    import { Badge } from '$lib/components/ui/badge';
    import { Skeleton } from '$lib/components/ui/skeleton';
    import { Chart } from 'flowbite-svelte';
    import AnimatedTabs from '$lib/components/ui/animated-tabs.svelte';

    // Récupérer l'ID de la solution depuis l'URL
    const solutionId = $page.params.id;
    
    // Configuration des onglets
    const tabs = [
        { id: 'resume', label: 'Résumé' },
        { id: 'commune', label: 'Commune' },
        { id: 'hobby', label: 'Loisirs' },
        { id: 'job', label: 'Emploi' }
    ];

    // Données de test pour les graphiques
    const temperatureOptions = {
        chart: {
            type: 'line' as const,
            height: 350,
            toolbar: {
                show: false
            }
        },
        series: [{
            name: 'Température moyenne',
            data: [8, 10, 15, 18, 22, 25]
        }],
        xaxis: {
            categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun']
        },
        colors: ['#3b82f6'],
        stroke: {
            curve: 'smooth' as const,
            width: 3
        }
    };

    const populationOptions = {
        chart: {
            type: 'bar' as const,
            height: 350,
            toolbar: {
                show: false
            }
        },
        series: [{
            name: 'Population',
            data: [15, 25, 30, 20, 10]
        }],
        xaxis: {
            categories: ['0-14', '15-29', '30-44', '45-59', '60+']
        },
        colors: ['#3b82f6'],
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false
            }
        }
    };

    // TODO: Récupérer les données de la solution depuis une API ou un store
    const solution = mapState.solutionData?.main;

    // TODO: Implémenter la génération du résumé via LLM
    let isLoadingSummary = false;
</script>

<div class="container mx-auto px-4 py-8">
    <div class="mb-8">
        <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-text-gradient">
            Solution #{$page.params.id}
        </h1>
        <p class="text-gray-600 dark:text-gray-300">
            Découvrez les détails de cette solution personnalisée
        </p>
    </div>

    <AnimatedTabs {tabs}>
        {#snippet resume()}
            <div class="space-y-6">
                <h2 class="text-2xl font-bold mb-4">Résumé</h2>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <div class="animate-pulse">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    </div>
                </div>

                <h2 class="text-2xl font-bold mb-4">Indicateurs clés</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                        <div class="text-sm text-gray-500 dark:text-gray-400">Ensoleillement</div>
                        <div class="text-2xl font-bold">2,850h/an</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                        <div class="text-sm text-gray-500 dark:text-gray-400">Distance hôpital</div>
                        <div class="text-2xl font-bold">5.2 km</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                        <div class="text-sm text-gray-500 dark:text-gray-400">Qualité de l'air</div>
                        <div class="text-2xl font-bold">Bonne</div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                        <div class="text-sm text-gray-500 dark:text-gray-400">Prix immobilier</div>
                        <div class="text-2xl font-bold">2,500 €/m²</div>
                    </div>
                </div>
            </div>
        {/snippet}

        {#snippet commune()}
            <div class="space-y-6">
                <h2 class="text-2xl font-bold mb-4">Informations générales</h2>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <p class="text-gray-600 dark:text-gray-300">
                        Commune dynamique de 15,000 habitants, située à 30 minutes de Paris.
                        Qualité de vie exceptionnelle avec de nombreux espaces verts et services.
                    </p>
                </div>

                <h2 class="text-2xl font-bold mb-4">Statistiques</h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                        <h3 class="text-lg font-semibold mb-4">Température moyenne</h3>
                        <Chart options={temperatureOptions} />
                    </div>
                    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                        <h3 class="text-lg font-semibold mb-4">Répartition de la population</h3>
                        <Chart options={populationOptions} />
                    </div>
                </div>
            </div>
        {/snippet}

        {#snippet hobby()}
            <div class="space-y-6">
                <h2 class="text-2xl font-bold mb-4">Activités disponibles</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                        <div class="h-48 bg-gray-200 dark:bg-gray-700"></div>
                        <div class="p-4">
                            <h3 class="text-lg font-semibold mb-2">Centre sportif</h3>
                            <p class="text-gray-600 dark:text-gray-300">
                                Complexe moderne avec piscine, salle de sport et terrains extérieurs.
                            </p>
                        </div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                        <div class="h-48 bg-gray-200 dark:bg-gray-700"></div>
                        <div class="p-4">
                            <h3 class="text-lg font-semibold mb-2">Bibliothèque</h3>
                            <p class="text-gray-600 dark:text-gray-300">
                                Grande bibliothèque avec espace numérique et salle d'étude.
                            </p>
                        </div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                        <div class="h-48 bg-gray-200 dark:bg-gray-700"></div>
                        <div class="p-4">
                            <h3 class="text-lg font-semibold mb-2">Parc municipal</h3>
                            <p class="text-gray-600 dark:text-gray-300">
                                Parc de 10 hectares avec aires de jeux et sentiers de randonnée.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        {/snippet}

        {#snippet job()}
            <div class="space-y-6">
                <h2 class="text-2xl font-bold mb-4">Offres d'emploi</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <h3 class="text-lg font-semibold mb-2">Développeur Full Stack</h3>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">
                            CDI - 45-55K€ - Télétravail possible
                        </p>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                React
                            </span>
                            <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                Node.js
                            </span>
                        </div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <h3 class="text-lg font-semibold mb-2">Data Scientist</h3>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">
                            CDI - 50-60K€ - Télétravail possible
                        </p>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                Python
                            </span>
                            <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                Machine Learning
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        {/snippet}
    </AnimatedTabs>
</div> 