@echo off
echo Killing existing Python processes...
taskkill /F /IM python.exe 2>nul

echo Waiting 2 seconds...
timeout /t 2 /nobreak >nul

echo Starting backend server...
cd ai-saas-production\backend
python simple_main.py
