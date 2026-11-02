# Food Service 
## Technologies :
1. fastapi
2. sqlite & sqlalchemy
3. jwt
4. uvicorn
5. docker
## Project Goal 
#### To build a RESTful backend for a food-ordering platform.
#### Making it easier for customers to discover restaurants, browse menus, and place orders.
## Models : 
### User | Restaurant | MenuItem
## Properties of models :
#### User 
* username 
* gmail
* password
#### Restaurant 
* name 
* description
* address
* owner
#### MenuItem
* dish
* price
* ingridients
* category
## Behavior of models :
#### User can 
* register account
* login into account
* make an order 
* give a rating and feedback
* view an order history 
* track order status 
* browse restaurants and menus
* update profile
* cancel an order
#### Restaurant can :
* accept and prepare an order
* add menu items
* get rating and feedback for itself
* update menu dishes or prices
* update order status
* remove menu items
* view all orders
#### MenuItem
* create menuitem
* change menuitem
* delete menuitem
## API endpoints 
#### User endpoints
* POST/auth/register
* POST/auth/login
* POST/order
* POST/review
* GET/all_orders
* GET/order_status
* GET/all_restaurants
* PATCH/profile
* DELETE/order
#### Restaurant 
* GET/order
* GET/review
* PATCH/order_status
* GET/all_orders
#### MenuItem
* POST/menuitem
* PATCH/menuitem
* DELETE/menuitem
## DATABASE

### Table: users

| Column          | Data Type   | Constraints       |
|-----------------|-------------|-------------------|
| user_id         | Integer     | PRIMARY KEY       |
| username        | String(50)  | UNIQUE, NOT NULL  |
| email           | String(50)  | UNIQUE, NOT NULL  |
| hashed_password | String(255) | NOT NULL          |

### Table: restaurants

| Column       | Data Type   | Constraints            |
|--------------|-------------|------------------------|
| restaurant_id| Integer     | PRIMARY KEY            |
| owner_id     | Integer     | FOREIGN KEY, NOT NULL  |
| name         | String(100) | NOT NULL               |
| description  | Text        | NULL allowed           |
| address      | String(255) | NOT NULL               |
| phone_number | String(20)  | NULL allowed           |

**Foreign Key:** owner_id → users.user_id

### Table: menu_items

| Column        | Data Type     | Constraints            |
|---------------|---------------|------------------------|
| item_id       | Integer       | PRIMARY KEY            |
| restaurant_id | Integer       | FOREIGN KEY, NOT NULL  |
| name          | String(100)   | NOT NULL               |
| description   | Text          | NULL allowed           |
| price         | Numeric(10,2) | NOT NULL, CHECK >= 0   |
| category      | String(50)    | NOT NULL               |

**Foreign Key:** restaurant_id → restaurants.restaurant_id

