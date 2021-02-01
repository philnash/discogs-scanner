import { scanImageData } from "zbar.wasm";

const handleImage = async (event) => {
  const results = await scanImageData(event.data);
  if (results[0]) {
    self.postMessage(results[0].decode());
  } else {
    self.postMessage("");
  }
};

self.addEventListener("message", handleImage);
