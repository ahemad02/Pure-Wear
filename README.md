# 👕 Pure Wear - Full Stack Ecommerce Platform

Pure Wear is a modern full-stack ecommerce web application built using React for the frontend and Laravel for the backend. The platform allows users to browse products, manage carts, place orders, and securely shop online through a responsive and user-friendly interface.

The project includes a powerful admin panel for managing products, categories, orders, customers, and overall store operations.

---

# 🚀 Features

## 👤 User Features

- User authentication & authorization
- Browse products by categories
- Product detail pages
- Add to cart functionality
- Wishlist management
- Checkout system
- Order placement
- Responsive design
- Search & filter products
- User profile management
- Order history tracking

---

## 🛠️ Admin Features

- Admin dashboard
- Product management
- Category management
- Order management
- Customer management
- Inventory handling
- Image uploads
- Sales monitoring

---

# 🧰 Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Laravel 12
- REST API
- Laravel Sanctum / JWT Authentication

## Database
- MySQL

## Storage
- Laravel Storage System

---

# 📂 Project Structure

```bash
project-root/
│
├── frontend/        # React Frontend
├── backend/         # Laravel Backend
│
└── README.md
```

---

# ⚙️ Environment Variables

change api url in frontend/components/common/http.jsx to backend running url

---

## Backend `.env`

Create a `.env` file inside the `backend` folder and configure:

```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file
# APP_MAINTENANCE_STORE=database

PHP_CLI_SERVER_WORKERS=4

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=sqlite
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD=

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database
# CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_SCHEME=null
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"

STRIPE_KEY=
STRIPE_SECRET=

```

---

# 🔧 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/ahemad02/Pure-Wear.git
```

---

## 2️⃣ Move Into Project Folder

```bash
cd pure-wear
```

---

# ▶️ Backend Setup (Laravel)

## Go to backend folder

```bash
cd backend
```

## Install PHP dependencies

```bash
composer install
```

## Install node modules

```bash
npm install
```

## Create `.env` file

```bash
cp .env.example .env
```

## Generate application key

```bash
php artisan key:generate
```

## Run migrations

```bash
php artisan migrate
```

## Create storage symlink

```bash
php artisan storage:link
```

## Start Laravel server

```bash
php artisan serve
```

Backend will run on:

```bash
http://127.0.0.1:8000
```

---

# ▶️ Frontend Setup (React)

## Open new terminal

## Go to frontend folder

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# 🛒 Ecommerce Functionalities

- Product browsing
- Product filtering
- Cart management
- Checkout process
- Order placement
- User authentication
- Admin inventory management

---

# 📦 Product Management

Admins can:
- Add products
- Edit products
- Delete products
- Upload product images
- Manage stock levels
- Organize products by categories

---

# 🛡️ Authentication

Authentication system includes:
- User registration
- Login/logout
- Protected routes
- Secure API authentication

---

# 📱 Responsive Design

The platform is fully responsive and optimized for:
- Desktop
- Tablet
- Mobile Devices

# 🤝 Contributing

Contributions are welcome.

## Steps to Contribute

1. Fork the repository

2. Create feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push branch

```bash
git push origin feature-name
```

5. Create Pull Request

---

# 📄 License

This project is created for learning and portfolio purposes.

---

# ⭐ Support

If you liked this project:
- Star the repository
- Fork the project
- Share feedback
