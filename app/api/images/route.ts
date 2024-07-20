import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const directoryPath = path.join('public', 'images');
    
    // Read directory contents
    const files = fs.readdirSync(directoryPath);
    
    // Filter image files and construct their paths
    const imagePaths = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
                            .map(file => `/images/${file}`);
    
    return NextResponse.json({ imagePaths }, { status: 200 });
  } catch (error) {
    console.error('Failed to retrieve images:', error);
   return NextResponse.json('Failed to retrieve images');
  }
}