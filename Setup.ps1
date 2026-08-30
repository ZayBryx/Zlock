# Self-elevate to Administrator if not already running as Admin
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Start-Process powershell.exe -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

Clear-Host
Write-Host "==========================================" -ForegroundColor Orange
Write-Host "         ZLOCK INSTALLER WIZARD           " -ForegroundColor Orange -Bold
Write-Host "==========================================" -ForegroundColor Orange
Write-Host ""

$installDir = "C:\Program Files\Zlock"
$exePath = Join-Path $installDir "zlock.exe"

# 1. Create Target Directory
if (-not (Test-Path $installDir)) {
    Write-Host "Creating installation directory: $installDir..." -ForegroundColor DarkGray
    New-Item -ItemType Directory -Path $installDir -Force | Out-Null
}

# 2. Check if zlock.exe is built
$localExe = "d:\Code\Zlock\zlock.exe"
if (-not (Test-Path $localExe)) {
    Write-Host "Building Zlock executable first..." -ForegroundColor DarkGray
    deno task build
    if (-not (Test-Path $localExe)) {
        Write-Host "Error: Failed to build zlock.exe!" -ForegroundColor Red
        Pause
        exit 1
    }
}

# 3. Copy Executable
Write-Host "Installing Zlock files..." -ForegroundColor Gray
Copy-Item -Path $localExe -Destination $exePath -Force

# 4. Create Start Menu Shortcut
$startMenuPath = "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Zlock.lnk"
Write-Host "Creating Start Menu shortcut..." -ForegroundColor Gray
$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut($startMenuPath)
$Shortcut.TargetPath = $exePath
$Shortcut.WorkingDirectory = $installDir
$Shortcut.Description = "Zlock World Clock Desktop Widget"
$Shortcut.Save()

# 5. Create Silent Startup script
$startupPath = Join-Path [System.Environment]::GetFolderPath('Startup') "zlock.vbs"
Write-Host "Configuring automatic launch on startup..." -ForegroundColor Gray
$vbsContent = @"
Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "`"$exePath`"", 0, false
"@
Set-Content -Path $startupPath -Value $vbsContent -Force

# 6. Create Uninstaller Script
$uninstallScript = Join-Path $installDir "uninstall.ps1"
$uninstallContent = @"
`# Self-elevate to Administrator
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Start-Process powershell.exe -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File \`"`$PSCommandPath\`"" -Verb RunAs
    exit
}

Write-Host "Uninstalling Zlock..." -ForegroundColor Orange

`# Remove Start Menu shortcut
`$shortcut = "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Zlock.lnk"
if (Test-Path `$shortcut) { Remove-Item `$shortcut -Force }

`# Remove Startup script
`$startup = Join-Path [System.Environment]::GetFolderPath('Startup') "zlock.vbs"
if (Test-Path `$startup) { Remove-Item `$startup -Force }

`# Remove Registry entry
Remove-Item -Path "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Zlock" -Force -ErrorAction SilentlyContinue

`# Close zlock if running
Stop-Process -Name zlock -Force -ErrorAction SilentlyContinue

`# Remove Installation directory
`$installDir = "C:\Program Files\Zlock"
if (Test-Path `$installDir) { Remove-Item `$installDir -Recurse -Force }

Write-Host "Zlock has been successfully uninstalled." -ForegroundColor Green
Pause
"@
Set-Content -Path $uninstallScript -Value $uninstallContent -Force

# 7. Write Uninstall Registry Entry (registers Zlock in Add/Remove Programs)
Write-Host "Registering Zlock in Add/Remove Programs..." -ForegroundColor Gray
$regPath = "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Zlock"
if (-not (Test-Path $regPath)) {
    New-Item -Path $regPath -Force | Out-Null
}
New-ItemProperty -Path $regPath -Name "DisplayName" -Value "Zlock" -PropertyType String -Force | Out-Null
New-ItemProperty -Path $regPath -Name "DisplayIcon" -Value $exePath -PropertyType String -Force | Out-Null
New-ItemProperty -Path $regPath -Name "Publisher" -Value "Zlock Developer" -PropertyType String -Force | Out-Null
New-ItemProperty -Path $regPath -Name "DisplayVersion" -Value "1.0.0" -PropertyType String -Force | Out-Null
New-ItemProperty -Path $regPath -Name "UninstallString" -Value "powershell.exe -ExecutionPolicy Bypass -File `"$uninstallScript`"" -PropertyType String -Force | Out-Null

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "       INSTALLATION COMPLETED!            " -ForegroundColor Green -Bold
Write-Host "==========================================" -ForegroundColor Green
Write-Host "Zlock has been installed to: $installDir" -ForegroundColor Gray
Write-Host "Start Menu shortcut and startup task are configured." -ForegroundColor Gray
Write-Host "Press any key to close this installer..."
Pause
