# Money Tapper auto-upload script
# Run this manually or through Windows Task Scheduler.

Set-Location $PSScriptRoot

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

git add .

# Stop here if nothing changed.
git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "No changes to upload."
    exit 0
}

git commit -m "Auto update $timestamp"
git push origin main
