
'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { Jodit } from 'jodit';
import { getArticles, createArticle, updateArticle, deleteArticle } from './actions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Globe, Tag, Key, Image as ImageIcon, Edit3 } from 'lucide-react';
import MediaPicker from '@/components/cms/media-picker';
import Image from 'next/image';
import Swal from 'sweetalert2';

const JoditEditor = dynamic(() => import('jodit-react'), { 
  ssr: false,
  loading: () => <div className="h-[450px] w-full bg-secondary/20 animate-pulse rounded-md flex items-center justify-center">Loading Editor...</div>
});

export default function ArticleManagement() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<{id: string, data: string} | null>(null);
  const [currentImageId, setCurrentImageId] = useState<string | null>(null);
  const [editingArticle, setEditingArticle] = useState<any | null>(null);
  const [lang, setLang] = useState('en');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [keywords, setKeywords] = useState('');
  const [excerpt, setExcerpt] = useState('');

  const editorConfig = useMemo(() => ({
    readonly: false,
    placeholder: 'Mulai tulis konten artikel Anda di sini...',
    height: 450,
    width: '100%',
    toolbarButtonSize: 'middle' as const,
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
    cleanHTML: { fillEmptyParagraph: false, denyTags: "" },
    buttons: [
      'source', '|', 'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', '|', 'outdent', 'indent', '|', 'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'table', 'link', '|', 'align', 'undo', 'redo', '|', 'hr', 'eraser', 'copyformat', 'fullsize'
    ] as const,
    uploader: { insertImageAsBase64URI: true }
  } as any), []);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingArticle(null);
    setLang('en');
    setTitle('');
    setTags('');
    setKeywords('');
    setExcerpt('');
    setContent('');
    setSelectedImage(null);
    setCurrentImageId(null);
    setIsSubmitting(false);
  };

  const openArticleDialog = (article?: any) => {
    if (!article) {
      resetForm();
      setIsDialogOpen(true);
      return;
    }

    setEditingArticle(article);
    setLang(article.lang || 'en');
    setTitle(article.title || '');
    setTags((article.tags || []).join(', '));
    setKeywords(article.keywords || '');
    setExcerpt(article.excerpt || '');
    setContent(article.content || '');
    setSelectedImage(null);
    setCurrentImageId(article.image || null);
    setIsDialogOpen(true);
  };

  const handleSaveArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageId = selectedImage?.id || currentImageId;
    if (!imageId) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Pilih gambar sampul terlebih dahulu.' });
      return;
    }

    if (!content || content === '<p><br></p>') {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Isi konten artikel tidak boleh kosong.' });
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append('content', content);
    formData.append('imageId', imageId);

    if (editingArticle) {
      formData.append('id', editingArticle._id);
    }

    try {
      if (editingArticle) {
        await updateArticle(formData);
        Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Artikel telah berhasil diperbarui.' });
      } else {
        await createArticle(formData);
        Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Artikel telah berhasil diterbitkan.' });
      }

      setIsDialogOpen(false);
      resetForm();
      loadArticles();
    } catch (error: any) {
      Swal.fire({ icon: 'error', title: 'Gagal', text: error.message || 'Terjadi kesalahan saat menyimpan artikel.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Hapus Artikel?',
      text: "Data yang dihapus tidak dapat dipulihkan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await deleteArticle(id);
        Swal.fire('Terhapus!', 'Artikel telah dihapus.', 'success');
        loadArticles();
      } catch (e) {
        Swal.fire('Gagal!', 'Terjadi kesalahan sistem.', 'error');
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
          <h2 className="text-3xl font-headline font-bold">Article Management</h2>
          <p className="text-muted-foreground">Manage technical insights and educational content.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open) resetForm();
          setIsDialogOpen(open);
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => openArticleDialog()}>
              <Plus className="w-4 h-4" />
              Add Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl overflow-y-auto max-h-[95vh]">
            <DialogHeader>
              <DialogTitle>{editingArticle ? 'Edit Insight Article' : 'Create New Insight Article'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveArticle} className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Language</label>
                  <select
                    name="lang"
                    aria-label="Language"
                    value={lang}
                    onChange={(event) => setLang(event.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-primary outline-none"
                    required
                  >
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
                    onSelect={(id, data) => setSelectedImage({ id, data })}
                    currentValue={selectedImage?.id || currentImageId || ''}
                  />
                  {(selectedImage || currentImageId) && (
                    <div className="mt-2 relative h-20 w-32 rounded border overflow-hidden">
                      <Image
                        src={selectedImage?.data ?? `/api/media/${currentImageId}`}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Title</label>
                <Input
                  name="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Article title..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary" /> Tags (Comma separated)
                  </label>
                  <Input
                    name="tags"
                    value={tags}
                    onChange={(event) => setTags(event.target.value)}
                    placeholder="e.g. tech, education"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Key className="w-4 h-4 text-primary" /> SEO Keywords
                  </label>
                  <Input
                    name="keywords"
                    value={keywords}
                    onChange={(event) => setKeywords(event.target.value)}
                    placeholder="Keywords..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Summary (Excerpt)</label>
                <Input
                  name="excerpt"
                  value={excerpt}
                  onChange={(event) => setExcerpt(event.target.value)}
                  placeholder="Short summary..."
                  required
                />
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
                {isSubmitting ? 'Processing...' : editingArticle ? 'Update Article' : 'Publish Article'}
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
                <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground">Loading articles...</TableCell></TableRow>
              ) : articles.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground font-medium">No articles published yet.</TableCell></TableRow>
              ) : (
                articles.map((item) => (
                  <TableRow key={item._id} className="hover:bg-secondary/10 transition-colors">
                    <TableCell className="font-medium max-w-md truncate">{item.title}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs uppercase font-bold border border-primary/20">
                        <Globe className="w-3 h-3" />
                        {item.lang}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary hover:text-primary/80 hover:bg-primary/10"
                        onClick={() => openArticleDialog(item)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
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
