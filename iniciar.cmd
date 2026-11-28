@echo off
rem Inicia o prototipo do GestProjet e abre o navegador.
cd /d "%~dp0"
if not exist node_modules call npm ci
if errorlevel 1 goto erro
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:3000"
call npm start
:erro
pause
