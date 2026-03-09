'use server';

import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath, revalidateTag } from 'next/cache';

const DATABASE_NAME = 'mpn_cms';
const COLLECTION_NAME = 'investor_resources';

export async function getInvestorResources() {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const resources = await db.collection(COLLECTION_NAME).find({}).sort({ createdAt: -1 }).toArray();
    return resources.map(item => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (e) {
    console.error("Failed to fetch investor resources:", e);
    return [];
  }
}

export async function createInvestorResource(formData: FormData) {
  const title = formData.get('title') as string;
  const lang = formData.get('lang') as string;
  const pdfFile = formData.get('pdf') as File;

  if (!pdfFile || pdfFile.size === 0) {
    throw new Error("Please select a PDF file.");
  }

  if (pdfFile.type !== 'application/pdf') {
    throw new Error("Only PDF files are allowed.");
  }

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

  revalidateTag('investor-resources');
  revalidatePath('/[lang]/investor', 'page');
  revalidatePath('/cms/investor-relations');
}

export async function deleteInvestorResource(id: string) {
  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
  
  revalidateTag('investor-resources');
  revalidatePath('/[lang]/investor', 'page');
  revalidatePath('/cms/investor-relations');
}

export async function getLatestInvestorResource(lang: string) {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const resource = await db.collection(COLLECTION_NAME)
      .findOne({ lang }, { sort: { createdAt: -1 } });
    
    if (!resource) return null;

    return {
      ...resource,
      _id: resource._id.toString(),
    };
  } catch (e) {
    return null;
  }
}

export async function getInvestorResourcesByLang(lang: string) {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const resources = await db.collection(COLLECTION_NAME)
      .find({ lang })
      .sort({ createdAt: -1 })
      .toArray();
    
    return resources.map(item => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (e) {
    console.error("Failed to fetch investor resources for lang:", lang, e);
    return [];
  }
}
