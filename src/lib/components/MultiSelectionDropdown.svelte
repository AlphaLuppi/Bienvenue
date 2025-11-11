<script lang="ts">
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

    export let values: string[] = [];
    export let options: string[] = [];
    export let onChange: (values: string[]) => void;
    export let placeholder = "choisissez";

    function toggleOption(option: string) {
        if (values.includes(option)) {
            onChange(values.filter(item => item !== option));
        } else {
            onChange([...values, option]);
        }
    } 

    function formatValues(vals: string[]): string {
        if (vals.length === 0) return placeholder;
        return vals.map((val, i) => {
            if (i === 0) return val;
            if (i === vals.length - 1) return ` et ${val}`;
            return `, ${val}`;
        }).join('');
    }
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger class="px-1 text-primary underline hover:cursor-pointer">
        {formatValues(values)}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        {#each options as option}
            <DropdownMenu.CheckboxItem
                checked={values.includes(option)}
                onCheckedChange={() => toggleOption(option)}
            >
                {option}
            </DropdownMenu.CheckboxItem>
        {/each}
    </DropdownMenu.Content>
</DropdownMenu.Root> 