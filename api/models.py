from sqlalchemy import Column, Integer, String
from api.database import Base
from pgvector.sqlalchemy import Vector

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255))
    email = Column(String(255))
    password = Column(String(255))
    image = Column(String(255))

class Image(Base):
    __tablename__ = "images"

    id = Column(String(64), primary_key=True, index=True)  
    url = Column(String(255))
    title = Column(String(255))
    text_emb = Column(Vector(1024))  
    img_emb = Column(Vector(512))
    user_id = Column(Integer)





