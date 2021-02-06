<div class="info-container container">
  <p>
    Scan the barcode of an item in your music collection and this app will find
    it in Discogs and allow you to add it to your Wantlist or Collection.
  </p>
  <slot />
</div>

<style>
  p {
    font-size: 1.4em;
    text-align: center;
    line-height: 1.5;
    width: 80%;
  }
  .info-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
