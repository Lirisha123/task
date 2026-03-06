$ErrorActionPreference = "Stop"

Set-Location "$PSScriptRoot\frontend"
$env:VITE_API_BASE_URL = "http://localhost:8081"

Write-Host "Starting frontend on http://localhost:5173 ..."
npm run dev
