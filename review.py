from pydantic import BaseModel,Field
from fastapi import APIRouter,Depends,HTTPException
from database import create_review,get_restaurant_reviews,get_average_rating
from auth import get_current_user


class ReviewCreate(BaseModel):
    restaurant_id : int
    rating : int = Field(ge=1,le=5)
    comment : str | None = None

router = APIRouter(prefix="/reviews",tags=["reviews"])
restaurant_review_router = APIRouter(prefix="/restaurants")

@router.post("",status_code=201)
def create_restaurant_review(review : ReviewCreate,user = Depends(get_current_user)):
    created_review = create_review(review.restaurant_id,user.user_id,review.rating,review.comment)
    return created_review

@restaurant_review_router.get("/{restaurant_id}/reviews",status_code=200)
def get_all_restaurant_reviews(restaurant_id: int):
    reviews = get_restaurant_reviews(restaurant_id)
    return reviews

@restaurant_review_router.get("/{restaurant_id}/rating",status_code=200)
def get_average_restaurant_rating(restaurant_id: int):
    average_rating = get_average_rating(restaurant_id)
    return average_rating