<script lang="ts">
    import { cubicOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';
    import { fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    let { tabs = [], activeTab = tabs[0]?.id, resume, commune, hobby, job } = $props();

    let indicator: HTMLElement;
    let activeElement: HTMLElement;

    function setActiveTab(tabId: string, element: HTMLElement) {
        activeTab = tabId;
        activeElement = element;
        if (activeElement && indicator) {
            const { left, width } = activeElement.getBoundingClientRect();
            const { left: containerLeft } = indicator.parentElement!.getBoundingClientRect();
            indicator.style.transform = `translateX(${left - containerLeft}px)`;
            indicator.style.width = `${width}px`;
        }
    }

    $effect(() => {
        if (tabs.length > 0) {
            const firstTab = document.querySelector(`[data-tab="${tabs[0].id}"]`) as HTMLElement;
            if (firstTab) {
                setActiveTab(tabs[0].id, firstTab);
            }
        }
    });
</script>

<div class="relative">
    <div class="flex space-x-1 border-b border-gray-200 dark:border-gray-700 relative">
        {#each tabs as tab}
            <button
                class="relative px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out"
                class:text-blue-600={activeTab === tab.id}
                class:text-gray-500={activeTab !== tab.id}
                class:dark:text-blue-400={activeTab === tab.id}
                class:dark:text-gray-400={activeTab !== tab.id}
                onclick={(e) => setActiveTab(tab.id, e.currentTarget)}
                data-tab={tab.id}
            >
                {tab.label}
            </button>
        {/each}
        <div
            bind:this={indicator}
            class="absolute bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-200 ease-in-out"
            style="width: 0; transform: translateX(0);"
        />
    </div>

    <div class="mt-4">
        {#if activeTab === 'resume'}
            <div in:fly={{ y: 20, duration: 300, delay: 200, easing: quintOut }} out:fade={{ duration: 200 }}>
                {@render resume()}
            </div>
        {:else if activeTab === 'commune'}
            <div in:fly={{ y: 20, duration: 300, delay: 200, easing: quintOut }} out:fade={{ duration: 200 }}>
                {@render commune()}
            </div>
        {:else if activeTab === 'hobby'}
            <div in:fly={{ y: 20, duration: 300, delay: 200, easing: quintOut }} out:fade={{ duration: 200 }}>
                {@render hobby()}
            </div>
        {:else if activeTab === 'job'}
            <div in:fly={{ y: 20, duration: 300, delay: 200, easing: quintOut }} out:fade={{ duration: 200 }}>
                {@render job()}
            </div>
        {/if}
    </div>
</div> 