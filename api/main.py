import os

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '1'

from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Form
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from api.database import engine, Base
import api.crud as crud
import api.schemas as schemas
import logging
import sys
from api.utils import *
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from PIL import Image

logging.basicConfig(stream=sys.stdout, level=logging.INFO, format='%(levelname)s:     %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/media", StaticFiles(directory="public"), name="public")

Base.metadata.create_all(bind=engine) # Create the database tables

@app.get("/api/test", response_model=schemas.SuccessResponse)
def index():
    return {"message": "Hello World"}

@app.get("/api/users/{id}", response_model=schemas.UserInfo)
async def get_user(id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db, id=id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/api/users", status_code=201)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if crud.get_user(db, user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    user.password = get_password_hash(user.password)
    crud.create_user(db, user)
    return {"message": "User created"}

@app.delete("/api/users/{id}", response_model=schemas.SuccessResponse)
async def delete_user(id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db, id=id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    crud.delete_user(db, id)
    return {"message": "User deleted"}
    
@app.post("/api/validate", response_model=schemas.UserInfo)
async def validate(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user.email)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid password")
    return db_user

@app.post("/api/images", response_model=schemas.SuccessResponse, status_code=201)
async def create_image(
    user_id: str = Form(...),
    title: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Handle the file and form data here
    contents = await image.read()
    img = Image.open(BytesIO(contents)).convert("RGB")
    text_embed = get_text_embed(title)
    img_embed = get_img_embed(img)
    text_embed += img_embed
    filename = rename_file(image.filename)
    image = schemas.CreateImage(
        id=sha256(img),
        url=filename,
        title=title,
        text_embed=text_embed,
        img_embed=img_embed,
        user_id=user_id
    )
    crud.create_image(db, image)
    img.save(f"public/{filename}")
    return {"message": "Image created"}

@app.get("/images/search/")
def search_images(query: str, limit: int = 10, db: Session = Depends(get_db)):
    images = crud.vector_search(db, query, limit)
    return images