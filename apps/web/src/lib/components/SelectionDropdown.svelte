<script lang="ts">
    export let value: string;
    export let options: string[];
    export let onChange: (value: string) => void;
    export let placeholder = "Choisir";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger class="px-1 text-primary underline hover:cursor-pointer">
        {value || placeholder}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        {#each options as option}
            <DropdownMenu.Item on:click={() => onChange(option)}>
                {option}
            </DropdownMenu.Item>
        {/each}
    </DropdownMenu.Content>
</DropdownMenu.Root> 