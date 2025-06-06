<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { cn } from "$lib/utils";
    import BorderBeam from "$lib/components/ui/BorderBeam.svelte";
    import { goto } from "$app/navigation";

    let { 
        isVisible = false,
        solutionId = "",
        solutionData = null
    } = $props<{ 
        isVisible?: boolean;
        solutionId?: string;
        solutionData?: any;
    }>();

    function handleMoreInfo() {
        if (solutionId) {
            goto(`/solutions/${solutionId}`);
        }
    }
</script>

<article 
    class={cn(
        "absolute top-4 left-1/2 -translate-x-1/2 z-[60] w-fit",
        "flex items-center gap-3 p-3 rounded-xl bg-white shadow-lg relative",
        "transform transition-[opacity,transform] duration-300 ease-out",
        isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
    )}
>
    <BorderBeam 
        size={150} 
        duration={12} 
        colorFrom="#0ea5e9" 
        colorTo="#6366f1"
        borderWidth={1.5}
    />
    
    <Button variant="ghost" size="sm" class="gap-2 relative z-10 text-gray-700 hover:text-gray-900 hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        Favoris
    </Button>
    <Button variant="ghost" size="sm" class="gap-2 relative z-10 text-gray-700 hover:text-gray-900 hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
        Partager
    </Button>
    <Button variant="ghost" size="sm" class="gap-2 relative z-10 text-gray-700 hover:text-gray-900 hover:bg-gray-100" onclick={handleMoreInfo}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
        En savoir plus
    </Button>
</article> 