if [ $1 = "android" ]; then
    docker run --rm --mac-address=12:34:56:78:9a:bc -ti -p 3000:3000 -p 8005:8005 -p 53703:53703 -v ~/.android/debug.keystore:/root/.android/debug.keystore -v $(pwd)/src:/app/src --privileged -v /dev/bus/usb:/dev/bus/usb cogecomedia/cms-build $1 $(ifconfig | grep '172.16' | tail -1 | cut -d ':' -f 2 | cut -d ' ' -f 2)

elif [ $1 = "ios" ]; then
    function finish {
        cp .config.xml~ config.xml
        rm .config.xml~
    }
    trap finish EXIT

    cp config.xml .config.xml~
    ionic run ios -lcs --port 3000 --liveReloadPort 3000

elif [ $1 = "test"  ] || [ $1 = "testwatch" ] || [ $1 = "prod-browser" ] || [ $1 = "bash" ] || [ $1 = "lint" ]; then
    docker run --rm -ti -v $(pwd)/coverage:/app/coverage -v $(pwd)/src:/app/src -v $(pwd)/www:/app/www cogecomedia/cms-build $1 $2

elif [ $1 = "send-coverage" ]; then
    docker run --rm -ti -v $(pwd)/coverage:/app/coverage -v $(pwd)/src:/app/src -v $(pwd)/www:/app/www -v $(pwd)/.git:/app/.git cogecomedia/cms-build $1 $2

elif [ $1 = "package-android"  ]; then
    docker run --rm -ti -v $(pwd)/src:/app/src -v $(pwd)/build:/app/build cogecomedia/cms-build package-android

else
    docker run --rm -ti --name=frontend -p 3000:3000 -p 8005:8005 -p 53703:53703 -v $(pwd)/src:/app/src -v $(pwd)/www:/app/www cogecomedia/cms-build serve
fi