<script>
	// Items de navigation pour les utilisateurs non connectés
	export let itemsNonConnecte = [
		{ name: 'Connexion', link: '/login' },
		{ name: 'Inscription', link: '/register' }
	];
</script>

<nav class="flex items-center justify-between bg-gray-800 p-4">
	<div class="flex items-center">
		<a href="/">
			<img src="/favicon.png" alt="Logo" class="mr-2 h-8 w-8" />
		</a>
		<a href="/">
			<span class="text-xl font-bold text-white hover:text-green-400">CoinTracker</span>
		</a>
	</div>
	<ul class="flex list-none gap-4">
		{#each itemsNonConnecte as item}
			<li>
				<a href={item.link} class="text-white no-underline hover:text-green-400">
					{item.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>
