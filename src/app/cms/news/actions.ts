'use server';

import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';

const DATABASE_NAME = 'mpn_cms';
const COLLECTION_NAME = 'news';

export async function getNews() {
  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  const news = await db.collection(COLLECTION_NAME).find({}).sort({ date: -1 }).toArray();
  return news.map(item => ({
    ...item,
    _id: item._id.toString(),
  }));
}

export async function createNews(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const excerpt = formData.get('excerpt') as string;
  const lang = formData.get('lang') as string;
  const imageFile = formData.get('image') as File;

  let imageData = 'https://picsum.photos/seed/news/800/600';

  // Handle Image Upload
  if (imageFile && imageFile.size > 0) {
    // Server-side size validation (1MB)
    if (imageFile.size > 1024 * 1024) {
      throw new Error("Image size must be less than 1MB");
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    imageData = `data:${imageFile.type};base64,${buffer.toString('base64')}`;
  }

  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  
  await db.collection(COLLECTION_NAME).insertOne({
    title,
    content,
    excerpt,
    lang,
    image: imageData,
    date: new Date().toISOString(),
    slug: title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
  });

  revalidatePath('/[lang]/insight/news', 'page');
  revalidatePath('/cms/news');
}

export async function deleteNews(id: string) {
  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
  
  revalidatePath('/[lang]/insight/news', 'page');
  revalidatePath('/cms/news');
}
