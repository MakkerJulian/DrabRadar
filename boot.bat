@echo off
if [%1]==[] goto :quick

echo "Full boot"
start cmd /c "cd .\Frontend\Drabfrontend\ && npm i && npm run start"
start cmd /c "cd .\Backend\drab-backend\ && npm i && npm run docker:reset && npm run start:dev"
goto :end

:quick
echo "Quick boot"
start cmd /c "cd .\Frontend\Drabfrontend\ && npm run start"
start cmd /c "cd .\Backend\drab-backend\ && npm run start:dev"
:end
