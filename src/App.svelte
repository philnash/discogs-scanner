<script>
  import Login from "./components/Login.svelte";
  import Scanner from "./components/Scanner.svelte";
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import { token, secret } from "./stores/tokens";
  import { user } from "./stores/user";

  $: if ($token && $secret) {
    fetch(`/discogs/user?token=${$token}&secret=${$secret}`)
      .then(res => res.json())
      .then(userData => {
        user.set(userData);
      });
  }
</script>

<style>
  main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
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
