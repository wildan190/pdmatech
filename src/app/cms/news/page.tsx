'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { getNews, createNews, deleteNews } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Globe, Upload, AlertCircle, Tag, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Load Jodit secara dinamis untuk menghindari masalah SSR di Next.js
const JoditEditor = dynamic(() => import('jodit-react'), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-secondary/20 animate-pulse rounded-md flex items-center justify-center">Loading Editor...</div>
});

export default function NewsManagement() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const { toast } = useToast();

  const editorConfig = useMemo(() => ({
    readonly: false,
    placeholder: 'Mulai tulis konten berita Anda di sini...',
    height: 450,
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
    cleanHTML: {
      fillEmptyParagraph: false,
      denyTags: ""
    },
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
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const data = await getNews();
      setNews(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);
    if (file && file.size > 1024 * 1024) {
      setFileError("Ukuran file melebihi 1MB. Silakan pilih gambar yang lebih kecil.");
      e.target.value = '';
    }
  };

  const handleAddNews = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileError) return;
    if (!content || content === '<p><br></p>') {
      toast({ variant: "destructive", title: "Konten Kosong", description: "Silakan isi konten berita." });
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append('content', content); 

    try {
      await createNews(formData);
      toast({ title: "Berita Berhasil Dibuat", description: "Artikel wawasan baru telah ditambahkan." });
      setIsDialogOpen(false);
      setContent('');
      loadNews();
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Gagal", 
        description: error.message || "Gagal membuat berita." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      await deleteNews(id);
      toast({ title: "Berita Dihapus", description: "Artikel telah dihapus dari sistem." });
      loadNews();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-headline font-bold">Manajemen Berita</h2>
          <p className="text-muted-foreground">Kelola artikel berita dan wawasan dengan fitur SEO lengkap.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Tambah Artikel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl overflow-y-auto max-h-[95vh]">
            <DialogHeader>
              <DialogTitle>Buat Artikel Berita Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddNews} className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Bahasa Konten</label>
                  <select name="lang" className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-primary outline-none" required>
                    <option value="en">English (EN)</option>
                    <option value="id">Indonesia (ID)</option>
                    <option value="zh">中文 (ZH)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Upload className="w-4 h-4 text-primary" /> Foto Sampul (Maks 1MB)
                  </label>
                  <Input 
                    name="image" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    required 
                  />
                  {fileError && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3" /> {fileError}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Judul Artikel</label>
                <Input name="title" placeholder="Masukkan judul yang menarik..." required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary" /> Tag (Pisahkan dengan koma)
                  </label>
                  <Input name="tags" placeholder="contoh: teknologi, iot, bisnis" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Key className="w-4 h-4 text-primary" /> Kata Kunci SEO
                  </label>
                  <Input name="keywords" placeholder="Keyword untuk mesin pencari..." />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Ringkasan (Excerpt)</label>
                <Input name="excerpt" placeholder="Ringkasan singkat untuk tampilan daftar..." required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Konten Utama</label>
                <div className="border rounded-md overflow-hidden bg-white text-black min-h-[450px]">
                  <JoditEditor
                    value={content}
                    config={editorConfig}
                    onBlur={newContent => setContent(newContent)}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground italic">*Gunakan toolbar untuk format teks, tabel, dan gambar.</p>
              </div>

              <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={isSubmitting || !!fileError}>
                {isSubmitting ? 'Sedang Memproses...' : 'Terbitkan Artikel'}
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
                <TableHead className="font-bold">Judul Artikel</TableHead>
                <TableHead className="font-bold">Bahasa</TableHead>
                <TableHead className="font-bold">Tanggal Terbit</TableHead>
                <TableHead className="text-right font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground">Memuat daftar berita...</TableCell></TableRow>
              ) : news.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground font-medium">Belum ada berita yang diterbitkan.</TableCell></TableRow>
              ) : (
                news.map((item) => (
                  <TableRow key={item._id} className="hover:bg-secondary/10 transition-colors">
                    <TableCell className="font-medium max-w-md truncate">{item.title}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs uppercase font-bold border border-primary/20">
                        <Globe className="w-3 h-3" />
                        {item.lang}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
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
