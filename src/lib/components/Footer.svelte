<script lang="ts">
    import { cn } from "$lib/utils";
    
    const links = [
        {
            title: "À propos",
            items: [
                { label: "Notre mission", href: "/about" },
                { label: "L'équipe", href: "/team" },
                { label: "Blog", href: "/blog" }
            ]
        },
        {
            title: "Légal",
            items: [
                { label: "CGU", href: "/terms" },
                { label: "Politique de confidentialité", href: "/privacy" },
                { label: "Mentions légales", href: "/legal" }
            ]
        },
        {
            title: "Contact",
            items: [
                { label: "Support", href: "/support" },
                { label: "Contact", href: "/contact" }
            ]
        }
    ];
</script>

<footer class="mt-auto border-t bg-background/80 backdrop-blur-md">
    <div class="container px-4 py-8 md:px-8">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div class="col-span-2 md:col-span-1">
                <h3 class="text-lg font-semibold">Bienvenue</h3>
                <p class="mt-4 text-sm text-muted-foreground">
                    Trouvez l'endroit idéal pour votre nouvelle vie.
                </p>
            </div>
            {#each links as section}
                <div>
                    <h4 class="font-medium">{section.title}</h4>
                    <ul class="mt-4 space-y-2">
                        {#each section.items as item}
                            <li>
                                <a 
                                    href={item.href}
                                    class="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {item.label}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </div>
        <div class="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Bienvenue. Tous droits réservés.</p>
        </div>
    </div>
</footer> 