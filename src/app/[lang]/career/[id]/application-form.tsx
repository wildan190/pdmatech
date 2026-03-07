'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { submitApplication } from '@/app/cms/career/actions';
import { Loader2, CheckCircle2, Upload } from 'lucide-react';
import Swal from 'sweetalert2';

export default function ApplicationForm({ jobId }: { jobId: string }) {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);
    if (file) {
      if (file.type !== 'application/pdf') {
        setFileError("Only PDF files are allowed.");
        e.target.value = '';
      } else if (file.size > 2 * 1024 * 1024) {
        setFileError("File size exceeds 2MB.");
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileError) return;

    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      formData.append('jobId', jobId);

      try {
        const res = await submitApplication(formData);
        if (res.success) {
          setIsSuccess(true);
          Swal.fire({
            icon: 'success',
            title: 'Application Sent!',
            text: 'We have received your application. Our HR team will contact you soon.',
            confirmButtonColor: '#3b82f6'
          });
        }
      } catch (err: any) {
        Swal.fire('Error', err.message || 'Something went wrong', 'error');
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8 space-y-4">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
        <h3 className="text-xl font-bold">Application Received</h3>
        <p className="text-muted-foreground text-sm">Thank you for your interest in joining Micro Padma Nusantara.</p>
        <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>Apply Another</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase text-muted-foreground">Full Name</Label>
        <Input name="name" placeholder="Your full name" required disabled={isPending} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase text-muted-foreground">Email</Label>
          <Input name="email" type="email" placeholder="email@example.com" required disabled={isPending} />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase text-muted-foreground">Phone</Label>
          <Input name="phone" placeholder="+62..." required disabled={isPending} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase text-muted-foreground">Current Salary</Label>
          <Input name="currentSalary" placeholder="e.g. 10.000.000" required disabled={isPending} />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase text-muted-foreground">Expected Salary</Label>
          <Input name="expectedSalary" placeholder="e.g. 15.000.000" required disabled={isPending} />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-xs font-bold uppercase text-muted-foreground">Open Negotiation?</Label>
        <RadioGroup name="openNegotiation" defaultValue="true" className="flex gap-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="r1" />
            <Label htmlFor="r1" className="text-sm cursor-pointer">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="r2" />
            <Label htmlFor="r2" className="text-sm cursor-pointer">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
          <Upload className="w-3 h-3" /> Upload CV (PDF, Max 2MB)
        </Label>
        <Input name="cv" type="file" accept=".pdf" onChange={handleFileChange} required disabled={isPending} className="cursor-pointer file:cursor-pointer" />
        {fileError && <p className="text-[10px] text-destructive font-bold">{fileError}</p>}
      </div>

      <Button type="submit" className="w-full h-12 font-bold" disabled={isPending || !!fileError}>
        {isPending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Processing...</> : 'Submit Application'}
      </Button>
    </form>
  );
}
