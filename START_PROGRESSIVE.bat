@echo off
echo ========================================
echo   PROGRESSIVE BACKEND STARTER
echo ========================================
echo.
echo Killing existing Python processes...
taskkill /F /IM python.exe 2>nul

echo.
echo Waiting 2 seconds...
timeout /t 2 >nul

echo.
echo ========================================
echo   PROGRESSIVE MODE CONFIGURATION
echo ========================================
echo.
echo Current settings from .env.progressive:
cd ai-saas-production\backend
type .env.progressive | findstr /B "ENABLE_"
cd ..\..
echo.
echo ========================================
echo.
echo Starting progressive backend...
echo.
cd ai-saas-production\backend
python progressive_main.py

pause
