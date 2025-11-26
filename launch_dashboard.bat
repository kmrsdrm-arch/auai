@echo off
setlocal EnableDelayedExpansion

REM Root anchor for relative paths
set ROOT=%~dp0
for %%I in ("%ROOT:~0,-1%") do set ROOT=%%~fI

echo.
echo ======================================================
echo   Next-Gen Automotive BI Launcher
echo   This script boots the FastAPI simulator and Next.js
echo ======================================================
echo.

REM ---- FastAPI simulator bootstrap ----
set "SIM_PATH=%ROOT%\services\data_simulator"
if not exist "%SIM_PATH%" (
    echo [ERROR] FastAPI simulator not found at %SIM_PATH%
    exit /b 1
)

set "SIM_PY_CMD="
set "SIM_PY_VER="
for %%V in (3.11 3.12 3.10) do (
    py -%%V --version >nul 2>&1
    if not errorlevel 1 (
        set "SIM_PY_CMD=py -%%V"
        set "SIM_PY_VER=%%V"
        goto :after_python_probe
    )
)
set "SIM_PY_CMD=py -3"
:after_python_probe
echo [info] Using Python launcher: !SIM_PY_CMD!

REM Skip version check to avoid quoting issues - venv will work if already created

if not exist "%SIM_PATH%\.venv" (
    echo [1/5] Creating Python virtual environment...
    !SIM_PY_CMD! -m venv "%SIM_PATH%\.venv"
) else (
    echo [1/5] Python virtual environment already present.
)

set "SIM_VENV_PY=%SIM_PATH%\.venv\Scripts\python.exe"
if not exist "%SIM_VENV_PY%" (
    echo [ERROR] Virtual environment python not found at %SIM_VENV_PY%
    exit /b 1
)

echo [2/5] Installing Python dependencies...
"%SIM_VENV_PY%" -m pip install --disable-pip-version-check --quiet -r "%SIM_PATH%\requirements.txt"

echo [3/5] Launching FastAPI simulator window...
start "BI-DATA" cmd /k "cd /d %SIM_PATH% && call .venv\Scripts\activate.bat && uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

REM ---- Next.js workspace bootstrap ----
set WEB_PATH=%ROOT%\web
if not exist "%WEB_PATH%" (
    echo [ERROR] Next.js workspace missing at %WEB_PATH%
    exit /b 1
)

echo [4/5] Ensuring npm dependencies...
cd /d "%WEB_PATH%"
if not exist "node_modules" (
    npm install
)

echo [5/5] Launching Next.js dashboard window...
start "BI-DASHBOARD" cmd /k "cd /d %WEB_PATH% && npm run dev"

echo.
echo Both services are running in dedicated terminals.
echo Close those windows to stop the stack. Happy presenting!
echo.
pause


