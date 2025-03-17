<script lang="ts">
    import "../../app.css";

    const team = [
        {
            name: "Gabriel DESBOUIS",
            role: "CEO & Co-fondatrice",
            bio: "Passionné par l'impact social et le développement territorial. Il a a coeur de mettre en place des solutions innovantes pour améliorer la qualité de vie des citoyens.",
            image: "https://media.licdn.com/dms/image/v2/D4E03AQF56lR0Nt2dhA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1694617238821?e=1747267200&v=beta&t=XcGV3cMqgA_uky-vHktONh6DNnb2zXkhv0-W0LHl0SA"
        },
        {
            name: "Nicolas BATAILLE",
            role: "Responsable IA & Co-fondateur",
            bio: "Diplômé en informatique et en intelligence artificielle, il a une passion pour la technologie et l'innovation. Il est expert en IA et en machine learning.",
            image: "https://media.licdn.com/dms/image/v2/D4D03AQHNx6WGLaY9Og/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727775544457?e=1747267200&v=beta&t=rLswmhn9cfLC34NsY6LbPrnhmlaHCBlr93TSNZ7M27w"
        },
        {
            name: "Thomas SATORY",
            role: "CTO & Co-fondateur",
            bio: "Spécialiste informatique et des technologies de l'information et de la communication.",
            image: "https://media.licdn.com/dms/image/v2/D4D03AQG6DB4yPvnLiQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1724868202424?e=1747267200&v=beta&t=zZF_iOSbXMRSP9DzGlZUOpzUeD1omI83-52J7o2QRbo"
        }
    ];
</script>

<div class="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto text-center mb-16">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl mb-8">Notre Équipe</h1>
        <p class="text-xl text-muted-foreground">
            Une équipe passionnée dédiée à votre trouvaille.
        </p>
    </div>

    <div class="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4">
        {#each team as member}
            <div class="text-center">
                <div class="relative">
                    <img
                        src={member.image}
                        alt={member.name}
                        class="mx-auto h-48 w-48 rounded-full object-cover"
                    />
                    <div class="absolute inset-0 rounded-full ring-4 ring-primary/10"></div>
                </div>
                <div class="mt-4">
                    <h3 class="text-lg font-semibold">{member.name}</h3>
                    <p class="text-sm text-primary">{member.role}</p>
                    <p class="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                </div>
            </div>
        {/each}
    </div>

    <div class="mt-16 max-w-3xl mx-auto text-center">
        <h2 class="text-2xl font-bold mb-4">Rejoignez l'aventure</h2>
        <p class="text-muted-foreground mb-8">
            Nous sommes toujours à la recherche de talents passionnés pour nous aider à construire 
            le futur de la mobilité en France.
        </p>
        <a 
            href="/contact" 
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
            Nous contacter
        </a>
    </div>
</div> 