<script>
  import { token, secret } from "../stores/tokens";
  import InfoContainer from "./InfoContainer.svelte";

  let windowRef, accessTokenSecret;

  const receiveMessage = async (event) => {
    const { data } = event;
    const oauthParams = new URLSearchParams(data);
    const url = new URL(`${window.location.origin}/discogs/callback`);
    oauthParams.set("oauth_token_secret", accessTokenSecret);
    url.search = oauthParams.toString();
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        token.set(data.token);
        secret.set(data.tokenSecret);
      });
  };

  const auth = async () => {
    if (!windowRef) {
      windowRef = window.open();
      window.addEventListener("message", receiveMessage);
    }

    const oauth = await fetch("/discogs/auth").then((res) => res.json());
    accessTokenSecret = oauth.tokenSecret;
    windowRef.location.replace(oauth.authorizeUrl);
    windowRef.focus();
  };
</script>

<InfoContainer>
  <button on:click={auth}>Login with Discogs</button>
</InfoContainer>

<style>
  button {
    text-align: center;
    margin: 1em auto;
    display: block;
    padding: 1em;
    font-size: 1.4em;
  }
</style>
