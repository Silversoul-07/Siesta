# import os
# import psycopg2

# # Connect to PostgreSQL database
# conn = psycopg2.connect("dbname=yourdb user=youruser password=yourpassword")
# cur = conn.cursor()

# # Get all image paths from the database
# cur.execute("SELECT id, image_path FROM images")
# db_images = cur.fetchall()

# # Get all image files from the directory
# folder_images = set(os.listdir('/path/to/your/images/folder'))

# # Check for missing images in the folder
# for image_id, image_path in db_images:
#     if os.path.basename(image_path) not in folder_images:
#         print(f"Image {image_path} is missing in the folder")
#         # Optionally delete the database entry
#         # cur.execute("DELETE FROM images WHERE id = %s", (image_id,))

# # Check for images in the folder not in the database
# for image_file in folder_images:
#     if image_file not in [os.path.basename(img[1]) for img in db_images]:
#         print(f"Image {image_file} is not in the database")

# # Commit changes and close the connection
# conn.commit()
# cur.close()
# conn.close()


import base64
import os

def image_to_blob(image_path):
    with open(image_path, "rb") as image_file:
        blob = base64.b64encode(image_file.read()).decode('utf-8')
    return f"data:image/{os.path.splitext(image_path)[-1][1:]};base64,{blob}"

def blob_to_image(blob_url, output_path):
    header, encoded = blob_url.split(",", 1)
    data = base64.b64decode(encoded)
    with open(output_path, "wb") as output_file:
        output_file.write(data)

# Example usage:
blob_url = image_to_blob("public/bg-login.jpg")
open('pen.txt','w').write(blob_url)
blob_to_image(blob_url, "output_image.jpg")