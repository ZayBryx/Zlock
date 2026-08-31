# Zlock (Chrome Extension)

Zlock is a modern, high-performance browser extension displaying a premium dark-mode World Clock widget inside Google Chrome. It features a glowing dark-mode interface with ambient gradient overlays and live timezone calculations.

![Zlock Popup](icons/logo.png)

## Features

- **Chrome Action Popup**: Opens instantly as a lightweight dropdown menu in the extension toolbar.
- **World Clock Integration**: Search and add multiple timezones from around the globe. Displays live clocks with emojis/flags, custom names, local dates, offsets, and relative day tags (*yesterday* / *tomorrow*).
- **Persistent Storage**: Save your configured timezones seamlessly across sessions using standard web storage.
- **CSP Compliant**: Built strictly adhering to Manifest V3's strict Content Security Policy (no inline scripts or styles).

---

## Installation (Developer Mode)

To run the application locally inside Google Chrome:

1. Clone or checkout the `chrome-extension` branch of this repository.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable the **Developer mode** toggle in the top-right corner of the page.
4. Click the **Load unpacked** button in the top-left corner.
5. Select the `Zlock` root directory containing `manifest.json`.
6. Zlock will now appear in your extensions list. Pin it to your toolbar for quick access!

---

## Project Structure

- [manifest.json](file:///d:/Code/Zlock/manifest.json): Extension configuration metadata containing action hooks and icons definition.
- [index.html](file:///d:/Code/Zlock/index.html): The extension popup structure, loading CSS and Javascript externally.
- [styles.css](file:///d:/Code/Zlock/styles.css): Stylings, layout structure, color tokens, scrollbars, and keyframe animations.
- [app.js](file:///d:/Code/Zlock/app.js): Core script implementing world time ticker updates, dynamic template rendering, active zone removal, and persistent state retrieval.
- [icons/](file:///d:/Code/Zlock/icons/): Contains the transparent high-res PNG icon and SVG layout logo vector.
