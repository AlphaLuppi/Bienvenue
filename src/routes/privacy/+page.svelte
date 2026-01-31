<script lang="ts">
    import "../../app.css";
</script>

<svelte:head>
    <title>Politique de Confidentialité - Bienvenue</title>
    <meta name="description" content="Politique de confidentialité et protection des données personnelles de Bienvenue. Conformité RGPD." />
</svelte:head>

<div class="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
        <h1 class="text-4xl font-bold tracking-tight mb-8">Politique de Confidentialité</h1>
        <p class="text-muted-foreground mb-8">Dernière mise à jour : 30 Janvier 2026</p>

        <div class="prose prose-slate dark:prose-invert max-w-none">
            <h2>1. Introduction</h2>
            <p>
                Chez Bienvenue, nous accordons une grande importance à la protection de vos données personnelles.
                Cette politique de confidentialité explique comment nous collectons, utilisons, conservons et protégeons
                vos informations conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>

            <h2>2. Responsable du traitement</h2>
            <p>
                Le responsable du traitement de vos données personnelles est :<br />
                <strong>Bienvenue</strong><br />
                Pour toute question relative à la protection de vos données, contactez-nous via notre
                <a href="/contact" class="text-primary hover:underline">page de contact</a>.
            </p>

            <h2>3. Données collectées</h2>
            <p>Nous collectons les types de données suivants :</p>

            <h3>3.1 Données d'identification</h3>
            <ul>
                <li>Adresse email (pour l'authentification)</li>
                <li>Identifiant de compte (UUID anonyme)</li>
            </ul>

            <h3>3.2 Données de conversation</h3>
            <ul>
                <li>Messages échangés avec notre assistant IA</li>
                <li>Critères de recherche exprimés (emploi, logement, localisation)</li>
                <li>Préférences de relocation</li>
            </ul>

            <h3>3.3 Données d'utilisation</h3>
            <ul>
                <li>Communes favorites enregistrées</li>
                <li>Abonnements aux notifications (Ghost Monitoring)</li>
                <li>Historique des sessions</li>
            </ul>

            <h3>3.4 Données techniques</h3>
            <ul>
                <li>Données de navigation anonymisées</li>
                <li>Métriques de performance (sans données personnelles)</li>
            </ul>

            <h2>4. Bases légales du traitement</h2>
            <p>Nous traitons vos données sur les bases légales suivantes :</p>
            <ul>
                <li><strong>Exécution du contrat :</strong> Pour fournir nos services de recommandation de communes</li>
                <li><strong>Consentement :</strong> Pour l'envoi de notifications par email (Ghost Monitoring)</li>
                <li><strong>Intérêt légitime :</strong> Pour améliorer nos services et assurer la sécurité</li>
                <li><strong>Obligation légale :</strong> Pour respecter nos obligations réglementaires</li>
            </ul>

            <h2>5. Utilisation des données</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul>
                <li>Personnaliser les recommandations de communes selon vos critères</li>
                <li>Maintenir l'historique de vos conversations et préférences</li>
                <li>Vous notifier de nouvelles opportunités (si vous y avez consenti)</li>
                <li>Améliorer nos algorithmes de recommandation</li>
                <li>Assurer la sécurité et le bon fonctionnement de la plateforme</li>
            </ul>

            <h2>6. Durée de conservation</h2>
            <div class="bg-muted/50 p-4 rounded-lg my-4">
                <p class="font-semibold mb-2">Important :</p>
                <p>
                    Vos données sont conservées pendant toute la durée d'utilisation de votre compte.
                    <strong>Après 90 jours d'inactivité</strong>, vos données sont automatiquement supprimées
                    de nos systèmes conformément à notre politique de rétention RGPD.
                </p>
            </div>
            <ul>
                <li><strong>Données de compte :</strong> Jusqu'à suppression du compte ou 90 jours d'inactivité</li>
                <li><strong>Conversations :</strong> Jusqu'à suppression du compte ou 90 jours d'inactivité</li>
                <li><strong>Favoris et abonnements :</strong> Jusqu'à suppression du compte ou 90 jours d'inactivité</li>
                <li><strong>Logs techniques :</strong> 90 jours (sans données personnelles identifiables)</li>
            </ul>

            <h2>7. Vos droits RGPD</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>

            <h3>7.1 Droit d'accès (Article 15)</h3>
            <p>Vous pouvez demander une copie de toutes les données que nous détenons sur vous.</p>

            <h3>7.2 Droit de rectification (Article 16)</h3>
            <p>Vous pouvez demander la correction de données inexactes vous concernant.</p>

            <h3>7.3 Droit à l'effacement (Article 17)</h3>
            <div class="bg-muted/50 p-4 rounded-lg my-4">
                <p class="font-semibold mb-2">Comment supprimer vos données :</p>
                <ol class="list-decimal list-inside space-y-2">
                    <li>Connectez-vous à votre compte</li>
                    <li>Accédez aux paramètres de votre compte</li>
                    <li>Cliquez sur "Supprimer mon compte"</li>
                    <li>Confirmez la suppression</li>
                </ol>
                <p class="mt-2 text-sm text-muted-foreground">
                    La suppression est irréversible et inclut : toutes vos conversations, favoris,
                    abonnements aux notifications et votre compte utilisateur.
                </p>
            </div>

            <h3>7.4 Droit à la limitation du traitement (Article 18)</h3>
            <p>Vous pouvez demander la limitation du traitement de vos données dans certaines circonstances.</p>

            <h3>7.5 Droit à la portabilité (Article 20)</h3>
            <p>
                Vous pouvez exporter vos données dans un format structuré et lisible par machine.
                Cette fonctionnalité est disponible dans les paramètres de votre compte.
            </p>

            <h3>7.6 Droit d'opposition (Article 21)</h3>
            <p>Vous pouvez vous opposer au traitement de vos données à tout moment.</p>

            <h3>7.7 Droit de retirer votre consentement</h3>
            <p>
                Pour les notifications par email, vous pouvez vous désinscrire à tout moment via
                le lien présent dans chaque email ou dans les paramètres de votre compte.
            </p>

            <h2>8. Sous-traitants et transferts de données</h2>
            <p>Nous faisons appel aux sous-traitants suivants pour fournir nos services :</p>
            <table class="min-w-full mt-4">
                <thead>
                    <tr class="border-b">
                        <th class="text-left py-2">Sous-traitant</th>
                        <th class="text-left py-2">Service</th>
                        <th class="text-left py-2">Localisation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b">
                        <td class="py-2">Supabase</td>
                        <td class="py-2">Base de données et authentification</td>
                        <td class="py-2">UE (AWS eu-west)</td>
                    </tr>
                    <tr class="border-b">
                        <td class="py-2">Vercel</td>
                        <td class="py-2">Hébergement frontend</td>
                        <td class="py-2">UE</td>
                    </tr>
                    <tr class="border-b">
                        <td class="py-2">OpenAI / Anthropic</td>
                        <td class="py-2">Traitement du langage naturel</td>
                        <td class="py-2">USA (clauses contractuelles types)</td>
                    </tr>
                </tbody>
            </table>
            <p class="mt-4 text-sm">
                Tous nos sous-traitants sont soumis à des obligations contractuelles strictes
                concernant la protection de vos données.
            </p>

            <h2>9. Sécurité des données</h2>
            <p>Nous mettons en oeuvre des mesures de sécurité techniques et organisationnelles :</p>
            <ul>
                <li>Chiffrement des données en transit (HTTPS/TLS 1.3)</li>
                <li>Chiffrement des données au repos</li>
                <li>Authentification sécurisée via JWT</li>
                <li>Aucune donnée personnelle identifiable dans les logs</li>
                <li>Accès restreint aux données (principe du moindre privilège)</li>
            </ul>

            <h2>10. Cookies</h2>
            <p>
                Nous utilisons des cookies essentiels pour le fonctionnement de la plateforme
                (authentification, préférences de session). Ces cookies ne nécessitent pas de
                consentement car ils sont strictement nécessaires au service.
            </p>
            <p>
                Nous pouvons utiliser des cookies analytiques (PostHog) pour améliorer nos services.
                Ces données sont anonymisées et ne permettent pas de vous identifier personnellement.
            </p>

            <h2>11. Modifications de cette politique</h2>
            <p>
                Nous nous réservons le droit de modifier cette politique de confidentialité.
                En cas de modification substantielle, nous vous en informerons par email ou via
                une notification sur la plateforme.
            </p>

            <h2>12. Réclamation</h2>
            <p>
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une
                réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
            </p>
            <p class="mt-2">
                <strong>CNIL</strong><br />
                3 Place de Fontenoy - TSA 80715<br />
                75334 Paris Cedex 07<br />
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">www.cnil.fr</a>
            </p>

            <h2>13. Contact</h2>
            <p>
                Pour exercer vos droits ou pour toute question concernant cette politique de confidentialité,
                contactez-nous via notre <a href="/contact" class="text-primary hover:underline">page de contact</a>.
            </p>
        </div>
    </div>
</div>
