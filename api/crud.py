from sqlalchemy.orm import Session
from api.models import User, Image
import api.schemas as schemas
from api.utils import *

def get_user(db: Session, email: str=None, id:int=None) -> schemas.User|None:
    if email:
        return db.query(User).filter(User.email == email).first()
    if id:
        return db.query(User).filter(User.id == id).first()

def delete_user(db: Session, id: str):
    db.query(User).filter(User.id == id).delete()
    db.commit()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = User(
        name=user.name,
        email=user.email,
        password=user.password,
        image=user.image
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

def create_image(db: Session, image: schemas.CreateImage):
    db_image = Image(
        id=image.id,
        url=image.url,
        title=image.title,
        text_emb=image.text_embed,
        img_emb=image.img_embed,
        user_id=image.user_id
    )
    db.add(db_image)
    db.commit()
    db.refresh(db_image)

def vector_search(db, query, top_k=1):
    # query_embed = get_text_embed(query)
    # query_embed_combined = combine_embeds(query_embed)
    # query_embed_str = ','.join(map(str, query_embed_combined))
    # sql = text(f"""
    #     SELECT id, url, (text_emb <-> '[{query_embed_str}]') AS distance
    #     FROM images
    #     ORDER BY distance
    #     LIMIT {top_k};
    # """)
    # results = db.execute(sql)

    query_embed = get_text_embed(query)
    query_embed_combined = combine_embeds(query_embed)  # Ensure combined embedding
    query_embed_str = '[' + ','.join(map(str, query_embed_combined)) + ']'
    
    results = db.query(models.Image).order_by(
        func.cosine_distance(literal(query_embed_str), models.Image.text_emb)
    ).limit(top_k).first()
    return {'url':results.url}