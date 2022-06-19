#!/bin/bash

export $(xargs <.env)

export DATABASE_URL="${VARIABLE:-postgresql://postgres:postgres@127.0.0.1:5432/open_market?pool_timeout=30&connect_timeout=30}"
