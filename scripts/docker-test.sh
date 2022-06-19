#!/bin/bash

source ./scripts/common/docker-setup.sh

docker compose -f scripts/compose/docker-compose.yml up open-market-database open-market-api--test -exit-code-from open-market-api--test
