'use server';

import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath, revalidateTag } from 'next/cache';

const DATABASE_NAME = 'mpn_cms';
const COLLECTION_NAME = 'brochures';

export async function getBrochures() {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const brochures = await db.collection(COLLECTION_NAME).find({}).sort({ createdAt: -1 }).toArray();
    return brochures.map(item => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (e) {
    console.error("Failed to fetch brochures:", e);
    return [];
  }
}

export async function createBrochure(formData: FormData) {
  const title = formData.get('title') as string;
  const lang = formData.get('lang') as string;
  const pdfFile = formData.get('pdf') as File;

  if (!pdfFile || pdfFile.size === 0) {
    throw new Error("Please select a PDF file.");
  }

  // Validation: PDF only
  if (pdfFile.type !== 'application/pdf') {
    throw new Error("Only PDF files are allowed.");
  }

  // Validation: Max 5MB
  if (pdfFile.size > 5 * 1024 * 1024) {
    throw new Error("File size must be less than 5MB.");
  }

  const bytes = await pdfFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const pdfData = `data:${pdfFile.type};base64,${buffer.toString('base64')}`;

  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  
  await db.collection(COLLECTION_NAME).insertOne({
    title,
    lang,
    fileData: pdfData,
    fileName: pdfFile.name,
    fileSize: pdfFile.size,
    createdAt: new Date().toISOString(),
  });

  revalidateTag('brochures');
  revalidatePath('/[lang]/insight/brochure', 'page');
  revalidatePath('/cms/brochures');
}

export async function deleteBrochure(id: string) {
  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
  
  revalidateTag('brochures');
  revalidatePath('/[lang]/insight/brochure', 'page');
  revalidatePath('/cms/brochures');
}

export async function getLatestBrochure(lang: string) {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const brochure = await db.collection(COLLECTION_NAME)
      .findOne({ lang }, { sort: { createdAt: -1 } });
    
    if (!brochure) return null;

    return {
      ...brochure,
      _id: brochure._id.toString(),
    };
  } catch (e) {
    return null;
  }
}
