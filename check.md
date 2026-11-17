# Docker Compose failure log

запуск не работает из коробки

```console
$ docker compose up --build -d
env file /Users/timtursunov/teaching/projs/food_service/.env not found: stat /Users/timtursunov/teaching/projs/food_service/.env: no such file or directory
```

- Exit code: `14`.
- Required file: `.env`, `compose.yaml:8-9`.
- Required settings: `SECRET_KEY`, `ALGORITHM`, `auth.py:13-17`.
- Missing setup files: `.env.example`, `README.md`.

# Spec discrepancies

## API routes

ручки не по спеке названы, просто указываю на это.
старайся придерживаться дизайна или обновляй дизайн

| Documented route | Implemented equivalent |
| --- | --- |
| `POST /auth/register` | `POST /auth/register/user`, `POST /auth/register/admin` |
| `POST /order` | `POST /orders` |
| `POST /review` | `POST /reviews` |
| `GET /all_orders` | Customer: `GET /orders/me`; owner: `GET /restaurants/{restaurant_id}/orders` |
| `GET /order_status` | `GET /orders/{order_id}` |
| `GET /all_restaurants` | `GET /restaurants` |
| `PATCH /profile` | Not implemented |
| `DELETE /order` | Not implemented; `DELETE /orders/{order_id}` returns `405` |
| `GET /order` | Owner: `GET /restaurants/{restaurant_id}/orders` |
| `GET /review` | `GET /restaurants/{restaurant_id}/reviews` |
| `PATCH /order_status` | `PATCH /orders/{order_id}/status` |
| `POST /menuitem` | `POST /restaurants/{restaurant_id}/menu-items` |
| `PATCH /menuitem` | `PATCH /restaurants/{restaurant_id}/menu-items/{menu_item_id}` |
| `DELETE /menuitem` | `DELETE /restaurants/{restaurant_id}/menu-items/{menu_item_id}` |


## Models and database

| Spec | Implementation | References |
| --- | --- | --- |
| Table `restaurants` | Table `restaurant` | `design_doc.md:82`, `database.py:25` |
| `restaurants.owner_id` | `restaurant.admin_id` | `design_doc.md:87`, `database.py:27` |
| Optional `restaurants.phone_number` | Missing | `design_doc.md:91`, `database.py:25-32` |
| No restaurant email field | Required `restaurant.email` | `design_doc.md:84-91`, `restaurant.py:8-12`, `database.py:31` |
| Table `menu_items` | Table `menu_item` | `design_doc.md:95`, `database.py:34` |
| `menu_items.price CHECK >= 0` | No database check; create requires `> 0`; update has no lower bound | `design_doc.md:103`, `database.py:34-41`, `menu.py:8-18` |
| `menu_items.category String(50)` | `menu_item.category String(100)` | `design_doc.md:104`, `database.py:40` |
| Menu item `ingridients` property | Missing; only `description` exists | `design_doc.md:26`, `menu.py:8-12` |
| Three documented tables | Additional undocumented tables: `order`, `order_item`, `review` | `design_doc.md:71-107`, `database.py:42-69` |
