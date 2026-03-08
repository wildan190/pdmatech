'use server';

import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';

const DATABASE_NAME = 'mpn_cms';
const COLLECTION_NAME = 'navigation';

export async function getNavLinks(lang: string, type: 'navbar' | 'footer') {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const links = await db.collection(COLLECTION_NAME)
      .find({ lang, type })
      .sort({ order: 1 })
      .toArray();
    return links.map(l => ({ ...l, _id: l._id.toString() }));
  } catch (e) {
    return [];
  }
}

export async function saveNavLink(formData: FormData) {
  const title = formData.get('title') as string;
  const href = formData.get('href') as string;
  const lang = formData.get('lang') as string;
  const type = formData.get('type') as 'navbar' | 'footer';
  const id = formData.get('id') as string;

  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);

  if (id) {
    await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, href, lang, type, updatedAt: new Date().toISOString() } }
    );
  } else {
    const count = await db.collection(COLLECTION_NAME).countDocuments({ lang, type });
    await db.collection(COLLECTION_NAME).insertOne({
      title,
      href,
      lang,
      type,
      order: count,
      createdAt: new Date().toISOString(),
    });
  }

  revalidatePath('/', 'layout');
}

export async function deleteNavLink(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    // Explicitly targeting only navigation collection
    await db.collection('navigation').deleteOne({ _id: new ObjectId(id) });
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}

export async function reorderNavLinks(ids: string[]) {
  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);

  const updates = ids.map((id, index) => {
    return db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) },
      { $set: { order: index } }
    );
  });

  await Promise.all(updates);
  revalidatePath('/', 'layout');
}
