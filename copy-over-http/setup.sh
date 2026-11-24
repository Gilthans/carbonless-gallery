#!/usr/bin/env sh
# Sets up the review helper.
set -eu

echo "installing"
mkdir -p "$HOME/.local/share/review-helper"
cp ./helper "$HOME/.local/share/review-helper/helper"
echo "done: run review-helper --help"
