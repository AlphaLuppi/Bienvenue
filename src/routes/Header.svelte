<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/bienvenue_logo_preview.png';
	import "../app.css";
	import { Button } from "$lib/components/ui/button";
	import * as Menubar from "$lib/components/ui/menubar";

	let isLoggedIn = false;

	let isMenuOpen = false;
	const toggleMenu = () => isMenuOpen = !isMenuOpen;
</script>

<header>
	<nav class="flex flex-no-wrap relative w-full items-center justify-between py-4 shadow-lg shadow-black/10 dark:bg-neutral-600 dark:shadow-black/10">
		<div class="flex w-full flex-wrap items-center justify-between px-3 mx-auto max-w-[1400px]">
			<Menubar.Root class="w-full justify-between">
				<div class="flex items-center gap-4">
					<Menubar.Menu>
						<a href="/" class="flex items-center">
							<img src={logo} alt="Logo" class="h-[40px]" />
						</a>
					</Menubar.Menu>
				</div>

				<!-- 
				Ici, si jamais on veut ajouter des éléments dans le menu, on peut le faire. La seule chose est que pour le moment, les éléments du menu se montre au clic. Il faudrait trouver un moyen de les montrer au survol.
				<div class="flex items-center gap-2">
					<Menubar.Menu>
						<Menubar.Trigger>Accueil</Menubar.Trigger>
						<Menubar.Content>
							<Menubar.Item>
								<a href="/">Page d'accueil</a>
							</Menubar.Item>
							<Menubar.Item>
								<a href="/nouveautes">Nouveautés</a>
							</Menubar.Item>
							<Menubar.Separator />
							<Menubar.Item>
								<a href="/a-propos">À propos</a>
							</Menubar.Item>
						</Menubar.Content>
					</Menubar.Menu>

					<Menubar.Menu>
						<Menubar.Trigger>Services</Menubar.Trigger>
						<Menubar.Content>
							<Menubar.Item>
								<a href="/services/consultation">Consultation</a>
							</Menubar.Item>
							<Menubar.Item>
								<a href="/services/formation">Formation</a>
							</Menubar.Item>
							<Menubar.Item>
								<a href="/services/accompagnement">Accompagnement</a>
							</Menubar.Item>
						</Menubar.Content>
					</Menubar.Menu>

					<Menubar.Menu>
						<Menubar.Trigger>Ressources</Menubar.Trigger>
						<Menubar.Content>
							<Menubar.Item>
								<a href="/blog">Blog</a>
							</Menubar.Item>
							<Menubar.Item>
								<a href="/faq">FAQ</a>
							</Menubar.Item>
							<Menubar.Separator />
							<Menubar.Item>
								<a href="/contact">Contact</a>
							</Menubar.Item>
						</Menubar.Content>
					</Menubar.Menu>
				</div> -->

				<div class="flex items-center gap-2">
					{#if !isLoggedIn}
						<Menubar.Menu>
							<Button variant="secondary">
								Se connecter
							</Button>
						</Menubar.Menu>
						<Menubar.Menu>
							<Button variant="default">
								S'inscrire
							</Button>
						</Menubar.Menu>
					{:else}
						<Menubar.Menu>
							<Menubar.Trigger>Mon compte</Menubar.Trigger>
							<Menubar.Content>
								<Menubar.Item>
									<a href="/profil">Profil</a>
								</Menubar.Item>
								<Menubar.Item>
									<a href="/parametres">Paramètres</a>
								</Menubar.Item>
								<Menubar.Separator />
								<Menubar.Item>
									<button class="w-full text-left text-red-500">
										Se déconnecter
									</button>
								</Menubar.Item>
							</Menubar.Content>
						</Menubar.Menu>
					{/if}
				</div>
			</Menubar.Root>
		</div>
	</nav>
</header>