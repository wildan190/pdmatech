
'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { getPages, createPage, deletePage } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Globe, ExternalLink, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import Swal from 'sweetalert2';

const JoditEditor = dynamic(() => import('jodit-react'), { 
  ssr: false,
  loading: () => <div className="h-[450px] w-full bg-secondary/20 animate-pulse rounded-md flex items-center justify-center">Loading Editor...</div>
});

export default function PageManagement() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState('');

  const editorConfig = useMemo(() => ({
    readonly: false,
    placeholder: 'Desain konten halaman Anda di sini...',
    height: 500,
    width: '100%',
    toolbarButtonSize: "middle",
    theme: "default",
    enableDragAndDropFileToEditor: true,
    saveModeInCookie: false,
    spellcheck: true,
    editorCssClass: "prose max-w-none",
    triggerChangeEvent: true,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: "insert_as_html",
    processPasteHTML: true,
    buttons: [
      'source', '|',
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', '|',
      'outdent', 'indent', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'table', 'link', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'copyformat', 'fullsize'
    ],
    uploader: {
      insertImageAsBase64URI: true
    }
  }), []);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const data = await getPages();
      setPages(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content || content === '<p><br></p>') {
      Swal.fire({ icon: 'warning', title: 'Konten Kosong', text: 'Silakan isi konten halaman sebelum menyimpan.' });
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append('content', content); 

    try {
      await createPage(formData);
      Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Halaman kustom baru telah dipublikasikan.' });
      setIsDialogOpen(false);
      setContent('');
      loadPages();
    } catch (error: any) {
      Swal.fire({ icon: 'error', title: 'Gagal', text: error.message || 'Terjadi kesalahan sistem.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Hapus Halaman?',
      text: "Tindakan ini permanen dan tidak bisa dibatalkan.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await deletePage(id);
        Swal.fire('Terhapus!', 'Halaman telah dihapus.', 'success');
        loadPages();
      } catch (e) {
        Swal.fire('Gagal!', 'Tidak dapat menghapus halaman.', 'error');
      }
    }
  };

  return (
    <div className="space-y-6">
      <style dangerouslySetInnerHTML={{ __html: `
        .jodit-wysiwyg ul { list-style-type: disc !important; padding-left: 2.5rem !important; margin: 1em 0 !important; }
        .jodit-wysiwyg ol { list-style-type: decimal !important; padding-left: 2.5rem !important; margin: 1em 0 !important; }
        .jodit-wysiwyg li { display: list-item !important; }
        .jodit-wysiwyg table { border-collapse: collapse !important; width: 100% !important; border: 1px solid #ccc !important; }
        .jodit-wysiwyg td, .jodit-wysiwyg th { border: 1px solid #ccc !important; padding: 8px !important; }
      `}} />

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-headline font-bold">Manajemen Halaman</h2>
          <p className="text-muted-foreground">Buat dan kelola halaman kustom dengan struktur dinamis.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Buat Halaman Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl overflow-y-auto max-h-[95vh]">
            <DialogHeader>
              <DialogTitle>Desain Halaman Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddPage} className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Bahasa Halaman</label>
                  <select name="lang" className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-primary" required>
                    <option value="en">English (EN)</option>
                    <option value="id">Indonesia (ID)</option>
                    <option value="zh">中文 (ZH)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-primary" /> Kustom Slug (Opsional)
                  </label>
                  <Input name="slug" placeholder="misal: promo-merdeka-2024" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Judul Halaman (H1)</label>
                <Input name="title" placeholder="Masukkan judul utama halaman..." required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Deskripsi SEO (Meta Description)</label>
                <Input name="description" placeholder="Ringkasan singkat untuk hasil pencarian Google..." required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Konten Halaman</label>
                <div className="border rounded-md overflow-hidden bg-white text-black min-h-[500px]">
                  <JoditEditor
                    value={content}
                    config={editorConfig}
                    onBlur={newContent => setContent(newContent)}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={isSubmitting}>
                {isSubmitting ? 'Sedang Menyimpan...' : 'Publikasikan Halaman'}
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
                <TableHead className="font-bold">Judul Halaman</TableHead>
                <TableHead className="font-bold">URL / Slug</TableHead>
                <TableHead className="font-bold">Bahasa</TableHead>
                <TableHead className="text-right font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground">Memuat daftar halaman...</TableCell></TableRow>
              ) : pages.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground font-medium">Belum ada halaman kustom.</TableCell></TableRow>
              ) : (
                pages.map((item) => (
                  <TableRow key={item._id} className="hover:bg-secondary/10 transition-colors">
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="text-sm font-mono text-muted-foreground">/p/{item.slug}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs uppercase font-bold border border-primary/20">
                        <Globe className="w-3 h-3" />
                        {item.lang}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10" asChild title="Buka Halaman">
                          <Link href={`/${item.lang}/p/${item.slug}`} target="_blank">
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(item._id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
