<script>
  import Search from "./Search.svelte";
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

{#if barcode}
  <Search {barcode} />
  {#if !scanning}
    <button on:click={scan}>Scan again</button>
  {/if}
{:else}
  {#if !scanning}
    <button on:click={scan}>Scan barcode</button>
  {:else if stream}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video use:srcObject={stream} autoplay playsinline />
    <button on:click={cancelScanning}>Stop</button>
  {/if}
{/if}
