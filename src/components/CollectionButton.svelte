<script>
  export let release;
  import { token, secret } from "../stores/tokens.js";
  import { user } from "../stores/user.js";

  let loading = false;
  let folder;

  const addReleaseToCollection = async () => {
    loading = true;
    await fetch(
      `/discogs/addToCollection?token=${$token}&secret=${$secret}&username=${
        $user.username
      }&folder=${folder || "1"}&release=${release.id}`
    );
    loading = false;
    release.user_data.in_collection = true;
  };
</script>

<style>
  span {
    padding: 0.4em;
    display: block;
  }
</style>

{#if release.user_data.in_collection}
  <span>In collection</span>
{:else}
  <button on:click={addReleaseToCollection}>Add to collection</button>
{/if}
