; Inno Setup Script for Zlock
; Compiles a professional Setup installer exe with custom Zlock icon and startup run task.

[Setup]
AppId={{C626F74D-B1DF-4196-857A-7DCD84D63AB2}
AppName=Zlock
AppVersion=1.0.0
AppPublisher=Zlock
DefaultDirName={autopf}\Zlock
DefaultGroupName=Zlock
DisableProgramGroupPage=yes
OutputDir=.
OutputBaseFilename=ZlockSetup
SetupIconFile=ui\logo.ico
Compression=lzma
SolidCompression=yes
WizardStyle=modern

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "startup"; Description: "Run Zlock automatically when Windows starts"; GroupDescription: "Startup Options:"

[Files]
Source: "zlock.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "ui\logo.ico"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\Zlock"; Filename: "{app}\zlock.exe"; IconFilename: "{app}\logo.ico"
Name: "{autodesktop}\Zlock"; Filename: "{app}\zlock.exe"; IconFilename: "{app}\logo.ico"; Tasks: desktopicon

[Registry]
; Configure startup launch in Registry if startup task checkbox is selected
Root: HKCU; Subkey: "Software\Microsoft\Windows\CurrentVersion\Run"; ValueType: string; ValueName: "Zlock"; ValueData: """{app}\zlock.exe"""; Flags: uninsdeletevalue; Tasks: startup

[Run]
Filename: "{app}\zlock.exe"; Description: "{cm:LaunchProgram,Zlock}"; Flags: nowait postinstall skipifsilent
