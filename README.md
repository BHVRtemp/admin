


language: objective-c
os: osx
osx_image: xcode8.1

cache:
  directories:
    - $(npm config get prefix)/bin/grunt-cli
    - $(npm config get prefix)/bin/ionic
    - $(npm config get prefix)/bin/cordova
    - node_modules
  yarn: true

before_install:
  - export LANG=en_US.UTF-8
  - brew update
  - npm install -g n
  - sudo n 6.9.1
  - npm install npm@3.10.8 -g

install:
  - npm install -g ionic cordova yarn
  - yarn

  # Android SDK
  - brew install android-sdk
  - brew install caskroom/cask/brew-cask
  - brew cask install google-chrome

  -  wget http://dl.google.com/android/android-sdk_r24.4-macosx.zip
  -  tar -xvf android-sdk_r24.4-macosx.zip

  -  echo y |android update sdk --no-ui --all --filter platform-tools
  -  echo y |android update sdk --no-ui --all --filter build-tools-23.0.2
  -  echo y |android update sdk --no-ui --all --filter android-23
  -  echo y |android update sdk --no-ui --all --filter extra-android-support
  -  echo y |android update sdk --no-ui --all --filter extra-android-m2repository
  -  echo y |android update sdk --no-ui --all --filter extra-google-m2repository

  -  export ANDROID_HOME=/usr/local/opt/android-sdk
  -  export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$ANDROID_HOME/build-tools/23.0.2

before_script:
  - npm run lint
  - npm run lintcss
  - npm test

  - "ls /usr/X11/bin"
  - "export DISPLAY=:99.0"
  - node_modules/protractor/bin/webdriver-manager update --standalone --firefox
  - node_modules/protractor/bin/webdriver-manager start 2>&1 &
  - sleep 3
  - npm run build
  - npm run e2e

script:

  # Build
  - ionic state restore
  - ionic platform add android
  - ionic build android --debug
  - ionic platform add ios
  - ionic build ios --device --debug
