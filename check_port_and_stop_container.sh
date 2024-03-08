#!/usr/bin/env bash

for id in $(docker ps -q)
do
    if [[ $(docker port "${id}") == *"3000"* ]]; then
        echo "stopping container ${id}"
        docker stop "${id}"
    fi
done
