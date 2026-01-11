<script lang="ts">
    import "../../app.css";
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";

    const faqs = [
        {
            question: "Comment créer un compte ?",
            answer: "Pour créer un compte, cliquez sur le bouton 'S'inscrire' en haut de la page et suivez les instructions. Vous devrez fournir votre nom, votre email et créer un mot de passe."
        },
        {
            question: "Comment modifier mes préférences de recherche ?",
            answer: "Connectez-vous à votre compte, accédez à votre profil et cliquez sur 'Préférences'. Vous pourrez y modifier vos critères de recherche pour l'emploi, le logement et les activités."
        },
        {
            question: "Comment contacter un conseiller ?",
            answer: "Vous pouvez contacter un conseiller via le formulaire ci-dessous ou en nous appelant au 01 23 45 67 89 du lundi au vendredi de 9h à 18h."
        },
        {
            question: "Mes données sont-elles sécurisées ?",
            answer: "Oui, nous prenons très au sérieux la sécurité de vos données. Toutes les informations sont cryptées et stockées de manière sécurisée conformément au RGPD."
        }
    ];

    let name = $state("");
    let email = $state("");
    let subject = $state("");
    let message = $state("");

    function handleSubmit() {
        // TODO: Implémenter l'envoi du formulaire
        console.log({ name, email, subject, message });
    }
</script>

<div class="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto text-center mb-16">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl mb-8">Support</h1>
        <p class="text-xl text-muted-foreground">
            Comment pouvons-nous vous aider ?
        </p>
    </div>

    <div class="mb-16">
        <h2 class="text-2xl font-bold mb-8">Questions fréquentes</h2>
        <div class="grid gap-6">
            {#each faqs as faq}
                <Card.Root>
                    <Card.Header>
                        <Card.Title>{faq.question}</Card.Title>
                    </Card.Header>
                    <Card.Content>
                        <p class="text-muted-foreground">{faq.answer}</p>
                    </Card.Content>
                </Card.Root>
            {/each}
        </div>
    </div>

    <div class="max-w-xl mx-auto">
        <h2 class="text-2xl font-bold mb-8">Nous contacter</h2>
        <Card.Root>
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