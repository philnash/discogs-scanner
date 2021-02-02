<script>
  export let barcode;

  import SearchResult from "./SearchResult.svelte";
  import { onMount } from "svelte";
  import { token, secret } from "../stores/tokens.js";

  let releases = [];

  onMount(() => {
    fetch(
      `/discogs/search?token=${$token}&secret=${$secret}&barcode=${barcode}`
    )
      .then(res => res.json())
      .then(searchResults => {
        console.log(searchResults);
        releases = searchResults.results;
      });
  });
</script>

<div class="container">
  <ul>
    {#each releases as release}
      <SearchResult {release} />
    {/each}
  </ul>
</div>
