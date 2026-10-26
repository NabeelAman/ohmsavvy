# Daily automatic article (run by Windows Task Scheduler, "OhmSavvy daily article").
# The task fires at 06:00, then hourly until midnight, and at logon, so a laptop that
# was asleep at 06:00 still gets its article. This script makes those runs safe:
#   - one published article per day: after a success, later runs that day exit at once
#   - at most 3 attempts per day, so a bad day doesn't burn the CPU every hour
#   - a lock, so two triggers never run the writer side by side
# Each attempt refills the keyword queue with trending topics (automation/refill-queue.mjs),
# then drafts the next queued buying guide with Ollama and publishes it only if every
# QA checkpoint passes (article.mjs --next --auto). Log: automation/ollama/.tmp-daily.log
$ErrorActionPreference = "Continue"
$repo = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $repo
$logFile = Join-Path $PSScriptRoot ".tmp-daily.log"
$stateFile = Join-Path $PSScriptRoot ".tmp-daily-state.json"
$lockFile = Join-Path $PSScriptRoot ".tmp-daily.lock"
$today = Get-Date -Format "yyyy-MM-dd"
$maxAttempts = 3

$state = @{ date = $today; attempts = 0; published = $false }
if (Test-Path $stateFile) {
  $saved = Get-Content $stateFile -Raw | ConvertFrom-Json
  if ($saved.date -eq $today) { $state = @{ date = $today; attempts = [int]$saved.attempts; published = [bool]$saved.published } }
}
if ($state.published -or $state.attempts -ge $maxAttempts) { exit 0 }

# The lock holds the running script's PID. A run killed by sleep or shutdown leaves
# its lock behind, so only a lock whose PowerShell process is still alive counts.
if (Test-Path $lockFile) {
  $lockPid = (Get-Content $lockFile -Raw).Trim()
  $holder = Get-Process -Id $lockPid -ErrorAction SilentlyContinue
  if ($holder -and $holder.ProcessName -match "powershell|pwsh") { exit 0 }
  "`n(stale lock from PID $lockPid removed: that run was killed)" | Out-File $logFile -Append -Encoding utf8
}
Set-Content $lockFile $PID

# Keep Windows from idle-sleeping while a draft is being written: on this CPU a run can
# take hours, and sleep mid-draft killed earlier runs. Closing the lid still sleeps.
Add-Type -Namespace Win32 -Name Power -MemberDefinition '[DllImport("kernel32.dll")] public static extern uint SetThreadExecutionState(uint esFlags);'
[Win32.Power]::SetThreadExecutionState(0x80000001) | Out-Null  # ES_CONTINUOUS | ES_SYSTEM_REQUIRED

try {
  $state.attempts++
  $state | ConvertTo-Json | Set-Content $stateFile
  "`n===== $(Get-Date -Format 'yyyy-MM-dd HH:mm') (attempt $($state.attempts) of $maxAttempts today) =====" | Out-File $logFile -Append -Encoding utf8

  # Start Ollama if it isn't already serving.
  try { Invoke-RestMethod http://localhost:11434/api/tags -TimeoutSec 5 | Out-Null }
  catch {
    Start-Process "$env:LOCALAPPDATA\Programs\Ollama\ollama.exe" -ArgumentList "serve" -WindowStyle Hidden
    Start-Sleep -Seconds 20
  }

  & node automation/refill-queue.mjs *>&1 | Out-File $logFile -Append -Encoding utf8
  & node automation/ollama/article.mjs --next --auto *>&1 | Out-File $logFile -Append -Encoding utf8
  $code = $LASTEXITCODE
  "exit code: $code" | Out-File $logFile -Append -Encoding utf8
  if ($code -eq 0) { $state.published = $true; $state | ConvertTo-Json | Set-Content $stateFile }
}
finally {
  [Win32.Power]::SetThreadExecutionState(0x80000000) | Out-Null  # allow sleep again
  Remove-Item $lockFile -ErrorAction SilentlyContinue
}
