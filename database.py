from pathlib import Path
from fastapi import HTTPException
from pydantic.v1 import EmailStr
from sqlalchemy import(JSON,Column,Integer,MetaData,String,Table,create_engine,select,ForeignKey,Text,Numeric,func,CheckConstraint,DateTime)
from decimal import Decimal

db_path = Path(__file__).parent / 'food_service.db'
engine = create_engine(f'sqlite:///{db_path}')
md = MetaData()

users = Table("users", md,
              Column("user_id", Integer, primary_key=True),
              Column("username", String(50), nullable=False, unique=True),
              Column("email", String(50), nullable=False, unique = True),
              Column("role",String(20),nullable=False,server_default="customer"),
              Column("hashed_password", String(255), nullable=False)
              )

restaurant = Table("restaurant", md,
                   Column("restaurant_id", Integer, primary_key=True),
                   Column("admin_id",Integer,ForeignKey("users.user_id"),nullable=False),
                   Column("name", String(100),nullable=False),
                   Column("description",Text,nullable=True),
                   Column("address",String(255),nullable=False),
                   Column("email",String(50),nullable=False)
                   )

menu_item = Table("menu_item" , md ,
                  Column("item_id",Integer,primary_key=True),
                  Column("restaurant_id",Integer,ForeignKey("restaurant.restaurant_id"),nullable=False),
                  Column("name",String(100),nullable=False),
                  Column("description",Text,nullable=True),
                  Column("price",Numeric(10,2),nullable=False),
                  Column("category" , String(100),nullable=False)
                  )
order = Table("order",md,
              Column("order_id",Integer,primary_key=True),
              Column("user_id",Integer,ForeignKey("users.user_id"),nullable=False),
              Column("restaurant_id",Integer,ForeignKey("restaurant.restaurant_id"),nullable=False),
              Column("status",String(20),nullable=False,server_default="pending"),
              Column("total_price",Numeric(10,2),nullable=False),
              CheckConstraint("total_price >= 0"),
              Column("created_at",DateTime,nullable=False,server_default=func.current_timestamp())
              )
order_item = Table("order_item",md,
                   Column("order_item_id",Integer,primary_key=True),
                   Column("order_id",Integer,ForeignKey("order.order_id"),nullable=False),
                   Column("menu_item_id",Integer,ForeignKey("menu_item.item_id"),nullable=False),
                   Column("quantity",Integer,nullable=False),
                   CheckConstraint("quantity > 0"),
                   Column("unit_price",Numeric(10,2),nullable=False),
                   CheckConstraint("unit_price > 0")
                   )
review = Table("review",md,
               Column("review_id",Integer,primary_key=True),
               Column("restaurant_id",Integer,ForeignKey("restaurant.restaurant_id"),nullable=False),
               Column("user_id",Integer,ForeignKey("users.user_id"),nullable=False),
               Column("rating",Integer,nullable=False),
               CheckConstraint("rating >= 1"),
               CheckConstraint("rating <= 5"),
               Column("comment",Text,nullable=True),
               Column("created_at",DateTime,nullable=False,server_default=func.current_timestamp())
               )
def initialize_db():
    with engine.begin() as conn :
        md.create_all(conn)

def register_user(username : str, email : EmailStr, hashed_password : str,role :str):
    with engine.begin() as conn :
        result = conn.execute(users.insert().values(username=username, email=email, hashed_password=hashed_password, role = role))
    return {"user_id" : result.inserted_primary_key[0], "username" : username, "email" : email,"role" : role}

def get_user(username : str):
    with engine.begin() as conn :
        result = conn.execute(select(users).where(users.c.username == username))
        return result.first()



def create_restaurant(name: str, address: str, email: str,admin_id: int, description: str | None = None):
    with engine.begin() as conn:
        result = conn.execute(restaurant.insert().values(name=name,address=address,email=email,admin_id=admin_id,description=description))
    return get_restaurant(result.inserted_primary_key[0])


def get_all_restaurants():
    with engine.connect() as conn:
        result = conn.execute(select(restaurant))
        return [dict(row._mapping) for row in result]

def get_restaurant(restaurant_id: int):
    with engine.connect() as conn:
        result = conn.execute(select(restaurant).where(restaurant.c.restaurant_id == restaurant_id))
        row = result.first()
        return dict(row._mapping) if row else None

def update_restaurant(restaurant_id: int, changes: dict):
    with engine.begin() as conn:
        conn.execute(restaurant.update().where(restaurant.c.restaurant_id == restaurant_id).values(**changes))
    return get_restaurant(restaurant_id)

def delete_restaurant(restaurant_id: int):
    with engine.begin() as conn:
        result = conn.execute(restaurant.delete().where(restaurant.c.restaurant_id == restaurant_id))
        return result.rowcount > 0



def create_menu_item(name : str, price : Decimal, category : str, restaurant_id : int, description : str | None  = None):
    with engine.begin() as conn:
        result = conn.execute(menu_item.insert().values(
            restaurant_id = restaurant_id,
            name=name,
            price=price,
            category=category,
            description=description
        ))
    return get_menu_item(result.inserted_primary_key[0])

def get_menu_item(menu_id: int):
    with engine.connect() as conn:
        result = conn.execute(select(menu_item).where(menu_item.c.item_id == menu_id)).first()
        return dict(result._mapping) if result else None

def get_restaurant_menu(restaurant_id):
    with engine.connect() as conn:
        result = conn.execute(select(menu_item).where(menu_item.c.restaurant_id == restaurant_id))
        return [dict(row._mapping) for row in result]

def update_menu_item(restaurant_id : int, menu_item_id : int, changes : dict):
    menu = get_menu_item(menu_item_id)
    if not menu:
        raise HTTPException(status_code=404, detail="Menu item not found")
    if menu["restaurant_id"] != restaurant_id:
        raise HTTPException(status_code=404, detail="Menu item not found")
    with engine.begin() as conn:
        conn.execute(menu_item.update().where((menu_item.c.restaurant_id == restaurant_id)
                     ,(menu_item.c.item_id == menu_item_id)).values(**changes))
    return get_menu_item(menu_item_id)

def delete_menu_item(restaurant_id,menu_item_id):
    if get_menu_item(menu_item_id) is None:
        raise HTTPException(status_code=404, detail="Menu item not found")
    with engine.begin() as conn:
        result = conn.execute(menu_item.delete().where((menu_item.c.restaurant_id == restaurant_id)
                     ,(menu_item.c.item_id == menu_item_id)))
        return result.rowcount > 0



def create_order(user_id: int,restaurant_id: int,basket : list):
    restaurant = get_restaurant(restaurant_id)
    if restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    total_price = Decimal("0.00")
    validated_items = []
    for item in basket:
        dish = get_menu_item(item.menu_item_id)
        if dish is None:
            raise HTTPException(status_code=404, detail="Menu item not found")
        if dish["restaurant_id"] != restaurant_id:
            raise HTTPException(status_code=404, detail="Menu item not found")
        total_price += dish["price"] * item.quantity
        validated_items.append({"menu_item_id" : item.menu_item_id,
                                "quantity":item.quantity,
                                "unit_price":dish["price"]})
    with engine.begin() as conn:
        result = conn.execute(order.insert().values(user_id=user_id,
                                                    restaurant_id=restaurant_id,
                                                    total_price=total_price))
        order_id = result.inserted_primary_key[0]
        for item in validated_items:
            conn.execute(order_item.insert().values(order_id=order_id,
                                                    menu_item_id = item["menu_item_id"],
                                                    quantity = item["quantity"],
                                                    unit_price = item["unit_price"]
                                                    ))
    return get_order(order_id)

def get_order(order_id: int):
    with engine.connect() as conn:
        result = conn.execute(select(order).where(order.c.order_id == order_id)).first()
    return dict(result._mapping) if result else None

def get_user_orders(user_id: int):
    with engine.connect() as conn:
        result = conn.execute(select(order).where(order.c.user_id == user_id))
        return [dict(row._mapping) for row in result]

def update_order(order_id: int, status :str):
    existing_order = get_order(order_id)
    if existing_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    statuses = ["pending", "accepted", "preparing", "ready", "completed"]
    current_status = existing_order["status"]
    position = statuses.index(current_status)
    if position == len(statuses) - 1:
        raise HTTPException(status_code=400, detail="Order is already completed")
    next_status = statuses[position + 1]
    if next_status != status:
        raise HTTPException(status_code=400, detail="Bad Request")
    with engine.begin() as conn:
        conn.execute(order.update().where(order.c.order_id == existing_order["order_id"]).
                     values(status = next_status))
    return get_order(existing_order["order_id"])

def get_restaurant_orders(restaurant_id: int):
    with engine.connect() as conn:
        result = conn.execute(select(order).where(order.c.restaurant_id == restaurant_id))
        return [dict(row._mapping) for row in result]



def create_review(restaurant_id : int, user_id:int,rating:int,comment:str | None = None):
    restaurant = get_restaurant(restaurant_id)
    if restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    customer_order = get_user_orders(user_id)
    ordered = False
    for order in customer_order:
        if order["restaurant_id"] == restaurant_id and order["status"] == "completed":
            ordered = True
            break
    if not ordered:
        raise HTTPException(status_code=403, detail="You must complete an order before reviewing this restaurant")
    with engine.begin() as conn:
        result = conn.execute(review.insert().values(restaurant_id=restaurant_id,
                                            user_id=user_id,
                                            rating=rating,
                                            comment=comment))
    return get_review(result.inserted_primary_key[0])

def get_review(review_id:int):
    with engine.connect() as conn:
        result = conn.execute(select(review).where(review.c.review_id == review_id)).first()
    return dict(result._mapping) if result else None

def get_restaurant_reviews(restaurant_id: int):
    with engine.connect() as conn:
        result = conn.execute(select(review).where(review.c.restaurant_id == restaurant_id))
        return [dict(row._mapping) for row in result]

def get_average_rating(restaurant_id: int):
    with engine.connect() as conn:
        result = conn.execute(select(func.avg(review.c.rating)).where(review.c.restaurant_id == restaurant_id)).scalar()
    return result