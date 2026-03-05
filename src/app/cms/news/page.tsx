'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { getNews, createNews, deleteNews } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Globe, Upload, AlertCircle, Tag, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Load Jodit dynamically to avoid SSR issues
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

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
    placeholder: 'Start writing your news content here...',
    height: 400,
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', '|',
      'outdent', 'indent', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'table', 'link', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'fullsize'
    ],
  }), []);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const data = await getNews();
    setNews(data);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);
    if (file && file.size > 1024 * 1024) {
      setFileError("File size exceeds 1MB. Please choose a smaller image.");
      e.target.value = '';
    }
  };

  const handleAddNews = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileError) return;

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append('content', content); // Add Jodit content

    try {
      await createNews(formData);
      toast({ title: "News Created", description: "Successfully added new insight news." });
      setIsDialogOpen(false);
      setContent('');
      loadNews();
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Error", 
        description: error.message || "Failed to create news." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this news item?')) {
      await deleteNews(id);
      toast({ title: "News Deleted", description: "Successfully removed the news item." });
      loadNews();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-headline font-bold">News Management</h2>
          <p className="text-muted-foreground">Manage your insight news articles with SEO features.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add News Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Add New News Article</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddNews} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <select name="lang" className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-primary outline-none" required>
                    <option value="en">English</option>
                    <option value="id">Indonesia</option>
                    <option value="zh">中文</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Cover Image (Max 1MB)
                  </label>
                  <Input 
                    name="image" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    required 
                  />
                  {fileError && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {fileError}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input name="title" placeholder="News Title" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Tag className="w-4 h-4" /> Tags (Comma separated)
                  </label>
                  <Input name="tags" placeholder="tech, iot, enterprise" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Key className="w-4 h-4" /> SEO Keywords
                  </label>
                  <Input name="keywords" placeholder="Keywords for search engines" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Excerpt</label>
                <Input name="excerpt" placeholder="Short summary for the list view" required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Full Content</label>
                <div className="border rounded-md overflow-hidden bg-white text-black">
                  <JoditEditor
                    value={content}
                    config={editorConfig}
                    onBlur={newContent => setContent(newContent)}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting || !!fileError}>
                {isSubmitting ? 'Creating...' : 'Create Article'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center py-10">Loading articles...</TableCell></TableRow>
              ) : news.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center py-10">No news articles found.</TableCell></TableRow>
              ) : (
                news.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 bg-secondary px-2 py-1 rounded text-xs uppercase font-bold">
                        <Globe className="w-3 h-3" />
                        {item.lang}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
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