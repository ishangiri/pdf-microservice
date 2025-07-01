#!/usr/bin/env bash
set -o errexit

# Install dependencies
npm install

# Ensure Puppeteer cache directory exists
PUPPETEER_CACHE_DIR=/opt/render/.cache/puppeteer
mkdir -p $PUPPETEER_CACHE_DIR

# Explicitly install Chromium for Puppeteer
npx puppeteer install
