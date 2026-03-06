'use server';

import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';

const DATABASE_NAME = 'mpn_cms';
const COLLECTION_NAME = 'inquiries';

export async function submitInquiry(data: {
  name: string;
  email: string;
  company?: string;
  industry?: string;
  message: string;
}) {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    
    const result = await db.collection(COLLECTION_NAME).insertOne({
      ...data,
      status: 'new',
      createdAt: new Date().toISOString(),
    });

    revalidatePath('/cms/inquiries');
    return { success: true, id: result.insertedId.toString() };
  } catch (error) {
    console.error('Failed to submit inquiry:', error);
    return { success: false, error: 'Failed to save your inquiry.' };
  }
}

export async function getInquiries() {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const inquiries = await db.collection(COLLECTION_NAME)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
      
    return inquiries.map(item => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (e) {
    console.error("Failed to fetch inquiries:", e);
    return [];
  }
}

export async function deleteInquiry(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
    revalidatePath('/cms/inquiries');
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}
