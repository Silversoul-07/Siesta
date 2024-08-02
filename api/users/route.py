from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
import api.users.schemas as schemas
from api.users.crud import *
from api.users.utils import *

router = APIRouter(prefix='/api', tags=['Users'])

@router.post("/users", status_code=201)
async def create_dbuser(user: schemas.UserCreate, db: Session = Depends(get_db)):
    isUser = await get_user_by_email(db, user.email)
    if isUser:
        raise HTTPException(status_code=400, detail="Email already registered")
    user.password = await get_password_hash(user.password)
    await create_user(db, 
                user.name,
                user.email,
                user.password,
                user.image)
    return {"message": "User created"}

@router.get("/users/{id}", response_model=schemas.User)
async def get_dbuser(id: int, db: Session = Depends(get_db)):
    user = await get_user_by_id(db, id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.delete("/users/{id}")
async def delete_dbuser(id: int, db: Session = Depends(get_db)):
    user = await get_user_by_id(db, id=id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    await delete_user(db, id)
    return {"message": "User deleted"}

@router.post("/users/validate", response_model=schemas.User)
async def validate_dbuser(user: schemas.UserValidate, db: Session = Depends(get_db)):
    db_user = await get_user_by_email(db, user.email)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    isVerified = await verify_password(user.password, db_user.password)
    if not isVerified:
        raise HTTPException(status_code=401, detail="Invalid password")
    return db_user
