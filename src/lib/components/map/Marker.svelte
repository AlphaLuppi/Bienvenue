<script lang="ts">
    import type { MarkerType } from '$lib/types/map';

    let { type } = $props<{ type: MarkerType }>();
    
    const markerClasses = {
        main: "w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-700 flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110 relative before:content-['●'] before:text-white before:text-xl before:relative before:z-[2] after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:rounded-full after:bg-blue-500 after:opacity-30 after:animate-marker-pulse",
        housing: "w-8 h-8 rounded-full bg-green-500 border-2 border-green-700 flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110 before:content-['🏠'] before:text-base",
        hobby: "w-8 h-8 rounded-full bg-orange-500 border-2 border-orange-700 flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110 before:content-['🎨'] before:text-base",
        work: "w-8 h-8 rounded-full bg-red-500 border-2 border-red-700 flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110 before:content-['💼'] before:text-base"
    } as const;
</script>

{#snippet markerIcon(markerType: MarkerType)}
    <div class={markerClasses[markerType]}></div>
{/snippet}

{@render markerIcon(type)}