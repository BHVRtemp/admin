#!/bin/bash

if [ $1 = "serve" ]; then
    cp src/env/dev.ts src/env/main.ts
    ionic serve --nolivereload --port 3000 --liveReloadPort 8005
fi

if [ $1 = "prod-browser" ]; then
    cp src/env/prod.ts src/env/main.ts
    npm run ionic:build #--prod
fi
if [ $1 = "test" ]; then
    cp src/env/dev.ts src/env/main.ts
    npm test
fi
if [ $1 = "lint" ]; then
    npm run lint
fi

if [ $1 = "send-coverage" ]; then
    cp src/env/dev.ts src/env/main.ts
    cat ./coverage/lcov.info | ./node_modules/.bin/codacy-coverage  -p . --language typescript
fi

if [ $1 = "testwatch" ]; then
    cp src/env/dev.ts src/env/main.ts
    npm run testwatch
fi

if [ $1 = "bash" ]; then
    bash
fi

