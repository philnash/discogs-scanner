<script>
  export let onclick;
</script>

<button on:click={onclick} class={$$props.class}><slot /></button>

<style>
  button {
    text-align: center;
    margin: 1em auto;
    display: block;
    padding: 1em;
    font-size: 1.4em;
  }
</style>
