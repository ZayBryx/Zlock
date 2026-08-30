import { Webview } from "@webview/webview";

const htmlUrl = new URL("./ui/index.html", import.meta.url);
let html = await Deno.readTextFile(htmlUrl);

// Read and Base64 encode the SVG logo to bypass data URI origin restrictions
try {
  const svgUrl = new URL("./ui/Vector.svg", import.meta.url);
  const svg = await Deno.readTextFile(svgUrl);
  const svgBase64 = btoa(svg);
  html = html.replace("{{LOGO_SVG_BASE64}}", `data:image/svg+xml;base64,${svgBase64}`);
} catch (e) {
  console.warn("[Zlock] Could not load Vector.svg:", (e as Error).message);
}

const webview = new Webview(false);
webview.title = "Zlock";

// ── Pre-load user32.dll once at startup ───────────────────────────────────
const _u32 = Deno.dlopen("user32.dll", {
  FindWindowA:      { parameters: ["pointer", "buffer"],                         result: "pointer" },
  GetWindowLongPtrA:{ parameters: ["pointer", "i32"],                            result: "i64"     },
  SetWindowLongPtrA:{ parameters: ["pointer", "i32", "i64"],                     result: "i64"     },
  SetWindowPos:     { parameters: ["pointer","pointer","i32","i32","i32","i32","u32"], result: "bool" },
  ReleaseCapture:   { parameters: [],                                            result: "bool"    },
  SendMessageA:     { parameters: ["pointer", "u32", "usize", "isize"],          result: "isize", nonblocking: true },
  ShowWindow:       { parameters: ["pointer", "i32"],                            result: "bool"    },
  IsZoomed:         { parameters: ["pointer"],                                   result: "bool"    },
});

/** Shared helper: find the Zlock HWND */
function getHwnd() {
  return _u32.symbols.FindWindowA(null, new TextEncoder().encode("Zlock\0"));
}

// ── 1. Remove OS frame ────────────────────────────────────────────────────
webview.bind("__removeFrame", () => {
  try {
    const hwnd = getHwnd();
    if (!hwnd) return "not-found";
    const GWL_STYLE = -16;
    const style = _u32.symbols.GetWindowLongPtrA(hwnd, GWL_STYLE);
    _u32.symbols.SetWindowLongPtrA(hwnd, GWL_STYLE,
      style & ~0x00C00000n & ~0x00040000n); // strip WS_CAPTION + WS_THICKFRAME
    _u32.symbols.SetWindowPos(hwnd, null, 0, 0, 0, 0, 0x0027); // FRAMECHANGED
    console.log("[Zlock] OS frame removed.");
    return "ok";
  } catch (e) {
    console.warn("[Zlock] removeFrame:", (e as Error).message);
    return "error";
  }
});

// ── 2. Native drag (WM_SYSCOMMAND / SC_MOVE trick) ────────────────────────
// Called on mousedown on the titlebar drag region from JS.
webview.bind("__startDrag", async () => {
  try {
    const hwnd = getHwnd();
    if (!hwnd) return "not-found";
    _u32.symbols.ReleaseCapture();
    // WM_SYSCOMMAND (0x112), SC_MOVE + HTCAPTION (0xF012)
    await _u32.symbols.SendMessageA(hwnd, 0x0112, 0xF012n, 0n);
    return "ok";
  } catch (e) {
    console.warn("[Zlock] startDrag:", (e as Error).message);
    return "error";
  }
});

// ── 3. Minimize and Maximize ──────────────────────────────────────────────
webview.bind("__minimize", () => {
  try {
    const hwnd = getHwnd();
    if (!hwnd) return "not-found";
    _u32.symbols.ShowWindow(hwnd, 6); // SW_MINIMIZE = 6
    return "ok";
  } catch (e) {
    console.warn("[Zlock] minimize:", (e as Error).message);
    return "error";
  }
});

webview.bind("__maximize", () => {
  try {
    const hwnd = getHwnd();
    if (!hwnd) return "not-found";
    const maximized = _u32.symbols.IsZoomed(hwnd);
    if (maximized) {
      _u32.symbols.ShowWindow(hwnd, 9); // SW_RESTORE = 9
    } else {
      _u32.symbols.ShowWindow(hwnd, 3); // SW_MAXIMIZE = 3
    }
    return "ok";
  } catch (e) {
    console.warn("[Zlock] maximize:", (e as Error).message);
    return "error";
  }
});

// ── 4. Close Window ───────────────────────────────────────────────────────
webview.bind("__closeWindow", () => {
  try {
    webview.destroy();
    return "ok";
  } catch (e) {
    console.warn("[Zlock] closeWindow:", (e as Error).message);
    return "error";
  }
});

// ── Launch ────────────────────────────────────────────────────────────────
webview.navigate(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
webview.size = { width: 420, height: 540, hint: 3 };

console.log("[Zlock] Window opened. Close it to exit.");
webview.run();
