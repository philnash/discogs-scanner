<script>
  export let release;
  import { token, secret } from "../stores/tokens.js";
  import { user, collections } from "../stores/user.js";

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

{#if !release.user_data.in_collection}
  {#if $collections}
    <p>
      {#if $collections.length === 1}
        Add release to collection
      {:else}
        Add release to
        <select bind:value={folder}>
          {#each $collections as collection}
            <option value={collection.id}>{collection.name}</option>
          {/each}
        </select>
      {/if}
      <button on:click={addReleaseToCollection}>Submit</button>
    </p>
  {/if}
{:else}
  <p>In collection</p>
{/if}
