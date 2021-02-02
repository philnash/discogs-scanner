<script>
  export let release;
  import WantlistButton from "./WantlistButton.svelte";
  import CollectionButton from "./CollectionButton.svelte";
  import { token, secret } from "../stores/tokens.js";
  import { user } from "../stores/user";

  let folder;
</script>

<li>
  {#if release.thumb}
    <img src={release.thumb} alt={release.title} />
  {/if}
  <h2>{release.title}</h2>

  {#if $user}
    <CollectionButton {release} />
  {/if}

  {#if $user}
    <WantlistButton {release} />
  {/if}
</li>
