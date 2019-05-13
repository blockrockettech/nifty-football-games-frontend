#!/usr/bin/env bash

npm run build;

echo "Deploying Nifty Football Games"
firebase use futbol-cards;

firebase target:apply hosting niftyfootball-games niftyfootball-games;

firebase deploy --only hosting:niftyfootball-games;
