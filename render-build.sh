#!/usr/bin/env bash
set -o errexit

# Install dependencies
npm install

# Ensure Puppeteer cache directory exists
PUPPETEER_CACHE_DIR=./.cache/puppeteer
mkdir -p $PUPPETEER_CACHE_DIR

# Install Chrome browser explicitly
npx puppeteer browsers install chrome
