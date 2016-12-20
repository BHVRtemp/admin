#!/bin/bash

# Install homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Tester toutes les commandes une par une

brew update
brew install nvm
echo "source $(brew --prefix nvm)/nvm.sh" >> ~/.profile
source $(brew --prefix nvm)/nvm.sh
nvm install 6.9.1
nvm alias default 6.9.1
nvm use 6.9.1

npm install -g ionic cordova yarn
# git clone
# cd
# yarn

brew install android-sdk
