#!/bin/bash

OPENING_MESSAGE="Generating Bookmarks"

echo "Pulling Changes"
git pull
echo "Generate Static Files"
node static_html_gen.js
echo "Pushing Changes"
git add -A
git commit -a -m "new bookmark added"
git push