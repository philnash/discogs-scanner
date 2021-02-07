<script>
  import Search from "./Search.svelte";
  import InfoContainer from "./InfoContainer.svelte";
  import LargeButton from "./LargeButton.svelte";
  let scanning = false;
  let stream;
  let barcode = "0825646266500"; // = "0602508639890";
  let canvas;
  let context;

  const scan = async () => {
    scanning = true;
    barcode = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: "environment" },
      });
    } catch (error) {
      console.error(error);
      scanning = false;
    }
  };

  const cancelScanning = () => {
    scanning = false;
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
    context = null;
    canvas = null;
  };

  const srcObject = (node, stream) => {
    node.srcObject = stream;

    const barcodeWorker = new Worker("../workers/zbar.worker.js");
    barcodeWorker.addEventListener("message", (event) => {
      if (event.data) {
        barcode = event.data;
        cancelScanning();
      } else {
        draw();
      }
    });

    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    let width = 0;
    let height = 0;

    node.addEventListener("play", () => {
      width = node.videoWidth;
      height = node.videoHeight;
      canvas.width = width;
      canvas.height = height;
      draw();
    });

    const draw = () => {
      context.drawImage(node, 0, 0, width, height);
      const imageData = context.getImageData(0, 0, width, height);
      barcodeWorker.postMessage(imageData);
    };

    return {
      update(newStream) {
        if (node.srcObject != newStream) {
          node.srcObject = newStream;
        }
      },
    };
  };
</script>

{#if barcode}
  <Search {barcode} />
  {#if !scanning}
    <LargeButton onclick={scan}>Scan again</LargeButton>
  {/if}
{:else}
  {#if !scanning}
    <InfoContainer>
      <LargeButton onclick={scan}>Scan barcode</LargeButton>
    </InfoContainer>
  {:else if stream}
    <div class="video-container">
      <!-- svelte-ignore a11y-media-has-caption -->
      <video use:srcObject={stream} autoplay playsinline />
      <LargeButton onclick={cancelScanning} class="positioned">Stop</LargeButton
      >
    </div>
  {/if}
{/if}

<style>
  .video-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: #111;
  }
  .video-container :global(.positioned) {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
  }
  .video-container video {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
  }
</style>
