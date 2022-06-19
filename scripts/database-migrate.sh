#!/bin/bash

source ./scripts/common/local-setup.sh

read -p 'Migration name: ' migrationName

npx prisma migrate dev --name $migrationName
