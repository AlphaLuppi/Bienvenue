<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	// onMount(async () => {
	// 	const { data, error } = await supabase.auth.getSessionFromUrl();
	// 	if (error) {
	// 		console.error('Erreur lors de la récupération de la session :', error.message);
	// 	} else {
	// 		goto('/'); // Redirige vers la page d'accueil ou une autre page sécurisée
	// 	}
	// });
</script>

<p>Traitement de la connexion...</p>
