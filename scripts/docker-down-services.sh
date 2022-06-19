#!/bin/bash

source ./scripts/common/docker-setup.sh

docker compose -f scripts/compose/docker-compose.yml down
