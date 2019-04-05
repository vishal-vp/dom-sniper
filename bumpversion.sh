#!/bin/bash
new_version=$1
old_version=$(cat version)

if [ ! $new_version ]; then
    echo "Usage: bumpversion.sh [version]"
    exit 1
fi

sed -ri "s/([0-9]\.?)+(-rc[0-9])?/$new_version/g" version

sed -ri "s/\"version\": \"([0-9]\.?)+(-rc[0-9])?\"/\"version\": \"$new_version\"/g" manifest.json

echo "Files modified successfully. Version changed from $old_version to $new_version."
