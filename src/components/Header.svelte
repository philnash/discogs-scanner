<script>
  import { user } from "../stores/user";
  import { token, secret } from "../stores/tokens.js";

  const logout = () => {
    token.set("");
    secret.set("");
    user.set(null);
  };
</script>

<style>
  header {
    background: #111;
    border-bottom: 2px solid #ff5252;
    padding: 8px;
  }

  header h1 {
    margin: 0;
    flex-grow: 1;
  }

  header .container {
    display: flex;
  }

  header .user {
    display: flex;
    align-items: center;
  }
  header .user img {
    height: 32px;
    width: 32px;
    border-radius: 100%;
    margin-right: 0.4em;
  }
  header .user p {
    margin: 0;
    margin-right: 1em;
  }
  header .user button {
    background: #333;
    border: 1px solid #b33939;
    color: #f7f1e3;
    margin-bottom: 0;
  }
  header .user button:hover,
  header .user button:active {
    background: #b33939;
  }

  @media (max-width: 400px) {
    header h1 {
      font-size: 24px;
    }
    header .user img {
      height: 24px;
      width: 24px;
    }
    .user p {
      display: none;
    }
    .user button {
      padding: 0.2em;
    }
  }
</style>

<header>
  <div class="container">
    <h1>Discogs Scanner</h1>

    {#if $user}
      <div class="user">
        <img src={$user.avatar_url} alt={$user.username} />
        <p>{$user.username}</p>
        <button on:click={logout}>Log out</button>
      </div>
    {/if}
  </div>
</header>
