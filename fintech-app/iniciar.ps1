# Inicia o Verdex e abre no navegador
Set-Location $PSScriptRoot

if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    npm install
}

Write-Host ""
Write-Host "  Verdex - Banco Digital" -ForegroundColor Green
Write-Host "  Abrindo http://localhost:5174" -ForegroundColor Green
Write-Host ""
Write-Host "  NAO abra o index.html direto!" -ForegroundColor Red
Write-Host "  Use sempre este script ou: npm run dev" -ForegroundColor Yellow
Write-Host ""

Start-Process "http://localhost:5174"
npm run dev
