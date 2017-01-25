#!/bin/bash

if [ $1 = "serve" ]; then
    cp src/env/dev.ts src/env/main.ts
    ionic serve --nolivereload --port 3000 --liveReloadPort 8005
fi

if [ $1 = "prod-browser" ]; then
    cp src/env/prod.ts src/env/main.ts
    npm run ionic:build --prod
fi
if [ $1 = "test" ]; then
    npm test
fi
if [ $1 = "lint" ]; then
    npm run lint
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

