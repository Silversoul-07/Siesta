'use client';
import React, { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-css';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface MasonryLayoutProps {
  items: Array<{
    id: number
    url: string;
    title: string;
  }>;
  breakpoints: {
    [key: string]: number;
  };
}

const LazyImage: React.FC<{id:number; src: string; alt: string }> = ({ id, src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          } else {
            setIsVisible(false);
          }
        });
      },
      { rootMargin: '50px', threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [isVisible]);

  return (
    <div ref={imgRef} className="w-full h-full">
      {isLoaded ? (
        <Link href={`/visual-search/`+id}>
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </Link>
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};

const MasonryLayout: React.FC<MasonryLayoutProps> = ({ items, breakpoints }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-left my-8 mb-4 text-white pl-4">Discover</h1>
      </div>
      <Masonry
        breakpointCols={breakpoints}
        className="flex w-auto"
        columnClassName="bg-clip-padding"
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className='bg-transparent border-0 relative group p-[4.5px] lg:p-[4px] rounded-none' key={index}>
              <CardContent>
                <div className="overflow-hidden relative object-cover w-full h-full border border-grey-800 rounded-lg  min-h-[200px]">
                  <LazyImage id={item.id} src={`/media/${item.url}`} alt={`Image ${index}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Masonry>
    </>
  );
};

export default MasonryLayout;