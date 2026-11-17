from decimal import Decimal
from pydantic import BaseModel,Field
from fastapi import APIRouter,Depends,HTTPException
from auth import require_restaurant_owner
from database import create_menu_item,get_restaurant_menu,get_menu_item,update_menu_item,delete_menu_item
from restaurant import check_admin

class MenuItemCreate(BaseModel):
    name : str
    price : Decimal = Field(gt=0)
    category : str
    description : str | None = None

class MenuItemUpdate(BaseModel):
    name : str | None = None
    price : Decimal | None = None
    category : str | None = None
    description : str | None = None
router = APIRouter(prefix="/menu", tags=["menu"])
@router.post("/{restaurant_id}/menu-items", status_code=201)
def create_menu_items(item: MenuItemCreate ,restaurant_id :int, admin=Depends(require_restaurant_owner)):
    check_admin(restaurant_id,admin)
    return create_menu_item(
        name = item.name,
        price = item.price,
        category = item.category,
        restaurant_id = restaurant_id,
        description = item.description
    )
@router.get("/{restaurant_id}/menu-items", status_code=200)
def get_all_menu_items(restaurant_id:int):
    return get_restaurant_menu(restaurant_id)

@router.get("/menu-items/{menu_item_id}", status_code=200)
def get_one_menu_item(menu_item_id:int):
    existing = get_menu_item(menu_item_id)
    if existing is None:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return existing

@router.patch("/{restaurant_id}/menu-items/{menu_item_id}", status_code=200)
def update_restaurant_menu_item(restaurant_id:int, menu_item_id:int, item: MenuItemUpdate, admin=Depends(require_restaurant_owner)):
    check_admin(restaurant_id , admin)
    changes = item.model_dump(exclude_unset=True)
    if changes == {}:
        raise HTTPException(status_code=400, detail="No fields provided for updating")
    return update_menu_item(restaurant_id,menu_item_id,changes)

@router.delete("/{restaurant_id}/menu-items/{menu_item_id}",status_code=204)
def delete_restaurant_menu_item(restaurant_id:int, menu_item_id:int,admin=Depends(require_restaurant_owner)):
    check_admin(restaurant_id,admin)
    deleted = delete_menu_item(restaurant_id,menu_item_id)
    if not deleted :
        raise HTTPException(status_code=404, detail="Menu item not found")
    return None

