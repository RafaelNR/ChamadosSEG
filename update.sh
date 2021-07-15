#!/bin/bash

declare -r DIR_OS='/usr/share/ostecnico'
declare -r TYPE=$1


if [ $TYPE = 'frontend' ]; then
  echo 'Atualizando o FrontEnd.'
    cd "$DIR_OS"/frontend
    yarn build-no-mapper
    yes | cp -R build/* /usr/share/nginx/html/
  echo 'Finalizado.'
else
  echo 'Backup do banco dados'
  mysqldump --single-transaction -u root -pSeg@2021 ostecnicos > /tmp/ostecnicos.sql

  echo 'Iniciando a atualização.'
    cd $DIR_OS
    git checkout -- .
    git pull

  echo 'Atualizando Backend.'
    cd "$DIR_OS"/backend/
    yarn -i
    echo 'Atualização do banco de dados caso tenha.'
    yarn knex migrate:latest
    echo 'Move ENV'
    mv .env.production .env
  echo 'Finalizado.'

  echo 'Atualizando Backend-Service.'
    cd "$DIR_OS"/backend-service/
    yarn -i
    echo 'Atualização do banco de dados caso tenha.'
    yarn knex migrate:latest
    echo 'Move ENV'
    mv .env.production .env
  echo 'Finalizado.'

  echo 'Restart do backend.'
    pm2 restart all

  echo 'Atualizando o FrontEnd.'
    cd "$DIR_OS"/frontend
    yarn build-no-mapper
    yes | cp -R build/* /usr/share/nginx/html/
  echo 'Finalizado.'  
fi
