<script lang="ts">
    import HousingCard from "$lib/components/ui/housing-card/housing-card.svelte";

    const logement = {
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
        ],
        title: "Appartement moderne au cœur de Paris",
        location: "Le Marais, Paris",
        price: 150,
        rating: 4.8,
        reviews: 128
    };
</script>

<div class="min-h-screen flex items-center justify-center p-4">
    <HousingCard {...logement} />
</div>