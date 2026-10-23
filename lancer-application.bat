@echo off
title GéoHiérarchie Pro - Serveur Local Next.js
echo ==============================================================================
echo   Lancement de GéoHiérarchie Pro (Next.js - Mode Local Autonome)
echo   URL locale : http://localhost:3000
echo ==============================================================================
cd /d "%~dp0"
call npm.cmd run dev
pause
