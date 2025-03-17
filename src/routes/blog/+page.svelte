<script lang="ts">
    import "../../app.css";
    import * as Card from "$lib/components/ui/card";

    const articles = [
        {
            title: "Comment choisir sa région idéale en France ?",
            description: "Découvrez les critères essentiels pour trouver la région qui correspond le mieux à vos aspirations et à votre style de vie.",
            date: "15 Mars 2024",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
            slug: "choisir-region-ideale"
        },
        {
            title: "Les métiers d'avenir dans les territoires ruraux",
            description: "Focus sur les opportunités professionnelles émergentes dans les zones rurales françaises.",
            date: "10 Mars 2024",
            image: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95",
            slug: "metiers-avenir-rural"
        },
        {
            title: "5 success stories de reconversion réussie",
            description: "Témoignages inspirants de personnes qui ont changé de vie grâce à notre plateforme.",
            date: "5 Mars 2024",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
            slug: "success-stories-reconversion"
        }
    ];
</script>

<div class="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto text-center mb-16">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl mb-8">Notre Blog</h1>
        <p class="text-xl text-muted-foreground">
            Conseils, témoignages et actualités pour votre nouvelle vie
        </p>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {#each articles as article}
            <Card.Root class="overflow-hidden">
                <img
                    src={article.image}
                    alt={article.title}
                    class="h-48 w-full object-cover"
                />
                <Card.Header>
                    <div class="text-sm text-muted-foreground mb-2">{article.date}</div>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Description>{article.description}</Card.Description>
                </Card.Header>
                <Card.Footer>
                    <a
                        href={`/blog/${article.slug}`}
                        class="text-primary hover:underline"
                    >
                        Lire la suite →
                    </a>
                </Card.Footer>
            </Card.Root>
        {/each}
    </div>

    <div class="mt-16 text-center">
        <p class="text-muted-foreground mb-8">
            Vous souhaitez partager votre expérience ? Contactez-nous !
        </p>
        <a 
            href="/contact" 
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
            Proposer un article
        </a>
    </div>
</div> 