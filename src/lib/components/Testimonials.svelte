<script lang="ts">
  import Marquee from "./Marquee.svelte";
  import ReviewCard from "./ReviewCard.svelte";

  const reviews = [
    {
      name: "Marie Laurent",
      username: "@MarieL",
      body: "Grâce à Bienvenue, j'ai trouvé une nouvelle vie dans une petite ville de province. Le changement a été totalement transformateur !",
      img: "https://avatar.vercel.sh/marie",
    },
    {
      name: "Thomas Dubois",
      username: "@ThomasD",
      body: "J'ai toujours rêvé de changer de vie. Cette plateforme m'a donné le courage et les outils pour le faire. Je suis maintenant boulanger en Bretagne !",
      img: "https://avatar.vercel.sh/thomas",
    },
    {
      name: "Sophie Martin",
      username: "@SophieM",
      body: "Une expérience incroyable ! J'ai rencontré des gens formidables et trouvé un nouveau métier qui me passionne vraiment.",
      img: "https://avatar.vercel.sh/sophie",
    },
    {
      name: "Lucas Petit",
      username: "@LucasP",
      body: "Le processus a été super simple et accompagné. Je suis maintenant installé dans les Alpes et je ne regrette rien !",
      img: "https://avatar.vercel.sh/lucas",
    },
    {
      name: "Emma Bernard",
      username: "@EmmaB",
      body: "Bienvenue m'a permis de concrétiser mon projet de reconversion. Je suis maintenant propriétaire d'une petite épicerie bio.",
      img: "https://avatar.vercel.sh/emma",
    },
    {
      name: "Nicolas Rousseau",
      username: "@NicolasR",
      body: "Une plateforme qui change vraiment la vie ! J'ai trouvé ma nouvelle maison et un nouveau métier en quelques semaines.",
      img: "https://avatar.vercel.sh/nicolas",
    },
  ];

  let firstRow = reviews.slice(0, reviews.length / 2);
  let secondRow = reviews.slice(reviews.length / 2);
</script>

<div class="relative w-full overflow-hidden bg-background py-20">
  <h2 class="text-3xl font-bold mb-12 text-center">Ils ont changé leur vie</h2>
  <Marquee pauseOnHover class="[--duration:20s] will-change-transform">
    {#each firstRow as item}
      <ReviewCard {...item} />
    {/each}
  </Marquee>
  <Marquee reverse pauseOnHover class="[--duration:20s] will-change-transform">
    {#each secondRow as item}
      <ReviewCard {...item} />
    {/each}
  </Marquee>
  <div class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
  <div class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
</div> 