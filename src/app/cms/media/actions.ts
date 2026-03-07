'use server';

import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath, revalidateTag } from 'next/cache';

const DATABASE_NAME = 'mpn_cms';
const COLLECTION_NAME = 'media';

export async function getMediaLibrary() {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const media = await db.collection(COLLECTION_NAME)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
      
    return media.map(item => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (e) {
    console.error("Failed to fetch media library:", e);
    return [];
  }
}

export async function uploadToLibrary(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file || file.size === 0) throw new Error("No file selected");

  // Max 2MB for images/docs in this implementation
  if (file.size > 2 * 1024 * 1024) throw new Error("File size exceeds 2MB limit");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const data = `data:${file.type};base64,${buffer.toString('base64')}`;

  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  
  const result = await db.collection(COLLECTION_NAME).insertOne({
    name: file.name,
    type: file.type,
    size: file.size,
    data: data,
    createdAt: new Date().toISOString(),
  });

  revalidateTag('media');
  revalidatePath('/cms/media');
  return { success: true, id: result.insertedId.toString(), data };
}

export async function deleteFromLibrary(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
    
    revalidateTag('media');
    revalidatePath('/cms/media');
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}

export async function getMediaById(id: string) {
  try {
    if (!id || id.length !== 24) return null;
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const item = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
    return item ? item.data : null;
  } catch (e) {
    return null;
  }
}
