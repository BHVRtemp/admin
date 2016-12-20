#!/bin/bash

./bin/run.sh prod-browser
docker build -f Dockerfile.production -t theomathieu/admin-prod .