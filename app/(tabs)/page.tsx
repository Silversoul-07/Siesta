'use client';
import MasonryLayout from "@/components/Masonry";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Page = () => {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const breakpoints = {
    default:5,
    1100: 3,
    700: 2,
    500: 2,
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.post('/api/images/random',{}, {params: {"limit": 500}});
        setItems(response.data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
        setError('Failed to fetch items');
      }
    };

    fetchItems();
  }, []); // Empty dependency array ensures this runs only once

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className=" mx-8 px-2 lg:px-4">
      <MasonryLayout items={items} breakpoints={breakpoints} />
    </main>
  );
};

export default Page;