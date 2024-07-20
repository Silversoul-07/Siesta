from passlib.context import CryptContext
from api.database import SessionLocal
import api.crud as crud
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import torch
import hashlib
from typing import List
from uuid import uuid4
import os
from sqlalchemy import text, func, literal
import api.models as models

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_user(db, username: str, password: str):
    user = crud.get_user_by_username(db, username=username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

def sha256(img:Image):
    img_hash = hashlib.sha256()
    img_hash.update(img.tobytes())
    return img_hash.hexdigest()
\
def get_text_embed(text:str) -> List[float]:
    text_inputs = clip_processor(text=[text], return_tensors="pt", padding=True, truncation=True)

    # Generate text embedding
    with torch.no_grad():
        text_embed = clip_model.get_text_features(**text_inputs).cpu().numpy()

    print("Shape of text_emb before flattening:", text_embed.shape)
    text_embed_flat = text_embed.flatten().tolist()
    print("Shape of text_emb_flat after flattening:", len(text_embed_flat))


    return text_embed_flat

def get_img_embed(img: Image) -> List[float]:
    img_inputs = clip_processor(images=img, return_tensors="pt")

    # Generate visual embedding
    with torch.no_grad():
        img_embed = clip_model.get_image_features(**img_inputs).cpu().numpy()

    print("Shape of img_embed before flattening:", img_embed.shape)
    img_embed_flat = img_embed.flatten().tolist()
    print("Shape of img_embed_flat after flattening:", len(img_embed_flat))

    return img_embed_flat

def rename_file(filename):
    ext = os.path.splitext(filename)[-1]
    return f"{uuid4().time}{ext}"

import numpy as np

def combine_embeds(text_embed, img_dim=512):
    dummy_img_embed = [0.0] * img_dim
    combined_embed = np.concatenate((text_embed, dummy_img_embed))
    return combined_embed

