from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from auth import require_restaurant_owner
from database import (create_restaurant,get_all_restaurants,get_restaurant,update_restaurant,delete_restaurant)

router = APIRouter(prefix="/restaurants", tags=["Restaurants"])

class RestaurantCreate(BaseModel):
    name: str
    address: str
    email: EmailStr
    description: str | None = None

class RestaurantUpdate(BaseModel):
    name: str | None = None
    address: str | None = None
    email: EmailStr | None = None
    description: str | None = None

def check_admin(restaurant_id: int, admin):
    existing = get_restaurant(restaurant_id)
    if existing is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    if existing["admin_id"] != admin.user_id:
        raise HTTPException(status_code=403, detail="Access denied")
    return existing

@router.post("", status_code=201)
def create_restaurant_endpoint(data: RestaurantCreate,admin=Depends(require_restaurant_owner)):
    return create_restaurant(name=data.name,address=data.address,email=data.email,description=data.description,admin_id=admin.user_id)

@router.get("")
def list_restaurants():
    return get_all_restaurants()

@router.get("/{restaurant_id}")
def restaurant_details(restaurant_id: int):
    existing = get_restaurant(restaurant_id)
    if existing is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return existing

@router.patch("/{restaurant_id}")
def edit_restaurant(restaurant_id: int,data: RestaurantUpdate,admin=Depends(require_restaurant_owner)):
    check_admin(restaurant_id, admin)
    changes = data.model_dump(exclude_unset=True)
    if not changes:
        raise HTTPException(status_code=400, detail="No fields provided")
    return update_restaurant(restaurant_id, changes)

@router.delete("/{restaurant_id}", status_code=204)
def remove_restaurant(restaurant_id: int,admin=Depends(require_restaurant_owner)):
    check_admin(restaurant_id, admin)
    delete_restaurant(restaurant_id)
    return None
