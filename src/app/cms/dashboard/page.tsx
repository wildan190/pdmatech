
'use client';

import { useEffect, useState } from 'react';
import { getSummaryStats, getSearchConsoleData } from './actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Newspaper, FileText, Mail, Users, MousePointer2, Eye, LineChart, TrendingUp, AlertTriangle } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [gscData, setGscData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [s, gsc] = await Promise.all([getSummaryStats(), getSearchConsoleData()]);
      setStats(s);
      setGscData(gsc);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground font-medium">Gathering insights...</p>
        </div>
      </div>
    );
  }

  const internalStats = [
    { label: 'Total News', value: stats?.news || 0, icon: <Newspaper className="w-5 h-5" />, color: 'bg-blue-500' },
    { label: 'Total Articles', value: stats?.articles || 0, icon: <FileText className="w-5 h-5" />, color: 'bg-purple-500' },
    { label: 'Active Leads', value: stats?.inquiries || 0, icon: <Mail className="w-5 h-5" />, color: 'bg-green-500' },
    { label: 'Job Applicants', value: stats?.applicants || 0, icon: <Users className="w-5 h-5" />, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-headline font-bold">Dashboard Overview</h2>
          <p className="text-muted-foreground">Monitor your digital growth and operational metrics.</p>
        </div>
      </div>

      {/* Internal Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {internalStats.map((item) => (
          <Card key={item.label} className="border-0 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{item.label}</p>
                  <h3 className="text-3xl font-bold mt-1">{item.value}</h3>
                </div>
                <div className={`${item.color} text-white p-3 rounded-xl shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SEO Performance Chart */}
        <Card className="lg:col-span-2 border-0 shadow-lg bg-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-primary" />
                  Search Visibility
                </CardTitle>
                <CardDescription>Impressions vs Clicks (Last 30 Days)</CardDescription>
              </div>
              {gscData?.isMock && (
                <div className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 border border-yellow-200">
                  <AlertTriangle className="w-3 h-3" /> DEMO DATA
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={gscData?.performance}>
                  <defs>
                    <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}} 
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="impressions" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorImpressions)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fillOpacity={0} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* SEO Metrics List */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                SEO Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                    <MousePointer2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">Total Clicks</span>
                </div>
                <span className="font-bold text-xl">{gscData?.totals.clicks}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/10 text-indigo-600 rounded-lg">
                    <Eye className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">Total Impressions</span>
                </div>
                <span className="font-bold text-xl">{gscData?.totals.impressions}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">Avg. CTR</span>
                </div>
                <span className="font-bold text-xl text-emerald-600">{gscData?.totals.ctr}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 text-orange-600 rounded-lg">
                    <TrendingUp className="w-4 h-4 rotate-90" />
                  </div>
                  <span className="text-sm font-medium">Avg. Position</span>
                </div>
                <span className="font-bold text-xl">{gscData?.totals.position}</span>
              </div>
            </CardContent>
          </Card>

          {gscData?.isMock && (
            <Card className="border-dashed border-2 bg-primary/5">
              <CardContent className="p-6">
                <h4 className="font-bold text-sm text-primary flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Action Required
                </h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Integrate your real Google Search Console data by adding <strong>GOOGLE_SERVICE_ACCOUNT_EMAIL</strong> and <strong>GOOGLE_PRIVATE_KEY</strong> to your environment variables.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
