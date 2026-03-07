
'use server';

import clientPromise from '@/lib/mongodb';
import { google } from 'googleapis';

const DATABASE_NAME = 'mpn_cms';

export async function getSummaryStats() {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);

    const [newsCount, articlesCount, inquiriesCount, applicantsCount] = await Promise.all([
      db.collection('news').countDocuments(),
      db.collection('articles').countDocuments(),
      db.collection('inquiries').countDocuments(),
      db.collection('applications').countDocuments(),
    ]);

    return {
      news: newsCount,
      articles: articlesCount,
      inquiries: inquiriesCount,
      applicants: applicantsCount,
    };
  } catch (error) {
    console.error('Failed to fetch summary stats:', error);
    return { news: 0, articles: 0, inquiries: 0, applicants: 0 };
  }
}

export async function getSearchConsoleData() {
  const authEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const authKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const siteUrl = process.env.GSC_SITE_URL || 'https://mpnsolutions.my.id';

  // Fallback to mock data if env vars are missing
  if (!authEmail || !authKey) {
    console.warn('GSC credentials missing. Returning mock data.');
    return {
      isMock: true,
      performance: [
        { day: 'Mon', clicks: 12, impressions: 450 },
        { day: 'Tue', clicks: 19, impressions: 520 },
        { day: 'Wed', clicks: 15, impressions: 480 },
        { day: 'Thu', clicks: 22, impressions: 610 },
        { day: 'Fri', clicks: 30, impressions: 750 },
        { day: 'Sat', clicks: 25, impressions: 680 },
        { day: 'Sun', clicks: 18, impressions: 500 },
      ],
      totals: { clicks: 151, impressions: 3990, ctr: '3.78%', position: 12.4 }
    };
  }

  try {
    const auth = new google.auth.JWT(
      authEmail,
      undefined,
      authKey,
      ['https://www.googleapis.com/auth/webmasters.readonly']
    );

    const searchconsole = google.webmasters({ version: 'v3', auth });
    
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const res = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['date'],
        rowLimit: 30,
      },
    });

    const rows = res.data.rows || [];
    const performance = rows.map(r => ({
      day: r.keys?.[0] ? new Date(r.keys[0]).toLocaleDateString('en-US', { weekday: 'short' }) : 'Unknown',
      clicks: r.clicks || 0,
      impressions: r.impressions || 0,
    }));

    const totals = rows.reduce((acc, curr) => ({
      clicks: acc.clicks + (curr.clicks || 0),
      impressions: acc.impressions + (curr.impressions || 0),
      position: acc.position + (curr.position || 0)
    }), { clicks: 0, impressions: 0, position: 0 });

    const avgPos = rows.length > 0 ? (totals.position / rows.length).toFixed(1) : 0;
    const ctr = totals.impressions > 0 ? ((totals.clicks / totals.impressions) * 100).toFixed(2) + '%' : '0%';

    return {
      isMock: false,
      performance,
      totals: {
        clicks: totals.clicks,
        impressions: totals.impressions,
        ctr,
        position: avgPos
      }
    };
  } catch (error) {
    console.error('GSC API Error:', error);
    return null;
  }
}
