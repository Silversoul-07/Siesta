'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios'; // Make sure to install axios
import portrait from '@/public/portrait.png';

const MasonryLayout = () => {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [dropdown, setDropdown] = useState(false);
  const dropdownItems = ['Newest', 'Oldest', 'Popular'];

  const fetchMoreData = useCallback(async () => {
    const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
    console.log(accessKey);
    const response = await axios.get(`/api/images`);    
    const newItems:JSON = response.data.imagePaths.map((imagePath: string) => ({
      imageUrl: imagePath,
      userImage: portrait,
      user: 'John doe',
      showImage: Math.random() > 0.5,
    }));

    setItems((prevItems) => [...prevItems, ...newItems]);
    setPage((prevPage) => prevPage + 1);
  }, [items, page]);

  useEffect(() => {
    fetchMoreData();
  }, [fetchMoreData]);

  const breakpointColumnsObj = {
    default: 6,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-left my-8 text-white pl-4">Discover</h1>
        <button className="text-white text-sm bg-slate-500 px-2 py-1 rounded-lg" onClick={() => setDropdown(!dropdown)}>Sort</button>
        {dropdown && (
          <div className="absolute top-12 right-4 bg-slate-800 rounded-lg p-2">
            {dropdownItems.map((item) => (
              <button key={item} className="text-white text-sm bg-slate-500 px-2 py-1 rounded-lg" onClick={() => console.log(item)}>{item}</button>
            ))}
          </div>
        )}
      </div>
      {/* Dropdown */}

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto"
          columnClassName="bg-clip-padding px-1"
        >
          {items.map((item, index) => (

            <Card className='bg-transparent border-0 relative group mb-6 rounded-none' key={index}>
              <CardContent>

                <div className="overflow-hidden relative object-cover w-full h-full border border-slate-200 rounded-lg">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>

                {item.showImage && (
                    <div className="flex items-center mt-2">
                    <img src={item.userImage} alt={item.user} className="w-8 h-8 rounded-full" />
                    <p className="text-sm text-white ml-2">{item.user}</p>
                  </div>
                  )
                }
        
              </CardContent>
            </Card>
          ))}
        </Masonry>
      </>
  );
};

export default MasonryLayout;