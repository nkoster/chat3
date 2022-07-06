#!/bin/bash
cd server
nodemon server.js &
cd ..
npm start &
