<script>
  export let release;
  import { token, secret } from "../stores/tokens.js";
  import { user } from "../stores/user.js";

  let loading = false;

  const addReleaseToWantList = async () => {
    loading = true;
    await fetch(
      `/discogs/addToWantlist?token=${$token}&secret=${$secret}&username=${$user.username}&release=${release.id}`
    );
    loading = false;
    release.user_data.in_wantlist = true;
  };

  const removeReleaseFromWantlist = async () => {
    loading = true;
    await fetch(
      `/discogs/removeFromWantlist?token=${$token}&secret=${$secret}&username=${$user.username}&release=${release.id}`
    );
    loading = false;
    release.user_data.in_wantlist = false;
  };
</script>

{#if !release.user_data.in_wantlist}
  <button on:click={addReleaseToWantList} disabled={loading}>
    Add to wantlist
  </button>
{:else}
  <button on:click={removeReleaseFromWantlist} disabled={loading}>
    Remove from wantlist
  </button>
{/if}
