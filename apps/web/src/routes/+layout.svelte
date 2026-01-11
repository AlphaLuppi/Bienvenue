<script lang="ts">
    import '../app.css';
    import { invalidate } from '$app/navigation';
    import { authStore, initializeAuthStore } from '$lib/stores/auth.svelte.ts';
    import type { LayoutData } from './$types';

    let { children, data }: { children: any, data: LayoutData } = $props();

    // Initialiser le store avec les données du serveur
    $effect(() => {
        if (data.supabase) {
            initializeAuthStore(data.supabase);
            authStore.setSession(data.session, data.user);
        }
    });

    // Écouter les changements d'authentification
    $effect(() => {
        if (data.supabase) {
            const { data: authData } = data.supabase.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
                    invalidate('supabase:auth');
                }
            });

            return () => {
                authData.subscription.unsubscribe();
            };
        }
    });
</script>

{@render children()} 