from PIL import Image
import hashlib
import torch
from api.database import SessionLocal
from transformers import ViTFeatureExtractor, ViTModel
from transformers import DistilBertTokenizer, DistilBertModel

async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def hash_image(img: Image):
    img_hash = hashlib.sha256()
    img_hash.update(img.tobytes())
    return img_hash.hexdigest()

tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
text_model = DistilBertModel.from_pretrained('distilbert-base-uncased')

# Function to generate text embeddings
async def generate_text_embedding(text: str):
    # Tokenize the text
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    
    # Generate text embeddings
    with torch.no_grad():
        outputs = text_model(**inputs)
    
    # The last hidden state (embeddings) of the [CLS] token
    text_embedding = outputs.last_hidden_state[:, 0, :].squeeze().detach().numpy()
    print(len(text_embedding))
    return text_embedding

# Initialize the model and processor
vit_model = ViTModel.from_pretrained("google/vit-base-patch16-224-in21k")
vit_processor = ViTFeatureExtractor.from_pretrained("google/vit-base-patch16-224-in21k")

async def generate_image_embedding(image: Image):
    # Preprocess the image
    inputs = vit_processor(images=image, return_tensors="pt")
    
    # Generate image embeddings
    outputs = vit_model(**inputs)
    
    # The last hidden state (embeddings) of the [CLS] token
    image_embedding = outputs.last_hidden_state[:, 0, :].detach().numpy()
    
    # Flatten the embedding
    image_embedding_flat = image_embedding.flatten()
    
    return image_embedding_flat