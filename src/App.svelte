<script>
  import Login from "./components/Login.svelte";
  import Scanner from "./components/Scanner.svelte";
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import { token, secret } from "./stores/tokens";
  import { user, collections } from "./stores/user";

  $: if ($token && $secret) {
    fetch(`/discogs/user?token=${$token}&secret=${$secret}`)
      .then(res => res.json())
      .then(userData => {
        user.set(userData);
        fetch(
          `/discogs/collections?token=${$token}&secret=${$secret}&username=${userData.username}`
        )
          .then(res => res.json())
          .then(collectionData => {
            collections.set(
              collectionData.folders.filter(folder => folder.id !== 0)
            );
          });
      });
  }
</script>

<style>
  main {
    flex-grow: 1;
  }
</style>

<Header />
<main>
  {#if $token !== '' && $secret !== ''}
    <Scanner />
  {:else}
    <Login />
  {/if}
</main>
<Footer />
