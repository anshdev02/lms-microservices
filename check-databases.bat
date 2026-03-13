@echo off
echo Checking for LMS databases...
echo.

REM Try common MySQL installation paths
set MYSQL_PATH=""

if exist "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" (
    set MYSQL_PATH="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
)
if exist "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" (
    set MYSQL_PATH="C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe"
)
if exist "C:\xampp\mysql\bin\mysql.exe" (
    set MYSQL_PATH="C:\xampp\mysql\bin\mysql.exe"
)

if %MYSQL_PATH%=="" (
    echo MySQL not found in common locations.
    echo Please run this command manually in MySQL:
    echo SHOW DATABASES LIKE 'lms_%%';
    pause
    exit /b
)

echo Using MySQL at: %MYSQL_PATH%
echo.

%MYSQL_PATH% -u root -pRoot123$ -e "SHOW DATABASES LIKE 'lms_%%';"

echo.
pause
