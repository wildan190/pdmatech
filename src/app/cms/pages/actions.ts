'use server';

import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath, revalidateTag } from 'next/cache';

const DATABASE_NAME = 'mpn_cms';
const COLLECTION_NAME = 'pages';

export async function getPages() {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const pages = await db.collection(COLLECTION_NAME).find({}).sort({ createdAt: -1 }).toArray();
    return pages.map(item => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (e) {
    console.error("Failed to fetch pages:", e);
    return [];
  }
}

export async function createPage(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const description = formData.get('description') as string;
  const lang = formData.get('lang') as string;
  const customSlug = formData.get('slug') as string;

  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  
  let slug = customSlug 
    ? customSlug.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    : title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  // Ensure unique slug
  const existing = await db.collection(COLLECTION_NAME).findOne({ slug, lang });
  if (existing) {
    slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
  }

  await db.collection(COLLECTION_NAME).insertOne({
    title,
    content,
    description,
    lang,
    slug,
    createdAt: new Date().toISOString(),
  });

  // Revalidate cache
  revalidateTag('custom-pages');
  revalidatePath('/[lang]/p/[slug]', 'page');
  revalidatePath('/cms/pages');
}

export async function deletePage(id: string) {
  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
  
  // Revalidate cache
  revalidateTag('custom-pages');
  revalidatePath('/[lang]/p/[slug]', 'page');
  revalidatePath('/cms/pages');
}
