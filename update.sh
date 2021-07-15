#!/bin/bash

git checkout -- .

echo 'Iniciando a atualização.'
cd /usr/share/ostecnico/
git pull

echo 'Atualizando Backend.'
cd /usr/share/ostecnico/backend/
mv .env.production .env
cd /usr/share/ostecnico/backend-service/
mv .env.production .env

echo 'Restart do backend.'
pm2 restart all

echo 'Atualizando o FrontEnd.'
cd /usr/share/ostecnico/frontend
yarn build-no-mapper
yes | cp -R build/* /usr/share/nginx/html/
