from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from app.routers.chess import router as chess_router
from fastapi.middleware.cors import CORSMiddleware

# This is more like express
app = FastAPI(title="Chess Game Backend")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Add your frontend's origin here
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Specify allowed methods
    allow_headers=["Content-Type", "Authorization", "Accept"],  # Allow all headers
)

# Database configuration
DATABASE_URL = "sqlite://db.sqlite3"

register_tortoise(
    app,
    db_url=DATABASE_URL,
    modules={"models": ["app.models"]},
    generate_schemas=True,  # Auto-create tables during development
    add_exception_handlers=True,
)

@app.get("/")
async def root():
    return {"message": "Welcome to the Chess Game API"}

# Include the Chess Pieces router
app.include_router(chess_router)