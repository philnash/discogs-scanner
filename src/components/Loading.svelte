<div class="loader">
  <div class="bars">
    <span class="first" />
    <span class="second" />
    <span class="third" />
    <span class="fourth" />
  </div>
  <p>Loading...</p>
</div>

<style>
  .loader {
    width: 83px;
  }
  p {
    text-align: center;
    margin: 0;
  }
  .bars {
    display: flex;
    align-items: flex-end;
    height: 30px;
    margin-bottom: 8px;
  }
  span {
    background-color: red;
    display: block;
    height: 100%;
    width: 20px;
    margin-right: 1px;
    margin-top: 0;
    --min-height: 10%;
    --max-height: 100%;
    height: var(--max-height);
  }
  span:last-child {
    margin-right: 0;
  }
  .first {
    animation: motion 0.8s linear infinite;
    --max-height: 70%;
  }
  .second {
    animation: motion 0.5s linear infinite;
    --min-height: 40%;
  }
  .third {
    animation: motion 0.35s linear infinite;
    --min-height: 30%;
    --max-height: 60%;
  }
  .fourth {
    animation: motion 0.65s linear infinite;
    --min-height: 10%;
    --max-height: 40%;
  }
  @keyframes motion {
    50% {
      height: var(--min-height);
      margin-top: calc(var(--max-height) - var(--min-height));
    }
  }
</style>
