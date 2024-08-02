'use client';
import MasonryLayout from "@/components/Masonry";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation'

const Page = () => {
    const params = useParams<{ page_id: string}>()
    const [items, setItems] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const breakpoints = {
        default: 5,
        1100: 3,
        700: 2,
        500: 1,
    };

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.post('/api/visual-search', {},
                    {
                        params: {"id": Number(params.page_id) }
                    });
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
        <section className="container mx-auto px-[0px]">
            <MasonryLayout items={items} breakpoints={breakpoints} />
        </section>
    );
};

export default Page;