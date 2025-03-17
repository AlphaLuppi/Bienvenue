<script lang="ts">
    import { cn } from "$lib/utils";
    import { onMount } from 'svelte';
  
    export let img: string;
    export let name: string;
    export let username: string;
    export let body: string;

    let imageLoaded = false;
    let imgElement: HTMLImageElement;

    onMount(() => {
      // Précharger l'image
      const preloadImage = new Image();
      preloadImage.src = img;
      preloadImage.onload = () => {
        imageLoaded = true;
      };
    });
</script>
  
<figure
  class={cn(
    "relative w-64 cursor-pointer overflow-hidden rounded-2xl border p-4",
    // light styles
    "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
    // dark styles
    "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
  )}
>
  <div class="flex flex-row items-center gap-2">
    <div class="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
      {#if !imageLoaded}
        <div class="absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-600"></div>
      {/if}
      <img
        bind:this={imgElement}
        class={cn("rounded-full w-full h-full object-cover transition-opacity duration-300", 
          !imageLoaded && "opacity-0"
        )}
        width="32"
        height="32"
        loading="lazy"
        decoding="async"
        alt=""
        src={img}
      />
    </div>
    <div class="flex flex-col">
      <!-- svelte-ignore a11y-structure -->
      <figcaption class="text-sm font-medium dark:text-white">
        {name}
      </figcaption>
      <p class="text-xs font-medium dark:text-white/40">{username}</p>
    </div>
  </div>
  <blockquote class="mt-2 text-sm">{body}</blockquote>
</figure> 