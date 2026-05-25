#!/bin/sh
set -e

# Validate APP_KEY is set
if [ -z "$APP_KEY" ]; then
  echo "ERROR: APP_KEY is not set. Generate one with: php artisan key:generate --show"
  exit 1
fi

# Run Laravel startup tasks (DB is available at runtime, not build time)
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force

# Start PHP-FPM in background, then nginx in foreground
php-fpm -D
nginx -g 'daemon off;'