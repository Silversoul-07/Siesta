// 'use client';
// import React, { useState } from 'react';
// import axios from 'axios';

// import TwoColumnLayout from "@/components/View";

// const UploadForm = () => {
//   const [image, setImage] = useState(null);
//   const [title, setTitle] = useState('');
//   const [userId, setUserId] = useState('');

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('image', image);
//     formData.append('title', title);
//     formData.append('user_id', userId);
    
//     try {
//       const response = await axios.post('http://localhost:8000/api/images', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Allow-Control-Allow-Origin': '*'
//         }
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error uploading data:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Title:</label>
//         <input
//           name='title'
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>User ID:</label>
//         <input
//           name='user_id'
//           type="text"
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Image:</label>
//         <input
//           name='image'
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           required
//         />
//       </div>
//       <button type="submit">Upload</button>
//     </form>
//   );
// };

// export default UploadForm;

// export default function app(){
//   return(
//     <TwoColumnLayout />
//   )
// }
'use client';
import React, { useState } from 'react';

const ImageUploadForm = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [images, setImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);

  // Function to handle title input change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Function to handle userId input change
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  // Function to handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have an API endpoint to handle image uploads
    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('user_id', userId);
        formData.append('image', image);

        const response = await fetch('http://localhost:8000/api/images', {
          method: 'POST',
          body: formData
        });

        // Handle response if needed (e.g., show success message)
        const data = await response.json();
        console.log('Uploaded:', data);
      }

      // Reset the form after successful upload
      setTitle('');
      setUserId('');
      setImages([]);
      setUploadStatus('Images uploaded successfully!');
    } catch (error) {
      console.error('Error uploading images:', error);
      setUploadStatus('Failed to upload images');
    }
  };

  return (
    <div>
      <h2>Upload Images</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} required />
        </div>
        <div>
          <label>User ID:</label>
          <input type="text" value={userId} onChange={handleUserIdChange} required />
        </div>
        <div>
          <label>Images:</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} required />
        </div>
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default ImageUploadForm;
