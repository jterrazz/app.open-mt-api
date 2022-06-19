#!/bin/bash

source ./scripts/common/docker-setup.sh

docker compose -f scripts/compose/docker-compose.yml up -d open-market-database open-market-api--migrate-database
