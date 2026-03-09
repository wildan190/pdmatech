
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

/**
 * API Route to serve images stored as Base64 in MongoDB as actual image files.
 * This is required for Open Graph (OG) tags because social media crawlers 
 * do not support Base64 data URIs in og:image tags.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    if (!id || id.length !== 24) {
      return new NextResponse('Invalid Media ID', { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('mpn_cms');
    const media = await db.collection('media').findOne({ _id: new ObjectId(id) });

    if (!media || !media.data) {
      return new NextResponse('Media Not Found', { status: 404 });
    }

    // media.data is expected to be a data URI: "data:image/png;base64,iVBOR..."
    const [header, base64Data] = media.data.split(',');
    const contentType = header.split(':')[1].split(';')[0];
    
    const buffer = Buffer.from(base64Data, 'base64');

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error serving media:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
