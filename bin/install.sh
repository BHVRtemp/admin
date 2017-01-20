#!/bin/bash

# NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
nvm install 6.9.1
nvm alias default 6.9.1
nvm use 6.9.1

npm install -g ionic cordova yarn ios-deploy
npm i

# pip install six