@echo off
echo ===============================
echo Push LMS Project to GitHub
echo ===============================
echo.
echo Before running this script:
echo 1. Create a new repository on GitHub
echo 2. Copy the repository URL (e.g., https://github.com/username/repo-name.git)
echo.
pause

echo.
set /p REPO_URL="Enter your GitHub repository URL: "

echo.
echo Initializing Git repository...
git init

echo.
echo Adding all files...
git add .

echo.
echo Creating first commit...
git commit -m "Initial commit: LMS microservices project"

echo.
echo Adding remote origin...
git remote add origin %REPO_URL%

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ===============================
echo Done! Your project is now on GitHub
echo ===============================
pause
