$ErrorActionPreference = "Stop"

Set-Location "$PSScriptRoot\backend"

$env:PORT = "8081"
$env:FRONTEND_URL = "http://localhost:5173"
$env:DB_URL = if ($env:DB_URL) { $env:DB_URL } else { "jdbc:mysql://mysql-16b817f9-glirishareddy04-ffac.h.aivencloud.com:23504/defaultdb?ssl-mode=REQUIRED&serverTimezone=UTC" }
$env:DB_USERNAME = if ($env:DB_USERNAME) { $env:DB_USERNAME } else { "avnadmin" }

if (-not $env:DB_PASSWORD) {
  $env:DB_PASSWORD = Read-Host "Enter Aiven DB password"
}

Write-Host "Starting backend on http://localhost:8081 ..."
.\mvnw.cmd spring-boot:run
