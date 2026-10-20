# Daily automatic article (run by Windows Task Scheduler, "OhmSavvy daily article").
# Drafts the next queued buying guide with Ollama and publishes it only if every QA
# checkpoint passes (article.mjs --next --auto). Log: automation/ollama/.tmp-daily.log
$ErrorActionPreference = "Continue"
$repo = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $repo
$logFile = Join-Path $PSScriptRoot ".tmp-daily.log"
"`n===== $(Get-Date -Format 'yyyy-MM-dd HH:mm') =====" | Out-File $logFile -Append -Encoding utf8

# Start Ollama if it isn't already serving.
try { Invoke-RestMethod http://localhost:11434/api/tags -TimeoutSec 5 | Out-Null }
catch {
  Start-Process "$env:LOCALAPPDATA\Programs\Ollama\ollama.exe" -ArgumentList "serve" -WindowStyle Hidden
  Start-Sleep -Seconds 20
}

& node automation/ollama/article.mjs --next --auto *>&1 | Out-File $logFile -Append -Encoding utf8
"exit code: $LASTEXITCODE" | Out-File $logFile -Append -Encoding utf8
