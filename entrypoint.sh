#!/bin/bash

if [ $1 = "serve" ]; then
    ionic serve --nolivereload --port 3000 --liveReloadPort 8005
fi

if [ $1 = "android" ]; then
    sed -i -e 's/configJson\.widget\.content\[0\]\.\$\.src = options\.devServer/configJson.widget.content[0].$.src = "http:\/\/'$2':3000"/g' $(npm root -g)/ionic/node_modules/ionic-app-lib/lib/config-xml.js
    ionic run android -lcs --port 3000 --liveReloadPort 3000 #--prod
fi

if [ $1 = "prod-browser" ]; then
    #ionic add browser
    ionic build browser --prod
fi
if [ $1 = "test" ]; then
    npm test
fi
if [ $1 = "testwatch" ]; then
    npm run testwatch
fi

if [ $1 = "bash" ]; then
    bash
fi
