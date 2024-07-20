import React from 'react'
import ImageUploadClient from '@/components/Imageupload';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Create'
}

export default function ImageUploadPage() {
  return (
    <main className='max-w-[850px] mx-auto p-4 py-4'>
      <h1 className="text-3xl font-bold text-white mb-6">Image Upload</h1>
      <ImageUploadClient />
    </main>
  )
}