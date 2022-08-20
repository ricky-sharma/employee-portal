cd "ClientApp"

call npm run build

SETLOCAL ENABLEDELAYEDEXPANSION
SET "sourcedir=build\static\media"
for /f "delims=" %%a in (
  'dir /a-d /b "%sourcedir%\*" ^| findstr /v /r /c:"blue-person-icon*.*$"'
) do del "%sourcedir%\%%a"
echo %cd%
cd /D  %~dp0
echo %cd%
if exist "static" rd /q /s "static"
xcopy "ClientApp\build\*"  /c /i /e /h /y

exit