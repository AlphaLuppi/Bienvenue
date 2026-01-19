<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Carousel from "$lib/components/ui/carousel/index.js";

    export let images: string[] = [];
    export let title: string;
    export let location: string;
    export let price: number;
    export let rating: number;
    export let reviews: number;
</script>

<Card.Root class="w-full max-w-sm overflow-hidden rounded-lg border">
    <Carousel.Root class="w-full">
        <Carousel.Content>
            {#each images as image}
                <Carousel.Item>
                    <div class="aspect-[4/3]">
                        <img 
                            src={image} 
                            alt={title}
                            class="h-full w-full object-cover"
                        />
                    </div>
                </Carousel.Item>
            {/each}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
    </Carousel.Root>

    <Card.Content class="p-4">
        <div class="flex items-start justify-between">
            <div>
                <h3 class="font-semibold">{title}</h3>
                <p class="text-sm text-gray-600">{location}</p>
            </div>
            <div class="flex items-center gap-1">
                <span class="text-sm">★</span>
                <span class="text-sm">{rating}</span>
                <span class="text-sm text-gray-600">({reviews})</span>
            </div>
        </div>
        <p class="mt-2 font-semibold">{price}€ <span class="font-normal">/ nuit</span></p>
    </Card.Content>
</Card.Root> 