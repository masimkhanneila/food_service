from pydantic import BaseModel,Field
from fastapi import APIRouter,Depends,HTTPException
from database import create_order,get_user_orders,get_order,update_order,get_restaurant_orders
from auth import get_current_user,require_restaurant_owner
from restaurant import check_admin
from typing import Literal

class OrderItemCreate(BaseModel):
    menu_item_id: int
    quantity: int = Field(gt = 0)

class OrderCreate(BaseModel):
    restaurant_id: int
    basket : list[OrderItemCreate] = Field(min_length=1)

class OrderStatusUpdate(BaseModel):
    status: Literal["pending", "accepted", "preparing", "ready", "completed"]
router = APIRouter(prefix="/orders",tags=["order"])
restaurant_orders_router = APIRouter(prefix="/restaurants",tags=["Restaurant Orders"])

@router.post("",status_code=201)
def create_order_menu(item : OrderCreate, user = Depends(get_current_user)):
    order_created = create_order(user.user_id, item.restaurant_id, item.basket)
    return order_created

@router.get("/me",status_code=200)
def get_users_order(user = Depends(get_current_user)):
    return get_user_orders(user.user_id)

@router.get("/{order_id}",status_code=200)
def get_order_user(order_id: int ,user = Depends(get_current_user)):
    order = get_order(order_id)
    if order is None :
        raise HTTPException(status_code=404, detail="Order not found")
    if order["user_id"] != user.user_id :
        raise HTTPException(status_code=403, detail="Access denied")
    return order

@router.patch("/{order_id}/status",status_code=200)
def update_order_status(order_id: int,item_status: OrderStatusUpdate,admin = Depends(require_restaurant_owner)):
    order = get_order(order_id)
    if order is None :
        raise HTTPException(status_code=404, detail="Order not found")
    check_admin(order["restaurant_id"],admin)
    updated_order = update_order(order_id,item_status.status)
    return updated_order

@restaurant_orders_router.get("/{restaurant_id}/orders",status_code=200)
def get_all_restaurant_orders(restaurant_id : int,admin = Depends(require_restaurant_owner)):
    check_admin(restaurant_id,admin)
    return get_restaurant_orders(restaurant_id)


