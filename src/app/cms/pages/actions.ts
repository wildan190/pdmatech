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

export async function getNavigationPages(lang: string, type: 'navbar' | 'footer' = 'navbar') {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const filter: any = { lang };
    if (type === 'navbar') filter.showInNavbar = true;
    if (type === 'footer') filter.showInFooter = true;

    const navPages = await db.collection(COLLECTION_NAME)
      .find(filter)
      .project({ title: true, slug: true })
      .toArray();
    return navPages.map(p => ({ title: p.title, href: `/${lang}/p/${p.slug}` }));
  } catch (e) {
    return [];
  }
}

export async function createPage(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const lang = formData.get('lang') as string;
    const customSlug = formData.get('slug') as string;
    
    const sectionsData = formData.get('sections') as string;
    const sections = JSON.parse(sectionsData || '[]');
    
    const hideNavbar = formData.get('hideNavbar') === 'true';
    const hideFooter = formData.get('hideFooter') === 'true';
    const showInNavbar = formData.get('showInNavbar') === 'true';
    const showInFooter = formData.get('showInFooter') === 'true';

    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    
    let slug = customSlug 
      ? customSlug.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
      : title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const existing = await db.collection(COLLECTION_NAME).findOne({ slug, lang });
    if (existing) {
      slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
    }

    await db.collection(COLLECTION_NAME).insertOne({
      title,
      description,
      lang,
      slug,
      sections,
      hideNavbar,
      hideFooter,
      showInNavbar,
      showInFooter,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    revalidateTag('custom-pages');
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    console.error("Action error [createPage]:", error);
    throw new Error(error.message || "Failed to create page");
  }
}

export async function updatePage(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const lang = formData.get('lang') as string;
    const slug = formData.get('slug') as string;
    
    const sectionsData = formData.get('sections') as string;
    const sections = JSON.parse(sectionsData || '[]');
    
    const hideNavbar = formData.get('hideNavbar') === 'true';
    const hideFooter = formData.get('hideFooter') === 'true';
    const showInNavbar = formData.get('showInNavbar') === 'true';
    const showInFooter = formData.get('showInFooter') === 'true';

    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    
    await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          description,
          lang,
          slug,
          sections,
          hideNavbar,
          hideFooter,
          showInNavbar,
          showInFooter,
          updatedAt: new Date().toISOString(),
        }
      }
    );

    revalidateTag('custom-pages');
    revalidatePath('/', 'layout');
    revalidatePath(`/[lang]/p/${slug}`, 'page');
    return { success: true };
  } catch (error: any) {
    console.error("Action error [updatePage]:", error);
    throw new Error(error.message || "Failed to update page");
  }
}

export async function deletePage(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    // Explicitly targeting only pages collection
    await db.collection('pages').deleteOne({ _id: new ObjectId(id) });
    
    revalidateTag('custom-pages');
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error("Action error [deletePage]:", error);
    throw new Error("Failed to delete page");
  }
}
