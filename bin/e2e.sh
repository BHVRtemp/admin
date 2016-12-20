#!/bin/bash

docker exec $(docker-compose ps -q frontendapp) Xvfb :10 -screen 0 1920x1080x24 2>&1 >/dev/null &
docker exec $(docker-compose ps -q frontendapp) ./node_modules/protractor/bin/protractor