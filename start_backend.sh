#!/bin/bash

echo "Iniciando o start do PM2 - Backend"
cd /usr/share/ostecnico/backend/
mv .env.production .env
pm2 start ecosystem.config.js --env prod
echo "BackEnd iniciado..."

echo "Iniciando o start do PM2 - Backend-service"
cd /usr/share/ostecnico/backend-service/
mv .env.production .env
pm2 start ecosystem.config.js --env prod
echo "BackEnd-Service iniciado..."