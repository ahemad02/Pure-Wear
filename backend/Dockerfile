# ============================================
# Single-stage production image (nginx + PHP-FPM)
# ============================================
FROM php:8.3-fpm

# Install nginx + system deps + PHP extensions
RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx git curl unzip \
    libpq-dev libonig-dev libzip-dev zip \
    libpng-dev libjpeg-dev libfreetype6-dev libwebp-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) \
        pdo pdo_mysql mbstring zip exif gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy only the backend folder contents
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Set permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage \
    && chmod -R 755 /var/www/bootstrap/cache

# Copy nginx config
COPY docker/nginx.conf /etc/nginx/sites-available/default

# Copy and set entrypoint
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]