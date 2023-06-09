#!/bin/bash

function build {
  echo "Rebuilding TypeScript."
  tsc src/*.ts --outFile build/main.js
}

build

if [ "$1" = "watch" ]; then
  inotifywait -qr -m src/*.ts -e modify |
    while read directory action file; do
      build
    done
fi
