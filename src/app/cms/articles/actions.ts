'use server';

import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath, revalidateTag } from 'next/cache';

const DATABASE_NAME = 'mpn_cms';
const COLLECTION_NAME = 'articles';

export async function getArticles() {
  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  const articles = await db.collection(COLLECTION_NAME).find({}).sort({ date: -1 }).toArray();
  return articles.map(item => ({
    ...item,
    _id: item._id.toString(),
  }));
}

export async function createArticle(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const excerpt = formData.get('excerpt') as string;
  const lang = formData.get('lang') as string;
  const tags = (formData.get('tags') as string || '').split(',').map(t => t.trim()).filter(Boolean);
  const keywords = formData.get('keywords') as string;
  const imageFile = formData.get('image') as File;

  let imageData = 'https://picsum.photos/seed/article/800/600';

  if (imageFile && imageFile.size > 0) {
    if (imageFile.size > 1024 * 1024) {
      throw new Error("Image size must be less than 1MB");
    }
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    imageData = `data:${imageFile.type};base64,${buffer.toString('base64')}`;
  }

  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  
  let slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  const existing = await db.collection(COLLECTION_NAME).findOne({ slug, lang });
  if (existing) {
    slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
  }

  await db.collection(COLLECTION_NAME).insertOne({
    title,
    content,
    excerpt,
    lang,
    tags,
    keywords,
    image: imageData,
    date: new Date().toISOString(),
    slug,
  });

  // Revalidate cache
  revalidateTag('articles');
  revalidatePath('/[lang]/insight/article', 'page');
  revalidatePath('/[lang]/insight/article/[slug]', 'page');
  revalidatePath('/cms/articles');
}

export async function deleteArticle(id: string) {
  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
  
  // Revalidate cache
  revalidateTag('articles');
  revalidatePath('/[lang]/insight/article', 'page');
  revalidatePath('/[lang]/insight/article/[slug]', 'page');
  revalidatePath('/cms/articles');
}
