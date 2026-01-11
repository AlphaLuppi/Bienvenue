<script lang="ts">
    import FeatureCard from "$lib/components/magic_card/FeatureCard.svelte";
    import { Home, Briefcase, Trophy } from "lucide-svelte";
    
    const data = [
        {
            id: 1,
            title: "Trouvez votre lieu de vie idéal",
            content: "Découvrez l'endroit parfait pour vous installer, que ce soit en ville ou à la campagne, avec tous les critères qui correspondent à votre style de vie.",
            image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
            icon: Home
        },
        {
            id: 2,
            title: "L'emploi de vos rêves",
            content: "Identifiez les opportunités professionnelles qui correspondent à vos aspirations, vos compétences et vos valeurs pour une carrière épanouissante.",
            image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
            icon: Briefcase
        },
        {
            id: 3,
            title: "Vivez vos passions",
            content: "Explorez les activités sportives et de loisirs qui vous passionnent et trouvez des communautés partageant vos centres d'intérêt.",
            image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
            icon: Trophy
        }
    ];
</script>

<FeatureCard {data} collapseDelay={6000} /> 