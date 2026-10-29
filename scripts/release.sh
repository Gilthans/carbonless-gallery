#!/bin/sh
# Tags the version in package.json and pushes the tag.
set -eu
version=$(node -p "require('./package.json').version")
git tag "v$version"
git push origin "v$version"
