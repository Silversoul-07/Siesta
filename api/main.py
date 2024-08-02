import os
from dotenv import load_dotenv
import logging
import sys

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '1'

load_dotenv()

logging.basicConfig(stream=sys.stdout, level=logging.INFO, format='%(levelname)s:     %(message)s')
logger = logging.getLogger(__name__)

class DriveNotMounted(Exception):
    def __init__(self, message="Drive not mounted"):
        self.message = message
        super().__init__(self.message)

# -------------------------------------------------------------------------

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from api.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from api.users.route import router as users_router
from api.images.route import router as images_router

app = FastAPI()
app.include_router(router=users_router)
app.include_router(router=images_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
STORAGE_DIR = os.getenv('STORAGE_DIR')
if not os.path.exists(STORAGE_DIR):
    raise DriveNotMounted()

app.mount("/media", StaticFiles(directory=STORAGE_DIR), name="public")

Base.metadata.create_all(bind=engine) # Create the database 

@app.get('/api', tags=['root'])
async def index():
    return {
        "message" : "This is a Fastapi Module. Check /docs for more details."
    }

