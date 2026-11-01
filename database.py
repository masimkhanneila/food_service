from pathlib import Path

from fastapi import HTTPException
from pydantic.v1 import EmailStr
from sqlalchemy import(JSON,Column,Integer,MetaData,String,Table,create_engine,select,inspect)

db_path = Path(__file__).parent / 'food_service.db'
engine = create_engine(f'sqlite:///{db_path}')
md = MetaData()

users = Table("users", md,
              Column("user_id", Integer, primary_key=True),
              Column("username", String(50), nullable=False, unique=True),
              Column("email", String(50), nullable=False, unique = True),
              Column("hashed_password", String(255), nullable=False)
              )

def initialize_db():
    with engine.begin() as conn :
        md.create_all(conn)

def register_user(username : str, email : EmailStr, hashed_password : str):
    with engine.begin() as conn :
        result = conn.execute(users.insert().values(username=username, email=email, hashed_password=hashed_password))
    return {"user_id" : result.inserted_primary_key[0], "username" : username, "email" : email}
def get_user(username : str):
    with engine.begin() as conn :
        result = conn.execute(select(users).where(users.c.username == username))
        return result.first()
