from fastapi import Depends, File, UploadFile, Form, APIRouter, HTTPException
from sqlalchemy.orm import Session
from io import BytesIO
from PIL import Image
import api.images.schemas as schemas
from api.images.utils import *
from api.images.crud import *
from typing import List
import os
import asyncio
from imagehash import phash

router = APIRouter(prefix='/api', tags=['Images'])
STORAGE_DIR = os.getenv('STORAGE_DIR')

@router.post("/images", status_code=201)
async def create_dbimage(
    db: Session = Depends(get_db),
    image: UploadFile = File(...),
    title: str = Form(...),
    user_id: str = Form(...),
):
    contents = await image.read()
    img = Image.open(BytesIO(contents)).convert("RGB")
    hash = await asyncio.to_thread(phash, img)
    url = image.filename
    image = await create_image(db, url, title, hash, user_id)
    if image is None:
        raise HTTPException(400, "Failed to create image")
    # embed = await generate_image_embedding(img)
    # embed = await create_embedding(db, image.id, embed)
    # if embed is None:
        # raise HTTPException(400, "Failed to create embedding")
    img.save(os.path.join(STORAGE_DIR, image.url))
    return {"message": "Image created"}

@router.post("/images/random", response_model=List[schemas.Image])
async def get_dbimages(db: Session = Depends(get_db), limit: int = 30):
    print("limit", limit)
    images = await get_random_images(db, limit)
    return images

@router.get("/images/{id}", response_model=schemas.Image)
async def get_dbimage(id: int, db: Session = Depends(get_db)):
    image = await get_image(db, id)
    if image is None:
        raise HTTPException(404, "Image Not Found")
    return image

@router.delete("/images/{id}")
async def delete_image(id: int, db: Session = Depends(get_db)):
    return None

@router.post("/search", response_model=List[schemas.Image])
async def query_dbimages(query: str, limit: int=100, db: Session = Depends(get_db)):
    query_embed = await generate_text_embedding(query)
    images = await vectorSearch(db, query_embed, limit)
    return images

@router.post("/visual-search", response_model=List[schemas.Image])
async def visual_search(id: int, db: Session = Depends(get_db)):
    image = await get_embed_by_id(db, id)
    img = Image.open(os.path.join(STORAGE_DIR, image.url))
    embed = await generate_image_embedding(img)
    
    similar_images = await vectorSearch(db, embed, 25)
    return similar_images