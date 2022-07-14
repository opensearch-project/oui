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

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

npm run build

mkdir -p tmp

if [ ! -d "tmp/gh-pages" ]; then
  git clone git@github.com:Hacker0x01/react-datepicker.git --branch gh-pages --single-branch tmp/gh-pages
fi

cd tmp/gh-pages

git pull

find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -r {} \;

cp -r $DIR/{bundle.js,index.html,style.css,images,CNAME} ./

git add --all

git commit -m "Publish new docs (automated commit)"

git push
