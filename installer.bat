@echo off

:: Fetch the file from https://github.com/XaverianTeamRobotics/FtcRemoteDebugger/releases/latest/download/ftcremotedebugger-windows.zip using powershell
:: and unzip it to the current directory
powershell -Command "(New-Object Net.WebClient).DownloadFile('https://github.com/XaverianTeamRobotics/FtcRemoteDebugger/releases/latest/download/ftcremotedebugger-windows.zip', 'ftcremotedebugger-windows.zip')"
powershell -Command "Expand-Archive -Path ftcremotedebugger-windows.zip -DestinationPath ftcremotedebugger-windows"

:: Run all executables in ftcremotedebugger-windows
for /r ftcremotedebugger-windows %%i in (*.exe) do start "" "%%i"