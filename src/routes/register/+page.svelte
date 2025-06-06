<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Form from "$lib/components/ui/form";
    import * as Card from "$lib/components/ui/card";
    import "../../app.css";

    let email = $state("");
    let password = $state("");
    let confirmPassword = $state("");
    let name = $state("");

    function handleSubmit() {
        // TODO: Implémenter la logique d'inscription
        console.log({ email, password, confirmPassword, name });
    }
</script>

<div class="container mx-auto flex min-h-screen items-center justify-center">
    <Card.Root class="w-full max-w-md">
        <Card.Header>
            <Card.Title>S'inscrire</Card.Title>
            <Card.Description>Créez votre compte pour commencer votre nouvelle vie</Card.Description>
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
                    <label for="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        bind:value={password}
                        class="w-full rounded-md border px-3 py-2"
                        required
                    />
                </div>
                <div class="space-y-2">
                    <label for="confirmPassword">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        bind:value={confirmPassword}
                        class="w-full rounded-md border px-3 py-2"
                        required
                    />
                </div>
                <Button type="submit" class="w-full">S'inscrire</Button>
            </form>
        </Card.Content>
        <Card.Footer class="flex justify-center">
            <p class="text-sm text-muted-foreground">
                Déjà un compte ? <a href="/login" class="text-primary hover:underline">Se connecter</a>
            </p>
        </Card.Footer>
    </Card.Root>
</div> 