
'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { Jodit } from 'jodit';
import { getNews, createNews, deleteNews } from './actions';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Globe, Tag, Key, Image as ImageIcon } from 'lucide-react';
import MediaPicker from '@/components/cms/media-picker';
import Image from 'next/image';
import Swal from 'sweetalert2';

const JoditEditor = dynamic(() => import('jodit-react'), { 
  ssr: false,
  loading: () => <div className="h-[450px] w-full bg-secondary/20 animate-pulse rounded-md flex items-center justify-center">Loading Editor...</div>
});

export default function NewsManagement() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<{id: string, data: string} | null>(null);

  const editorConfig = useMemo(() => (({
    readonly: false,
    placeholder: 'Mulai tulis konten berita Anda di sini...',
    height: 450,
    width: '100%',
    toolbarButtonSize: 'middle' as const,
    theme: 'default',
    enableDragAndDropFileToEditor: true,
    saveModeInCookie: false,
    spellcheck: true,
    editorCssClass: 'prose max-w-none',
    triggerChangeEvent: true,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: 'insert_as_html',
    processPasteHTML: true,
    cleanHTML: { fillEmptyParagraph: false, denyTags: '' },
    buttons: [
      'source', '|', 'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', '|', 'outdent', 'indent', '|', 'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'table', 'link', '|', 'align', 'undo', 'redo', '|', 'hr', 'eraser', 'copyformat', 'fullsize'
    ] as const,
    uploader: { insertImageAsBase64URI: true }
  }) as any), []);

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

  const handleAddNews = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedImage) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Silakan pilih gambar sampul terlebih dahulu.' });
      return;
    }
    if (!content || content === '<p><br></p>') {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Konten berita tidak boleh kosong.' });
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append('content', content); 
    formData.append('imageId', selectedImage.id);

    try {
      await createNews(formData);
      Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Berita telah berhasil diterbitkan.' });
      setIsDialogOpen(false);
      setContent('');
      setSelectedImage(null);
      loadNews();
    } catch (error: any) {
      Swal.fire({ icon: 'error', title: 'Gagal', text: error.message || 'Terjadi kesalahan saat menerbitkan berita.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Berita yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await deleteNews(id);
        Swal.fire('Terhapus!', 'Berita telah dihapus.', 'success');
        loadNews();
      } catch (e) {
        Swal.fire('Gagal!', 'Tidak dapat menghapus berita.', 'error');
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
          <h2 className="text-3xl font-headline font-bold">News Management</h2>
          <p className="text-muted-foreground">Manage announcements and latest updates.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add News
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl overflow-y-auto max-h-[95vh]">
            <DialogHeader>
              <DialogTitle>Create New News Article</DialogTitle>
              <DialogDescription className="hidden">Form to create or edit news articles with title, content, and media</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddNews} className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Language</label>
                  <select name="lang" className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-primary outline-none" required>
                    <option value="en">English (EN)</option>
                    <option value="id">Indonesia (ID)</option>
                    <option value="zh">中文 (ZH)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-primary" /> Cover Image
                  </label>
                  <MediaPicker 
                    onSelect={(id, data) => setSelectedImage({id, data})} 
                    currentValue={selectedImage?.id}
                  />
                  {selectedImage && (
                    <div className="mt-2 relative h-20 w-32 rounded border overflow-hidden">
                      <Image src={selectedImage.data} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Title</label>
                <Input name="title" placeholder="News title..." required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary" /> Tags (Comma separated)
                  </label>
                  <Input name="tags" placeholder="e.g. iot, business" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Key className="w-4 h-4 text-primary" /> SEO Keywords
                  </label>
                  <Input name="keywords" placeholder="Search keywords..." />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Summary (Excerpt)</label>
                <Input name="excerpt" placeholder="Short description for the list view..." required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Main Content</label>
                <div className="border rounded-md overflow-hidden bg-white text-black min-h-[450px]">
                  <JoditEditor
                    value={content}
                    config={editorConfig}
                    onBlur={newContent => setContent(newContent)}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Publish News'}
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
                <TableHead className="font-bold">Title</TableHead>
                <TableHead className="font-bold">Language</TableHead>
                <TableHead className="font-bold">Date</TableHead>
                <TableHead className="text-right font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground">Loading news...</TableCell></TableRow>
              ) : news.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground font-medium">No news published yet.</TableCell></TableRow>
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
