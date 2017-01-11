#!/bin/bash

./bin/build-dev.sh

if [ $1 = "android" ]; then
    docker run --rm --mac-address=12:34:56:78:9a:bc -ti -p 3000:3000 -p 8005:8005 -p 53703:53703 -v $(pwd)/src:/app/src -v $(pwd)/../common-frontend/src:/app/modules/common-frontend --privileged -v /dev/bus/usb:/dev/bus/usb theomathieu/admin-dev $1 $(ifconfig | grep '172.16' | tail -1 | cut -d ':' -f 2 | cut -d ' ' -f 1)
    exit 1
fi

if [ $1 = "test"  ] || [ $1 = "testwatch" ] || [ $1 = "prod-browser" ] || [ $1 = "bash" ]; then
    docker run --rm -ti -v $(pwd)/coverage:/app/coverage -v $(pwd)/src:/app/src -v $(pwd)/../common-frontend/src:/app/modules/common-frontend -v $(pwd)/www:/app/www theomathieu/admin-dev $1 $2
    exit 1
fi

if [ $1 = "package-android"  ]; then
    docker run --rm -ti -v $(pwd)/src:/app/src -v $(pwd)/../common-frontend/src:/app/modules/common-frontend -v $(pwd)/build:/app/build theomathieu/admin-dev package-android
    exit 1
fi

docker run --rm -ti --name=frontend --link cogego_backend:backend --net backend_default -p 8080:8080 -p 8005:8005 -p 53703:53703 -v $(pwd)/../common-frontend/src:/app/modules/common-frontend -v $(pwd)/src:/app/src -v $(pwd)/www:/app/www theomathieu/admin-dev $1