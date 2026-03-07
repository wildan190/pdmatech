'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { getJobs, createJob, deleteJob, getApplications, deleteApplication } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Briefcase, Users, Download, FileText, Globe, DollarSign, Award, Settings } from 'lucide-react';
import Swal from 'sweetalert2';

const JoditEditor = dynamic(() => import('jodit-react'), { 
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-secondary/20 animate-pulse rounded-md flex items-center justify-center">Loading Editor...</div>
});

export default function CareerManagement() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState('');

  const editorConfig = useMemo(() => ({
    readonly: false,
    placeholder: 'Write the job description and requirements...',
    height: 350,
    toolbarButtonSize: "middle",
    buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', 'paragraph', '|', 'table', 'link', '|', 'undo', 'redo']
  }), []);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [jobsData, appsData] = await Promise.all([getJobs(), getApplications()]);
      setJobs(jobsData);
      setApplications(appsData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description || description === '<p><br></p>') {
      Swal.fire('Error', 'Job description cannot be empty', 'error');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append('description', description);

    try {
      await createJob(formData);
      Swal.fire('Success', 'Job opening posted successfully!', 'success');
      setIsDialogOpen(false);
      setDescription('');
      loadData();
    } catch (error: any) {
      Swal.fire('Error', error.message || 'Failed to save job', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    const result = await Swal.fire({
      title: 'Delete Job?',
      text: "This will also affect public career page.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      await deleteJob(id);
      Swal.fire('Deleted!', 'Job has been removed.', 'success');
      loadData();
    }
  };

  const handleDeleteApp = async (id: string) => {
    const result = await Swal.fire({
      title: 'Delete Application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete'
    });

    if (result.isConfirmed) {
      await deleteApplication(id);
      Swal.fire('Deleted!', 'Applicant data removed.', 'success');
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-headline font-bold">Career Management</h2>
          <p className="text-muted-foreground">Manage your team growth and talent acquisition.</p>
        </div>
      </div>

      <Tabs defaultValue="vacancies" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="vacancies" className="gap-2"><Briefcase className="w-4 h-4" /> Job Vacancies</TabsTrigger>
          <TabsTrigger value="applicants" className="gap-2"><Users className="w-4 h-4" /> Applicants ({applications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="vacancies" className="mt-6 space-y-4">
          <div className="flex justify-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2"><Plus className="w-4 h-4" /> Add New Job</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Post New Job Opportunity</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddJob} className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Language</label>
                      <select name="lang" className="w-full h-10 px-3 rounded-md border bg-background text-sm" required>
                        <option value="en">English (EN)</option>
                        <option value="id">Indonesia (ID)</option>
                        <option value="zh">中文 (ZH)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Job Name / Title</label>
                      <Input name="title" placeholder="e.g. Senior Frontend Developer" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Position / Department</label>
                      <Input name="position" placeholder="e.g. Engineering" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Range Salary</label>
                      <Input name="salary" placeholder="e.g. Rp 10jt - 15jt" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Experience Requirement</label>
                      <Input name="experience" placeholder="e.g. 3 - 5 Years" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Skill Requirement (Comma separated)</label>
                      <Input name="skills" placeholder="e.g. React, Next.js, TypeScript" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Job Description</label>
                    <JoditEditor value={description} config={editorConfig} onBlur={val => setDescription(val)} />
                  </div>
                  <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={isSubmitting}>
                    {isSubmitting ? 'Posting...' : 'Publish Job Opening'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="shadow-md border-0">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow>
                  <TableHead className="font-bold">Job Title</TableHead>
                  <TableHead className="font-bold">Position</TableHead>
                  <TableHead className="font-bold">Salary</TableHead>
                  <TableHead className="font-bold">Language</TableHead>
                  <TableHead className="text-right font-bold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10">Loading jobs...</TableCell></TableRow>
                ) : jobs.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10">No jobs posted.</TableCell></TableRow>
                ) : (
                  jobs.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-bold">{item.title}</TableCell>
                      <TableCell>{item.position}</TableCell>
                      <TableCell className="text-sm font-mono">{item.salary}</TableCell>
                      <TableCell><span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold">{item.lang.toUpperCase()}</span></TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteJob(item._id)}><Trash2 className="w-4 h-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="applicants" className="mt-6">
          <Card className="shadow-md border-0">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow>
                  <TableHead className="font-bold">Candidate</TableHead>
                  <TableHead className="font-bold">Position Applied</TableHead>
                  <TableHead className="font-bold">Expected Salary</TableHead>
                  <TableHead className="font-bold">CV</TableHead>
                  <TableHead className="text-right font-bold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10">Loading applicants...</TableCell></TableRow>
                ) : applications.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10">No applicants yet.</TableCell></TableRow>
                ) : (
                  applications.map((app) => (
                    <TableRow key={app._id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold">{app.name}</span>
                          <span className="text-xs text-muted-foreground">{app.email} • {app.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-primary">{app.jobTitle}</TableCell>
                      <TableCell>
                        <div className="flex flex-col text-xs">
                          <span>Current: {app.currentSalary}</span>
                          <span className="font-bold">Exp: {app.expectedSalary}</span>
                          {app.openNegotiation && <span className="text-[10px] text-green-600 font-bold uppercase">Negotiable</span>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <a href={app.cvData} download={app.cvName}>
                            <Download className="w-3 h-3" /> CV
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteApp(app._id)}><Trash2 className="w-4 h-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
