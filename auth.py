import jwt
from datetime import datetime,timezone,timedelta
from dotenv import load_dotenv
import os
from pwdlib import PasswordHash
from pydantic import BaseModel,EmailStr,Field
from fastapi import HTTPException,APIRouter,Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from database import register_user,get_user
from sqlalchemy.exc import IntegrityError

load_dotenv()
if(os.getenv("SECRET_KEY") and os.getenv("ALGORITHM")):
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = os.getenv("ALGORITHM")
else :
    raise ValueError("SECRET_KEY and ALGORITHM are required.")
def create_token(username : str) -> str:
    payload = {
        "sub": username,
        "exp": datetime.now(timezone.utc) + timedelta(hours = 1),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str):
    try :
        payload = jwt.decode(token, SECRET_KEY, algorithms = ALGORITHM)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Signature expired. Please log in again.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token. Please log in again.")
    username = payload.get("sub")
    if username is None:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    return username

pw_hash = PasswordHash.recommended()

def hash_password(password : str) -> str:
    return pw_hash.hash(password)
def verify_password(password : str, hashed_password : str) -> bool:
    return pw_hash.verify(password, hashed_password)

class UserRegister(BaseModel):
    username : str
    email : EmailStr
    password : str = Field(min_length=8)
class UserResponse(BaseModel):
    user_id : int
    username : str
    email : EmailStr

router = APIRouter(prefix = "/auth")
@router.post("/register",response_model=UserResponse,status_code=201)
def register(user : UserRegister):
    hashed_password = hash_password(user.password)
    try:
        registered_user = register_user(username=user.username, email=user.email, hashed_password=hashed_password)
    except IntegrityError:
        raise HTTPException(status_code=409, detail="User already exists")
    return registered_user

class UserLogin(BaseModel):
    username : str
    password : str
@router.post("/login",status_code=200)
def login(user : UserLogin):
    user_db = get_user(username=user.username)
    if user_db :
        if verify_password(user.password, user_db.hashed_password):
            token = create_token(user.username)
        else :
            raise HTTPException(status_code=401, detail="Invalid username or password")
    else :
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {"access_token":token,"token_type":"bearer"}

bearer = HTTPBearer()
@router.get("/me",response_model=UserResponse)
def me(credentials: HTTPAuthorizationCredentials = Depends(bearer)):
    token = credentials.credentials
    username = verify_token(token)
    user = get_user(username)
    if not user:
        raise HTTPException(status_code=401, detail="Could not validate credentials",headers={"WWW-Authenticate": "Bearer"})
    return user

