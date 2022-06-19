#!/bin/bash

source ./scripts/common/docker-setup.sh

docker compose -f scripts/compose/docker-compose.yml up open-market-database open-market-api--dev -exit-code-from open-market-api--dev
