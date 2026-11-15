
from pathlib import Path
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from database import initialize_db
from auth import router as auth_router
from restaurant import router as restaurant_router
from menu import router as menu_router
from order import router as order_router, restaurant_orders_router
from review import router as review_router, restaurant_review_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    initialize_db()
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5500",
        "http://127.0.0.1:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(restaurant_router)
app.include_router(menu_router)
app.include_router(order_router)
app.include_router(restaurant_orders_router)
app.include_router(review_router)
app.include_router(restaurant_review_router)


FRONTEND_DIR = Path(__file__).parent / "frontend"


@app.get("/", include_in_schema=False)
def homepage():
    return FileResponse(FRONTEND_DIR / "index.html")


app.mount(
    "/static",
    StaticFiles(directory=FRONTEND_DIR),
    name="static"
)
