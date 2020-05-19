#!/bin/sh

# Start the proxy
./cloud_sql_proxy -instances=$CLOUDSQL_INSTANCE=tcp:3306 -credential_file=$CLOUDSQL_CREDENTIALS &

# wait for the proxy to spin up
sleep 10

# Generate the primsa client
yarn prisma generate

#Start our server
node Server/server.js
