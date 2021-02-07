<script>
  export let barcode;

  import SearchResult from "./SearchResult.svelte";
  import Loading from "./Loading.svelte";
  import { onMount } from "svelte";
  import { token, secret } from "../stores/tokens.js";

  let releases = [];
  let searching = true;

  onMount(() => {
    fetch(
      `/discogs/search?token=${$token}&secret=${$secret}&barcode=${barcode}`
    )
      .then((res) => res.json())
      .then((searchResults) => {
        searching = false;
        releases = searchResults.results;
      });
  });
</script>

<div class="container">
  {#if searching}
    <Loading />
  {:else if releases.length > 0}
    <ul>
      {#each releases as release}
        <SearchResult {release} />
      {/each}
    </ul>
  {:else}
    <p class="none">No releases found.</p>
  {/if}
</div>

<style>
  .container :global(.loader) {
    margin: 100px auto;
  }
  .none {
    text-align: center;
  }
</style>
