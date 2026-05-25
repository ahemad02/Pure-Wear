#!/bin/sh
set -e

if [ -z "$APP_KEY" ]; then
  echo "ERROR: APP_KEY is not set."
  exit 1
fi

php artisan config:cache
php artisan route:cache
php artisan view:cache

# Retry migration up to 5 times (DB might take a moment to be reachable)
for i in $(seq 1 5); do
  php artisan migrate --force && break
  echo "DB not ready, retrying in 5s... ($i/5)"
  sleep 5
done

php-fpm -D
nginx -g 'daemon off;'