<script lang="ts">
    import "../../app.css";
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import { Mail, Phone, MapPin, Clock } from "lucide-svelte";

    let name = $state("");
    let email = $state("");
    let subject = $state("");
    let message = $state("");

    function handleSubmit() {
        // TODO: Implémenter l'envoi du formulaire
        console.log({ name, email, subject, message });
    }

    const contactInfo = [
        {
            icon: Mail,
            title: "Email",
            details: "contact@bienvenue.fr",
            link: "mailto:contact@bienvenue.fr"
        },
        {
            icon: Phone,
            title: "Téléphone",
            details: "01 23 45 67 89",
            link: "tel:0123456789"
        },
        {
            icon: MapPin,
            title: "Adresse",
            details: "123 Avenue des Champs-Élysées, 75008 Paris",
            link: "https://maps.google.com"
        },
        {
            icon: Clock,
            title: "Horaires",
            details: "Lundi - Vendredi, 9h - 18h",
            link: null
        }
    ];
</script>

<div class="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto text-center mb-16">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl mb-8">Contactez-nous</h1>
        <p class="text-xl text-muted-foreground">
            Notre équipe est là pour répondre à toutes vos questions
        </p>
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {#each contactInfo as info}
                    <div class="flex flex-col items-center p-4 text-center">
                        <div class="mb-4 rounded-full bg-primary/10 p-2">
                            {#if info.icon}
                                <info.icon class="h-6 w-6 text-primary" />
                            {/if}
                        </div>
                        <h3 class="mb-2 font-semibold">{info.title}</h3>
                        {#if info.link}
                            <a href={info.link} class="text-primary hover:underline">
                                {info.details}
                            </a>
                        {:else}
                            <p class="text-muted-foreground">{info.details}</p>
                        {/if}
                    </div>
                {/each}
            </div>

            <div class="mt-8">
                <h2 class="text-2xl font-bold mb-4">Nos bureaux</h2>
                <div class="aspect-[4/3] w-full">
                    <iframe
                        title="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2157905059325!2d2.2986800156744775!3d48.86936997928847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f8f3049b%3A0x5c0f4d87eb5b5080!2sAv.%20des%20Champs-%C3%89lys%C3%A9es%2C%2075008%20Paris!5e0!3m2!1sfr!2sfr!4v1647856687890!5m2!1sfr!2sfr"
                        width="100%"
                        height="100%"
                        style="border:0;"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>

        <div>
            <Card.Root>
                <Card.Header>
                    <Card.Title>Envoyez-nous un message</Card.Title>
                    <Card.Description>
                        Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                    </Card.Description>
                </Card.Header>
                <Card.Content>
                    <form 
                        onsubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }} 
                        class="space-y-4"
                    >
                        <div class="space-y-2">
                            <label for="name">Nom complet</label>
                            <input
                                type="text"
                                id="name"
                                bind:value={name}
                                class="w-full rounded-md border px-3 py-2"
                                required
                            />
                        </div>
                        <div class="space-y-2">
                            <label for="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                bind:value={email}
                                class="w-full rounded-md border px-3 py-2"
                                required
                            />
                        </div>
                        <div class="space-y-2">
                            <label for="subject">Sujet</label>
                            <input
                                type="text"
                                id="subject"
                                bind:value={subject}
                                class="w-full rounded-md border px-3 py-2"
                                required
                            />
                        </div>
                        <div class="space-y-2">
                            <label for="message">Message</label>
                            <textarea
                                id="message"
                                bind:value={message}
                                class="w-full rounded-md border px-3 py-2 min-h-[150px]"
                                required
                            ></textarea>
                        </div>
                        <Button type="submit" class="w-full">Envoyer</Button>
                    </form>
                </Card.Content>
            </Card.Root>
        </div>
    </div>
</div> 