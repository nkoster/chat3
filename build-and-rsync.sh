#!/bin/sh
npm run build
rsync -a build/ server/public
rsync -a server/ palermo:apps/chat/
