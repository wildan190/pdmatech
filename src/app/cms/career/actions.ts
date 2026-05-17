'use server';

import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath, revalidateTag } from 'next/cache';
import type { CareerJob, CareerApplication } from '@/types/mongodb';

const DATABASE_NAME = 'mpn_cms';
const JOBS_COLLECTION = 'jobs';
const APPS_COLLECTION = 'applications';

// --- JOB MANAGEMENT ---

export async function getJobs(): Promise<CareerJob[]> {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const jobs = await db.collection(JOBS_COLLECTION).find({}).sort({ createdAt: -1 }).toArray();
    return jobs.map(item => ({
      ...item,
      _id: item._id.toString(),
    } as CareerJob));
  } catch (e) {
    return [];
  }
}

export async function createJob(formData: FormData) {
  const title = formData.get('title') as string;
  const position = formData.get('position') as string;
  const salary = formData.get('salary') as string;
  const experience = formData.get('experience') as string;
  const skills = formData.get('skills') as string;
  const description = formData.get('description') as string;
  const lang = formData.get('lang') as string;

  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  
  await db.collection(JOBS_COLLECTION).insertOne({
    title,
    position,
    salary,
    experience,
    skills,
    description,
    lang,
    status: 'active',
    createdAt: new Date().toISOString(),
  });

  revalidateTag('jobs');
  revalidatePath('/[lang]/career', 'page');
  revalidatePath('/cms/career');
}

export async function deleteJob(id: string) {
  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  await db.collection(JOBS_COLLECTION).deleteOne({ _id: new ObjectId(id) });
  revalidateTag('jobs');
  revalidatePath('/[lang]/career', 'page');
}

// --- APPLICATION MANAGEMENT ---

export async function submitApplication(formData: FormData) {
  const jobId = formData.get('jobId') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const currentSalary = formData.get('currentSalary') as string;
  const expectedSalary = formData.get('expectedSalary') as string;
  const openNegotiation = formData.get('openNegotiation') === 'true';
  const cvFile = formData.get('cv') as File;

  if (!cvFile || cvFile.size === 0) throw new Error("CV file is required");
  if (cvFile.size > 2 * 1024 * 1024) throw new Error("CV must be less than 2MB");

  const bytes = await cvFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const cvData = `data:${cvFile.type};base64,${buffer.toString('base64')}`;

  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  
  await db.collection(APPS_COLLECTION).insertOne({
    jobId,
    name,
    email,
    phone,
    currentSalary,
    expectedSalary,
    openNegotiation,
    cvData,
    cvName: cvFile.name,
    appliedAt: new Date().toISOString(),
  });

  revalidatePath('/cms/career');
  return { success: true };
}

export async function getApplications() {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const apps = await db.collection(APPS_COLLECTION).find({}).sort({ appliedAt: -1 }).toArray();
    
    // Join with job title
    const jobs = await db.collection(JOBS_COLLECTION).find({}).toArray();
    
    return apps.map(app => {
      const job = jobs.find(j => j._id.toString() === app.jobId);
      return {
        ...app,
        _id: app._id.toString(),
        jobTitle: job ? job.title : 'Deleted Position'
      };
    });
  } catch (e) {
    return [];
  }
}

export async function deleteApplication(id: string) {
  const client = await clientPromise;
  const db = client.db(DATABASE_NAME);
  await db.collection(APPS_COLLECTION).deleteOne({ _id: new ObjectId(id) });
  revalidatePath('/cms/career');
}
