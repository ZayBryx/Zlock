# Zlock

Zlock is a modern, high-performance desktop World Clock widget for Windows. Built using **Deno** and **WebView2**, it features a gorgeous, glowing dark-mode interface with borderless, native window integration.

![Zlock Logo](ui/logo.png)

## Features

- **Borderless Floating Window**: Integrates with the native Windows API via `user32.dll` (FFI) to remove default OS captions and borders for a premium desktop look.
- **Native Window Dragging**: Custom titlebar mouse interaction translates directly into Windows move loop messages for smooth, lag-free window movement.
- **World Clock Integration**: Search and add multiple timezones from around the globe. Displays live clocks with flags, custom names, local dates, offsets, and relative day tags (*yesterday* / *tomorrow*).
- **PE Header Patched**: Automated post-build patch modifies the PE subsystem flag, turning the compiled Deno binary into a true GUI application (prevents empty Command Prompt windows from flashing upon launch).
- **Automated Installer & Uninstaller**: 
  - Administrative PowerShell script (`Setup.ps1`) to set up folder structures, start menu shortcuts, silent startup scripts, and register the app in Windows' Add/Remove Programs.
  - Inno Setup script (`zlock.iss`) to compile a single-file executable wizard.

---

## Getting Started

### Prerequisites

- [Deno](https://deno.com) (v1.40+)
- Windows 10/11 with WebView2 runtime installed (installed by default on modern Windows)

### Development

To run the application in development mode with hot-reloading and FFI capabilities enabled:

```bash
deno task dev
```

### Build Executable

To compile, patch, and package the standalone executable:

```bash
deno task build
```

This command will:
1. Compile the code using `deno compile`.
2. Package the custom widget UI into the binary.
3. Automatically run `patch_pe.ts` to convert the binary to a GUI subsystem executable.

---

## Installation

### Method 1: PowerShell Installer (Recommended)
Right-click `Setup.ps1` and select **Run with PowerShell**, or execute this from an elevated command prompt:

```powershell
powershell -ExecutionPolicy Bypass -File Setup.ps1
```

This will copy Zlock to `C:\Program Files\Zlock`, configure a startup task to run silently on boot, and register the uninstaller in your Windows control panel.

### Method 2: Inno Setup
Compile the `zlock.iss` file using the [Inno Setup Compiler](https://jrsoftware.org/isinfo.php) to generate `ZlockSetup.exe`.

---

## Project Structure

- [main.ts](file:///d:/Code/Zlock/main.ts): Configures the WebView2 window, loads UI, and maps native window events (drag, minimize, maximize, close) using Windows FFI.
- [build.ts](file:///d:/Code/Zlock/build.ts): Compiles `Vector.svg` into `.png` and `.ico` assets.
- [patch_pe.ts](file:///d:/Code/Zlock/patch_pe.ts): Post-build patch utility that updates the subsystem header of `zlock.exe` to run in GUI mode.
- [ui/index.html](file:///d:/Code/Zlock/ui/index.html): The complete frontend user interface featuring CSS ambient glows, custom scrollbars, timezone search, and persistent storage.
- [Setup.ps1](file:///d:/Code/Zlock/Setup.ps1): PowerShell script for administrative installs/uninstalls.
- [zlock.iss](file:///d:/Code/Zlock/zlock.iss): Standard Inno Setup installer script.
