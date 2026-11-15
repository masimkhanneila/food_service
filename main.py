from fastapi import FastAPI
from auth import router as auth_router
from restaurant import router as restaurant_router
from menu import router as menu_router
from order import router as order_router,restaurant_orders_router
from review import router as review_router,restaurant_review_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(restaurant_router)
app.include_router(menu_router)
app.include_router(order_router)
app.include_router(restaurant_orders_router)
app.include_router(review_router)
app.include_router(restaurant_review_router)