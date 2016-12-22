FROM node:6.9.1

# NPM global deps
RUN npm i -g ionic@latest cordova

# Android
RUN echo "deb http://ftp.de.debian.org/debian jessie-backports main" >> /etc/apt/sources.list && apt-get update
RUN apt-get install lib32gcc1 libc6-i386 lib32z1 lib32stdc++6 openjdk-8-jdk-headless -y
RUN cd /opt && curl https://dl.google.com/android/android-sdk_r24.4.1-linux.tgz -o android-sdk.tgz && tar xzf android-sdk.tgz && rm android-sdk.tgz
RUN dpkg --purge --force-depends ca-certificates-java && apt-get install ca-certificates-java -y

ENV ANDROID_HOME /opt/android-sdk-linux
ENV PATH ${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools

RUN echo 'y' | android update sdk -u -a -t platform-tools,build-tools-23.0.2,android-24,extra-android-support,extra-android-m2repository,extra-google-m2repository




# Project files
ADD hooks /app/hooks
ADD config.xml /app/config.xml
ADD resources /app/resources

WORKDIR /app

RUN cordova telemetry off
RUN mkdir www
RUN cordova prepare


# NPM deps
ADD package.json /app/package.json
RUN cd /app && npm install


# Project files
ADD config /app/config
ADD ionic.config.json /app/ionic.config.json
ADD tsconfig.json /app/tsconfig.json
ADD tslint.json /app/tslint.json
ADD karma.conf.js /app/karma.conf.js


ADD entrypoint.sh /app/entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

