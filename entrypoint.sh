#!/bin/bash

if [ $1 = "serve" ]; then
    ionic serve --nolivereload --port 3000 --liveReloadPort 8005
fi

if [ $1 = "prod-browser" ]; then
    npm run ionic:build --prod
fi
if [ $1 = "test" ]; then
    npm test
fi

if [ $1 = "send-coverage" ]; then
    cat ./coverage/lcov.info | ./node_modules/.bin/codacy-coverage
fi

if [ $1 = "testwatch" ]; then
    npm run testwatch
fi

if [ $1 = "bash" ]; then
    bash
fi

