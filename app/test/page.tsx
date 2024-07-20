// 'use client';
// import React, { useState } from 'react';
// import axios from 'axios';

import TwoColumnLayout from "@/components/View";

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

export default function app(){
  return(
    <TwoColumnLayout />
  )
}