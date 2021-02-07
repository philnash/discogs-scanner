<script>
  export let release;
  import WantlistButton from "./WantlistButton.svelte";
  import CollectionButton from "./CollectionButton.svelte";
  import { user } from "../stores/user";

  let more = false;

  const toggleMore = () => {
    more = !more;
  };
</script>

<li class="result">
  <div class="media">
    {#if release.thumb}
      <div class="media-item">
        <img src={release.thumb} alt={release.title} />
      </div>
    {/if}
    <div class="media-body">
      <h2>{release.title}</h2>
      <p>
        <a
          href="https://www.discogs.com/{release.uri}"
          target="_blank"
          rel="noopener noreferrer">View on Discogs</a
        >
      </p>
      <button class="more" on:click={toggleMore}
        >{#if more}Hide details -{:else}Show details +{/if}</button
      >
      {#if more}
        <dl>
          {#if release.label}
            <dt>Label</dt>
            <dd>{release.label.join(", ")}</dd>
          {/if}
          {#if release.country}
            <dt>Country</dt>
            <dd>{release.country}</dd>
          {/if}
          {#if release.genre}
            <dt>Genre</dt>
            <dd>{release.genre.join(", ")}</dd>
          {/if}
          {#if release.style}
            <dt>Style</dt>
            <dd>{release.style.join(", ")}</dd>
          {/if}
        </dl>
      {/if}
    </div>
  </div>

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
</li>

<style>
  .result {
    padding-bottom: 8px;
    padding-top: 8px;
    border-bottom: 1px solid #111;
  }
  h2 {
    margin-top: 0;
  }
  .media {
    clear: both;
    overflow: hidden;
  }
  .media-item {
    float: left;
    margin-right: 1em;
    max-width: 150px;
    width: 25%;
  }
  .media-item img {
    width: 100%;
  }
  .media-body {
    margin-bottom: 1em;
  }

  .collection-btns {
    clear: both;
    display: flex;
    justify-content: space-evenly;
    margin-top: 0.5em;
  }
  .collection-btns li {
    margin-right: 8px;
  }
  .collection-btns li:last-child {
    margin-right: 0;
  }
  .more {
    border: none;
    padding: 0;
    background: transparent;
    text-decoration: underline;
  }
  .more:hover {
    cursor: pointer;
  }
  dl {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-bottom: 1em;
    margin-top: 1em;
  }
  dt {
    flex-basis: 20%;
    font-weight: bold;
  }
  dd {
    flex-basis: 70%;
    margin: 0;
    padding: 0;
    margin-bottom: 8px;
  }
  @media screen and (max-width: 400px) {
    dl {
      display: block;
    }
  }
</style>
