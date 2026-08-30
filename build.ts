import { Webview } from "@webview/webview";

const svgText = await Deno.readTextFile(new URL("./ui/Vector.svg", import.meta.url));

// We launch a brief hidden webview to render the SVG to a PNG canvas
const webview = new Webview(false);
webview.title = "Zlock Icon Builder";
webview.size = { width: 100, height: 100, hint: 3 };

webview.bind("__saveIcon", async (base64Png: string) => {
  try {
    const pngBytes = Uint8Array.from(atob(base64Png), c => c.charCodeAt(0));
    
    // Write PNG
    await Deno.writeFile("./ui/logo.png", pngBytes);

    // Convert PNG to valid Windows ICO file (Prefix with 22-byte header)
    const icoHeader = new Uint8Array([
      0, 0,           // Reserved (must be 0)
      1, 0,           // ResType (1 = Icon)
      1, 0,           // ResCount (1 icon)
      0,              // Width (0 = 256px)
      0,              // Height (0 = 256px)
      0,              // Colors (0 = no palette)
      0,              // Reserved (must be 0)
      1, 0,           // Color Planes (1)
      32, 0,          // Bits Per Pixel (32)
      ...numTo4Bytes(pngBytes.length), // Size of PNG data (4 bytes)
      22, 0, 0, 0     // Offset to PNG data (6 + 16 = 22)
    ]);

    const icoBytes = new Uint8Array(icoHeader.length + pngBytes.length);
    icoBytes.set(icoHeader, 0);
    icoBytes.set(pngBytes, icoHeader.length);

    await Deno.writeFile("./ui/logo.ico", icoBytes);
    console.log("[Zlock] Logo rendered and converted to ui/logo.ico successfully.");
  } catch (e) {
    console.error("[Zlock] Icon save error:", e);
  } finally {
    webview.destroy();
  }
});

function numTo4Bytes(num: number): number[] {
  return [
    num & 0xff,
    (num >> 8) & 0xff,
    (num >> 16) & 0xff,
    (num >> 24) & 0xff
  ];
}

// Load simple page that draws SVG to canvas and saves it
const runnerHtml = `
<!DOCTYPE html>
<html>
<body>
<canvas id="canvas" width="256" height="256"></canvas>
<script>
  const svgText = \`${svgText.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  
  // Create a clean background or just transparent
  const img = new Image();
  const blob = new Blob([svgText], {type: "image/svg+xml;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  
  img.onload = () => {
    // Center and render the SVG logo inside the 256x256 canvas with padding
    ctx.clearRect(0, 0, 256, 256);
    ctx.drawImage(img, 16, 16, 224, 224);
    
    const pngBase64 = canvas.toDataURL("image/png").split(",")[1];
    __saveIcon(pngBase64);
  };
  img.src = url;
</script>
</body>
</html>
`;

webview.navigate(`data:text/html;charset=utf-8,${encodeURIComponent(runnerHtml)}`);
webview.run();
