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

{#if release.user_data.in_collection}
  <p>In collection</p>
{:else}
  <p>
    <button on:click={addReleaseToCollection}>Add to collection</button>
  </p>
{/if}
