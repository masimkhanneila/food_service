# Foodie — Food Ordering Platform


## Technologies :

1. fastapi
2. sqlite & sqlalchemy
3. jwt
4. uvicorn
5. docker
6. 
## Project Goal :

#### To build a RESTful backend for a food-ordering platform.
#### Making it easier for customers to discover restaurants, browse menus, and place orders.

## Models : 

### User | Restaurant | MenuItem | Order | OrderItem | Review

## Properties of Models:

#### User
- user_id
- username
- email
- role (customer / admin)
- hashed_password

#### Restaurant
- restaurant_id
- admin_id (restaurant owner)
- name
- description
- address
- email

#### MenuItem
- item_id
- restaurant_id
- name
- description
- price
- category

#### Order
- order_id
- user_id
- restaurant_id
- status
- total_price
- created_at

#### OrderItem
- order_item_id
- order_id
- menu_item_id
- quantity
- unit_price

#### Review
- review_id
- restaurant_id
- user_id
- rating
- comment
- created_at

## Behavior of models :

#### User can
* register an account
* log in to an account
* browse and search restaurants and menus
* place an order
* view order history
* track order status
* give ratings and feedback after completing an order

#### Restaurant owner can
* create, update, and delete their restaurants
* add menu items
* update menu items and prices
* delete menu items
* view incoming orders
* accept and prepare orders
* update order status
* view restaurant ratings and feedback

#### MenuItem
* create menuitem
* change menuitem
* delete menuitem


## API Endpoints

### Authentication
* POST /auth/register/user
* POST /auth/register/admin
* POST /auth/login
* GET /auth/me
* GET /auth/admin_test

### Restaurant
* GET /restaurants
* POST /restaurants
* GET /restaurants/{restaurant_id}
* PATCH /restaurants/{restaurant_id}
* DELETE /restaurants/{restaurant_id}
* GET /restaurants/{restaurant_id}/rating
* GET /restaurants/{restaurant_id}/reviews

### MenuItem
* GET /restaurants/{restaurant_id}/menu-items
* POST /restaurants/{restaurant_id}/menu-items
* GET /restaurants/menu-items/{menu_item_id}
* PATCH /restaurants/{restaurant_id}/menu-items/{menu_item_id}
* DELETE /restaurants/{restaurant_id}/menu-items/{menu_item_id}

### Order
* POST /orders
* GET /orders/me
* GET /orders/{order_id}
* GET /restaurants/{restaurant_id}/orders
* PATCH /orders/{order_id}/status

### Review
* POST /reviews
* GET /restaurants/{restaurant_id}/reviews
* GET /restaurants/{restaurant_id}/rating

## DATABASE

### Table: users

| Column | Data Type | Constraints |
|---|---|---|
| user_id | Integer | PRIMARY KEY |
| username | String(50) | UNIQUE, NOT NULL |
| email | String(50) | UNIQUE, NOT NULL |
| role | String(20) | NOT NULL, DEFAULT 'customer' |
| hashed_password | String(255) | NOT NULL |

### Table: restaurant

| Column | Data Type | Constraints |
|---|---|---|
| restaurant_id | Integer | PRIMARY KEY |
| admin_id | Integer | FOREIGN KEY, NOT NULL |
| name | String(100) | NOT NULL |
| description | Text | NULL allowed |
| address | String(255) | NOT NULL |
| email | String(50) | NOT NULL |

**Foreign Key:** admin_id → users.user_id

### Table: menu_item

| Column | Data Type | Constraints |
|---|---|---|
| item_id | Integer | PRIMARY KEY |
| restaurant_id | Integer | FOREIGN KEY, NOT NULL |
| name | String(100) | NOT NULL |
| description | Text | NULL allowed |
| price | Numeric(10,2) | NOT NULL |
| category | String(100) | NOT NULL |

**Foreign Key:** restaurant_id → restaurant.restaurant_id

### Table: order

| Column | Data Type | Constraints |
|---|---|---|
| order_id | Integer | PRIMARY KEY |
| user_id | Integer | FOREIGN KEY, NOT NULL |
| restaurant_id | Integer | FOREIGN KEY, NOT NULL |
| status | String(20) | NOT NULL, DEFAULT 'pending' |
| total_price | Numeric(10,2) | NOT NULL, CHECK >= 0 |
| created_at | DateTime | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

**Foreign Keys:**
- user_id → users.user_id
- restaurant_id → restaurant.restaurant_id

### Table: order_item

| Column | Data Type | Constraints |
|---|---|---|
| order_item_id | Integer | PRIMARY KEY |
| order_id | Integer | FOREIGN KEY, NOT NULL |
| menu_item_id | Integer | FOREIGN KEY, NOT NULL |
| quantity | Integer | NOT NULL, CHECK > 0 |
| unit_price | Numeric(10,2) | NOT NULL, CHECK > 0 |

**Foreign Keys:**
- order_id → order.order_id
- menu_item_id → menu_item.item_id

### Table: review

| Column | Data Type | Constraints |
|---|---|---|
| review_id | Integer | PRIMARY KEY |
| restaurant_id | Integer | FOREIGN KEY, NOT NULL |
| user_id | Integer | FOREIGN KEY, NOT NULL |
| rating | Integer | NOT NULL, CHECK BETWEEN 1 AND 5 |
| comment | Text | NULL allowed |
| created_at | DateTime | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

**Foreign Keys:**
- restaurant_id → restaurant.restaurant_id
- user_id → users.user_id


