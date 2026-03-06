$ErrorActionPreference = "Stop"

$root = $PSScriptRoot

Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-File", "`"$root\run-backend-aiven.ps1`""
Start-Sleep -Seconds 4
Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-File", "`"$root\run-frontend.ps1`""

Write-Host "Launched backend + frontend in separate terminals."
