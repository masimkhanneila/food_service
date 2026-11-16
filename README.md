
# 🍔 Foodie — Food Ordering Platform

Foodie is a full-stack food ordering web application built with FastAPI, SQLite, and JavaScript.

Customers can explore restaurants, browse menus, add dishes to their basket, place orders, and leave reviews. Restaurant owners can manage their restaurants, menus, and incoming orders.

## 🌐 Live Demo

https://food-service-8mz7.onrender.com/

## ✨ Features

### Customers
- Register and log in
- Browse and search restaurants and dishes
- View restaurant menus and prices
- Add food to a basket
- Place orders
- Track order status
- View order history
- Rate and review restaurants after completing an order

### Restaurant Owners
- Register as a restaurant owner
- Create and manage restaurants
- Add and update menu items
- Manage incoming orders
- Update order statuses
- View customer ratings and reviews

## 🛠 Tech Stack

**Backend:** Python, FastAPI, Pydantic, SQLAlchemy

**Database:** SQLite

**Authentication:** JWT, Argon2 password hashing

**Frontend:** HTML, CSS, JavaScript

**Deployment:** Docker, Docker Compose, Render

## 📁 Project Structure

```text
food_service/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── main.py
├── auth.py
├── database.py
├── restaurant.py
├── menu.py
├── order.py
├── review.py
├── requirements.txt
├── Dockerfile
├── compose.yaml
├── .env.example
└── design_doc.md
```

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/masimkhanneila/food_service.git
cd food_service
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

Activate it on Windows:

```powershell
.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Copy `.env.example` to `.env`.

Set `SECRET_KEY` to a secure random value and keep `ALGORITHM=HS256`.

Never commit your actual `.env` file.

### 5. Start the server

```bash
uvicorn main:app --reload
```

Open the application at:

http://localhost:8000

Swagger API documentation:

http://localhost:8000/docs

## 🐳 Run with Docker Compose

Create and configure `.env` before starting the containers.

```bash
docker compose up --build -d
```

Open http://localhost:8000

Stop the containers:

```bash
docker compose down
```

Docker Compose stores SQLite data in a named volume for local use.

## 📡 Main API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register/user` | Register a customer |
| POST | `/auth/register/admin` | Register a restaurant owner |
| POST | `/auth/login` | Log in |
| GET | `/auth/me` | Get authenticated user |
| GET | `/restaurants` | List restaurants |
| POST | `/restaurants` | Create restaurant |
| GET | `/restaurants/{id}/menu-items` | Get restaurant menu |
| POST | `/restaurants/{id}/menu-items` | Add menu item |
| POST | `/orders` | Place order |
| GET | `/orders/me` | View customer orders |
| PATCH | `/orders/{id}/status` | Update order status |
| POST | `/reviews` | Submit review |
| GET | `/restaurants/{id}/reviews` | View restaurant reviews |

Some endpoints require JWT authentication and restaurant-owner permissions.

## 🔐 Security

- Passwords are hashed using Argon2.
- Authentication uses JWT bearer tokens.
- Restaurant management requires owner authorization.
- Order status updates are restricted to the restaurant owner.
- Reviews require a completed order.

## 🗄 Database

Foodie uses SQLite with SQLAlchemy Core.

Main tables:
- `users`
- `restaurant`
- `menu_item`
- `order`
- `order_item`
- `review`

The demonstration dataset contains 10 restaurants and 60 menu items.

The Render Free deployment uses ephemeral storage. New data may be lost after a restart or redeployment, so the hosted version is intended for demonstration rather than production use.

## 🎓 Project Purpose

This project demonstrates REST API development, database relationships, authentication, authorization, validation, frontend/backend integration, and containerized deployment.

Built as a learning project.
