
'use client';

import { useEffect, useState } from 'react';
import { getInvestorResources, createInvestorResource, deleteInvestorResource } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Upload, AlertCircle, FileText, Globe } from 'lucide-react';
import Swal from 'sweetalert2';

export default function InvestorResourceManagement() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const data = await getInvestorResources();
      setResources(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);
    if (file) {
      if (file.type !== 'application/pdf') {
        setFileError("Hanya file PDF yang diizinkan.");
        e.target.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFileError("Ukuran file melebihi 5MB.");
        e.target.value = '';
      }
    }
  };

  const handleAddResource = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileError) {
      Swal.fire({ icon: 'error', title: 'Kesalahan File', text: fileError });
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      await createInvestorResource(formData);
      Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Laporan investor baru telah diterbitkan.' });
      setIsDialogOpen(false);
      loadResources();
    } catch (error: any) {
      Swal.fire({ icon: 'error', title: 'Gagal', text: error.message || "Gagal mengunggah dokumen." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Hapus Dokumen?',
      text: "Data ini akan hilang dari halaman publik.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await deleteInvestorResource(id);
        Swal.fire('Terhapus!', 'File telah dihapus dari sistem.', 'success');
        loadResources();
      } catch (e) {
        Swal.fire('Gagal!', 'Terjadi kesalahan sistem.', 'error');
      }
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-headline font-bold">Investor Resources</h2>
          <p className="text-muted-foreground">Kelola laporan keuangan dan dokumen hubungan investor.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Unggah Dokumen
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Unggah Laporan Investor (PDF)</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddResource} className="space-y-6 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Bahasa Dokumen</label>
                <select name="lang" className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="en">English (EN)</option>
                  <option value="id">Indonesia (ID)</option>
                  <option value="zh">中文 (ZH)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Judul Dokumen</label>
                <Input name="title" placeholder="Misal: Annual Report Q3 2024" required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Upload className="w-4 h-4 text-primary" /> File PDF (Maks 5MB)
                </label>
                <Input 
                  name="pdf" 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleFileChange}
                  required 
                />
                {fileError && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" /> {fileError}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={isSubmitting || !!fileError}>
                {isSubmitting ? 'Sedang Memproses...' : 'Terbitkan Dokumen'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-md border-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-secondary/30">
              <TableRow>
                <TableHead className="font-bold">Judul Dokumen</TableHead>
                <TableHead className="font-bold">Bahasa</TableHead>
                <TableHead className="font-bold">Ukuran</TableHead>
                <TableHead className="text-right font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground">Memuat daftar dokumen...</TableCell></TableRow>
              ) : resources.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground font-medium">Belum ada laporan yang diunggah.</TableCell></TableRow>
              ) : (
                resources.map((item) => (
                  <TableRow key={item._id} className="hover:bg-secondary/10 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        {item.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs uppercase font-bold">
                        <Globe className="w-3 h-3" />
                        {item.lang}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs font-mono">{formatSize(item.fileSize)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(item._id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
