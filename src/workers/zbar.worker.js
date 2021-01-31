import { scanImageData } from "zbar.wasm";

const handleImage = async (event) => {
  var t0 = performance.now();
  const results = await scanImageData(event.data);
  var t1 = performance.now();
  console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
  if (results[0]) {
    self.postMessage(results[0].decode());
  } else {
    self.postMessage("");
  }
};

self.addEventListener("message", handleImage);
