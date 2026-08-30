// Deno script to patch compiled PE executables from Console (3) to GUI (2).
// This removes the black command prompt window when launching the widget.

try {
  const file = await Deno.open("zlock.exe", { read: true, write: true });

  // Read PE signature offset at 0x3C
  const offsetBuffer = new Uint8Array(4);
  await file.seek(0x3C, Deno.SeekMode.Start);
  const bytesRead = await file.read(offsetBuffer);
  if (bytesRead !== 4) throw new Error("Could not read PE offset pointer");
  
  const peOffset = new DataView(offsetBuffer.buffer).getUint32(0, true);

  // Verify PE signature ("PE\0\0")
  const sigBuffer = new Uint8Array(4);
  await file.seek(peOffset, Deno.SeekMode.Start);
  await file.read(sigBuffer);
  const peSig = new TextDecoder().decode(sigBuffer);
  if (peSig !== "PE\0\0") {
    throw new Error("Target is not a valid PE executable");
  }

  // Subsystem offset is at peOffset + 92 (for both PE32 and PE32+ formats)
  const subsystemOffset = peOffset + 92;
  await file.seek(subsystemOffset, Deno.SeekMode.Start);
  const subsystemBuffer = new Uint8Array(2);
  await file.read(subsystemBuffer);
  
  const currentSubsystem = new DataView(subsystemBuffer.buffer).getUint16(0, true);
  console.log(`[Zlock] Current PE Subsystem: ${currentSubsystem} (${currentSubsystem === 3 ? "Console" : "GUI"})`);

  if (currentSubsystem === 3) {
    // Write 2 (GUI Subsystem)
    await file.seek(subsystemOffset, Deno.SeekMode.Start);
    await file.write(new Uint8Array([2, 0]));
    console.log("[Zlock] Successfully patched zlock.exe to GUI Subsystem (No console window will flash!).");
  } else {
    console.log("[Zlock] Executable is already GUI Subsystem.");
  }

  file.close();
} catch (e) {
  console.error("[Zlock] PE Patch failed:", (e as Error).message);
}
