<script>
  import Search from "./Search.svelte";
  import Info from "./Info.svelte";
  let scanning = false;
  let stream;
  let barcode;
  let canvas;
  let context;

  const scan = async () => {
    scanning = true;
    barcode = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: "environment" }
      });
    } catch (error) {
      console.error(error);
      scanning = false;
    }
  };

  const cancelScanning = () => {
    scanning = false;
    stream.getTracks().forEach(track => track.stop());
    stream = null;
    context = null;
    canvas = null;
  };

  const srcObject = (node, stream) => {
    node.srcObject = stream;

    const barcodeWorker = new Worker("../workers/zbar.worker.js");
    barcodeWorker.addEventListener("message", event => {
      if (event.data) {
        cancelScanning();
        barcode = event.data;
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
      }
    };
  };
</script>

<style>
  button {
    text-align: center;
    margin: 1em auto;
    display: block;
    padding: 1em;
    font-size: 1.4em;
  }

  .btn-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .video-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  .video-container button {
    position: absolute;
    bottom: 8px;
    left: 8px;
    right: 8px;
    margin: 0;
  }
  .video-container video {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
  }
</style>

{#if barcode}
  <Search {barcode} />
  {#if !scanning}
    <button on:click={scan}>Scan again</button>
  {/if}
{:else}
  {#if !scanning}
    <div class="btn-container container">
      <Info />
      <button on:click={scan}>Scan barcode</button>
    </div>
  {:else if stream}
    <div class="video-container">
      <!-- svelte-ignore a11y-media-has-caption -->
      <video use:srcObject={stream} autoplay playsinline />
      <button on:click={cancelScanning}>Stop</button>
    </div>
  {/if}
{/if}
