#!/usr/bin/env bash

#
# SPDX-License-Identifier: Apache-2.0
#
# The OpenSearch Contributors require contributions made to
# this file be licensed under the Apache-2.0 license or a
# compatible open source license.
#
# Modifications Copyright OpenSearch Contributors. See
# GitHub history for details.
#

rm -rf ./node_modules ./lib ./dist
yarn

git checkout .

npm version $1

npm install -g react-docgen
react-docgen ./src/*.jsx | ./scripts/buildDocs.sh

git add .

git commit -m "Publish new API docs (automated commit)"

git push

git push --tags

npm publish

./docs-site/publish.sh
