import "https://cdn.jwplayer.com/libraries/NyvPFH2q.js";
// import "https://cdn.jwplayer.com/libraries/BIFJrs7x.js"
import { useEffect } from "react";

function App() {
  useEffect(async () => {
    const manifestUrl = "https://cdn.jwplayer.com/manifests/7XyquCMc.m3u8";
    const res = await fetch(
      `http://localhost:3001/get-signed-url?url=${manifestUrl}`
    );
    const url = (await res.text()).trim();

    window.jwplayer("myElement").setup({
      playlist: [{ file: url }],
    });
  }, []);

  return (
    <div className="App">
      <div id="myElement"></div>
    </div>
  );
}

export default App;
