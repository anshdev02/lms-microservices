@echo off
echo ===============================
echo LMS Database Setup
echo ===============================
echo.
echo This script will create the required databases for the LMS project.
echo.
echo Required databases:
echo   - lms_auth
echo   - lms_course
echo.
echo Make sure MySQL is running on localhost:3306
echo.
pause

echo.
echo Creating databases...
mysql -u root -pRoot123$ < database-setup.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo SUCCESS! Databases created successfully.
    echo.
    echo You can now start the services in this order:
    echo   1. Eureka Server
    echo   2. Auth Service
    echo   3. Course Service
    echo   4. API Gateway
    echo   5. Frontend
) else (
    echo.
    echo ERROR! Failed to create databases.
    echo Please check:
    echo   - MySQL is running
    echo   - Username is 'root'
    echo   - Password is 'Root123$'
    echo   - You have permission to create databases
)

echo.
pause
