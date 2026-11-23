@Echo off
rem ------------------------------------------------
rem Maven Wrapper for Windows
rem ------------------------------------------------
setlocal
set "WRAPPER_JAR=%~dp0\.mvn\wrapper\maven-wrapper.jar"
if not exist "%WRAPPER_JAR%" (
  echo Downloading Maven Wrapper JAR...
  mkdir "%~dp0\.mvn\wrapper" >nul 2>&1
  powershell -Command "Invoke-WebRequest -Uri https://repo.maven.apache.org/maven2/.mvn/wrapper/maven-wrapper/3.9.9/maven-wrapper-3.9.9.jar -OutFile '%WRAPPER_JAR%'"
)
java -jar "%WRAPPER_JAR%" %*
endlocal
