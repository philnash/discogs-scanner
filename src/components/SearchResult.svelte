<script>
  export let release;
  import WantlistButton from "./WantlistButton.svelte";
  import CollectionButton from "./CollectionButton.svelte";
  import { token, secret } from "../stores/tokens.js";
  import { user } from "../stores/user";

  let folder;
</script>

<style>
  .media {
    display: flex;
  }
  .media-item {
    margin-right: 1em;
  }
  .media-body {
    flex-grow: 1;
  }

  .collection-btns {
    display: flex;
  }
  .collection-btns li {
    margin-right: 8px;
  }
  .collection-btns li:last-child {
    margin-right: 0;
  }
</style>

<li>
  <div class="media">
    {#if release.thumb}
      <div class="media-item">
        <img src={release.thumb} alt={release.title} />
      </div>
    {/if}
    <div class="media-body">
      <h2>{release.title}</h2>
      <dl>
        {#if release.label}
          <dt>Label</dt>
          <dd>{release.label.join(', ')}</dd>
        {/if}
        {#if release.country}
          <dt>Country</dt>
          <dd>{release.country}</dd>
        {/if}
        {#if release.genre}
          <dt>Genre</dt>
          <dd>{release.genre.join(', ')}</dd>
        {/if}
        {#if release.style}
          <dt>Style</dt>
          <dd>{release.style.join(', ')}</dd>
        {/if}
      </dl>

      {#if $user}
        <ul class="collection-btns">
          <li>
            <CollectionButton {release} />
          </li>
          <li>
            <WantlistButton {release} />
          </li>
        </ul>
      {/if}
    </div>
  </div>
</li>
