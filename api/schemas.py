from pydantic import BaseModel, conlist
from typing import List

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    image: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserInfo(BaseModel):
    id: int
    name: str
    email: str
    image: str

class User(BaseModel):
    id: int
    name: str
    email: str
    password: str
    image: str

class SuccessResponse(BaseModel):
    message: str

class CreateImage(BaseModel):
    id: str
    url: str
    title: str
    text_embed: List[float]
    img_embed: List[float]
    user_id: int