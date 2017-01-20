#!/bin/bash

# if [ $1 = "package-android" ]; then
#     npm run ionic:build
#     ionic package build android --profile cogecotemp
# fi
if [ $1 = "package-ios" ]; then
    npm run ionic:build
    ionic package build ios --profile cogecotemp
fi

if [ $1 = "serve" ]; then
    service nginx reload
    service nginx restart
    ionic serve --nolivereload --port 3000 --liveReloadPort 8005
fi

if [ $1 = "android" ]; then
    sed -i -e 's/configJson\.widget\.content\[0\]\.\$\.src = options\.devServer/configJson.widget.content[0].$.src = "http:\/\/'$2':3000"/g' $(npm root -g)/ionic/node_modules/ionic-app-lib/lib/config-xml.js
    ionic run android -lcs --port 3000 --liveReloadPort 3000 #--prod
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

if [ $1 = "package-android" ]; then
    ionic build android --prod --release

    #https://ionicframework.com/docs/guide/publishing.html
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore build/test.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk integration
    /opt/android-sdk-linux/build-tools/23.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/cogeco.apk
    cp platforms/android/build/outputs/apk/cogeco.apk build
    #package build android --profile cogetemp
fi

