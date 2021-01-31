<script>
  export let barcode;

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

<p>{barcode}</p>

<ul>
  {#each releases as { title, thumb }}
    <li>
      {#if thumb}
        <img src={thumb} alt={title} />
      {/if}
      {title}
    </li>
  {/each}
</ul>
