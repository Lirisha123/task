$ErrorActionPreference = "Stop"

Set-Location "$PSScriptRoot\backend"

$env:PORT = "8081"
$env:FRONTEND_URL = "http://localhost:5173"

Write-Host "Starting backend on http://localhost:8081 ..."
.\mvnw.cmd spring-boot:run
