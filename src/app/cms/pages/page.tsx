'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { getPages, createPage, updatePage, deletePage } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Edit, Globe, ExternalLink, Layout, Type, Image as ImageIcon, MonitorOff, Loader2, MousePointer2, MessageSquarePlus, X, MoveUp, MoveDown } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import MediaPicker from '@/components/cms/media-picker';
import Link from 'next/link';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { getMediaById } from '../media/actions';

const JoditEditor = dynamic(() => import('jodit-react'), { 
  ssr: false,
  loading: () => <div className="h-[200px] w-full bg-secondary/20 animate-pulse rounded-md" />
});

export default function PageManagement() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Page Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [lang, setLang] = useState('en');
  const [sections, setSections] = useState<any[]>([]);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);
  const [showInNavbar, setShowInNavbar] = useState(false);
  const [showInFooter, setShowInFooter] = useState(false);

  const editorConfig = useMemo(() => ({
    readonly: false,
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
    cleanHTML: { fillEmptyParagraph: false, denyTags: "" },
    buttons: [
      'source', '|', 'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', '|', 'outdent', 'indent', '|', 'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'table', 'link', '|', 'align', 'undo', 'redo', '|', 'hr', 'eraser', 'copyformat', 'fullsize'
    ],
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

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setLang('en');
    setSections([]);
    setHideNavbar(false);
    setHideFooter(false);
    setShowInNavbar(false);
    setShowInFooter(false);
  };

  const handleEdit = async (page: any) => {
    setEditingId(page._id);
    setTitle(page.title);
    setSlug(page.slug);
    setDescription(page.description);
    setLang(page.lang);
    setHideNavbar(page.hideNavbar || false);
    setHideFooter(page.hideFooter || false);
    setShowInNavbar(page.showInNavbar || false);
    setShowInFooter(page.showInFooter || false);

    // Resolve image data for sections to show previews in builder
    const resolvedSections = await Promise.all(page.sections.map(async (s: any) => {
      if ((s.type === 'hero' || s.type === 'image') && s.data.imageId) {
        const imageData = await getMediaById(s.data.imageId);
        return { ...s, data: { ...s.data, imageData } };
      }
      return s;
    }));

    setSections(resolvedSections);
    setIsDialogOpen(true);
  };

  const addSection = (type: 'hero' | 'text' | 'image' | 'button' | 'faq') => {
    const newSection = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data: type === 'hero' ? { title: '', subtitle: '', imageId: '', imageData: '', cta: '' } :
            type === 'text' ? { content: '' } :
            type === 'image' ? { imageId: '', imageData: '', caption: '' } :
            type === 'button' ? { text: 'Klik Di Sini', link: '#', variant: 'default', align: 'center' } :
            { title: 'Pertanyaan Umum', items: [{ id: Date.now(), question: '', answer: '' }] }
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    setSections(newSections);
  };

  const updateSectionData = (id: string, newData: any) => {
    setSections(sections.map(s => s.id === id ? { ...s, data: { ...s.data, ...newData } } : s));
  };

  const handleAddFaqItem = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    const newItems = [...section.data.items, { id: Date.now(), question: '', answer: '' }];
    updateSectionData(sectionId, { items: newItems });
  };

  const handleRemoveFaqItem = (sectionId: string, itemId: number) => {
    const section = sections.find(s => s.id === sectionId);
    const newItems = section.data.items.filter((i: any) => i.id !== itemId);
    updateSectionData(sectionId, { items: newItems });
  };

  const handleUpdateFaqItem = (sectionId: string, itemId: number, field: string, value: string) => {
    const section = sections.find(s => s.id === sectionId);
    const newItems = section.data.items.map((i: any) => i.id === itemId ? { ...i, [field]: value } : i);
    updateSectionData(sectionId, { items: newItems });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sections.length === 0) {
      Swal.fire({ icon: 'warning', title: 'Halaman Kosong', text: 'Tambahkan setidaknya satu section.' });
      return;
    }

    setIsSubmitting(true);
    
    // Cleanup preview data before saving
    const cleanedSections = sections.map(s => {
      if (s.data && s.data.imageData) {
        const { imageData, ...restData } = s.data;
        return { ...s, data: restData };
      }
      return s;
    });

    const formData = new FormData();
    formData.append('title', title);
    formData.append('slug', slug);
    formData.append('description', description);
    formData.append('lang', lang);
    formData.append('sections', JSON.stringify(cleanedSections));
    formData.append('hideNavbar', hideNavbar.toString());
    formData.append('hideFooter', hideFooter.toString());
    formData.append('showInNavbar', showInNavbar.toString());
    formData.append('showInFooter', showInFooter.toString());

    try {
      if (editingId) {
        await updatePage(editingId, formData);
        Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Halaman telah diperbarui.' });
      } else {
        await createPage(formData);
        Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Halaman baru telah diterbitkan.' });
      }
      setIsDialogOpen(false);
      resetForm();
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
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await deletePage(id);
        Swal.fire('Terhapus!', 'Halaman telah dihapus.', 'success');
        loadPages();
      } catch (e) {
        Swal.fire('Gagal!', 'Gagal menghapus halaman.', 'error');
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
          <h2 className="text-3xl font-headline font-bold">Modular Page Builder</h2>
          <p className="text-muted-foreground">Desain halaman headless dengan susunan komponen fleksibel.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(val) => { setIsDialogOpen(val); if(!val) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Create New Page</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] w-[1200px] h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Page' : 'Create New Page'}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
              {/* Left Column: Settings */}
              <div className="space-y-6 lg:border-r lg:pr-8">
                <div className="space-y-4">
                  <h3 className="font-bold border-b pb-2 flex items-center gap-2"><Layout className="w-4 h-4" /> Basic Info</h3>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <select 
                      name="lang" 
                      className="w-full h-10 px-3 rounded-md border text-sm bg-background" 
                      value={lang}
                      onChange={e => setLang(e.target.value)}
                      required
                    >
                      <option value="en">English</option>
                      <option value="id">Indonesia</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Title (H1)</Label>
                    <Input 
                      name="title" 
                      placeholder="Halaman Promo..." 
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL Slug</Label>
                    <Input 
                      name="slug" 
                      placeholder="misal: promo-special" 
                      value={slug}
                      onChange={e => setSlug(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>SEO Description</Label>
                    <Input 
                      name="description" 
                      placeholder="Metadata..." 
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h3 className="font-bold border-b pb-2 flex items-center gap-2"><MonitorOff className="w-4 h-4" /> Display Settings</h3>
                  <div className="flex items-center justify-between">
                    <Label>Hide Header/Navbar</Label>
                    <Switch checked={hideNavbar} onCheckedChange={setHideNavbar} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Hide Footer</Label>
                    <Switch checked={hideFooter} onCheckedChange={setHideFooter} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show in Main Menu</Label>
                    <Switch checked={showInNavbar} onCheckedChange={setShowInNavbar} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show in Footer Menu</Label>
                    <Switch checked={showInFooter} onCheckedChange={setShowInFooter} />
                  </div>
                </div>
              </div>

              {/* Right Column: Sections Builder */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between sticky top-0 bg-background z-20 pb-4 border-b">
                  <h3 className="font-bold flex items-center gap-2 text-xl"><Layout className="w-5 h-5 text-primary" /> Page Sections</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => addSection('hero')} className="gap-1"><Layout className="w-3 h-3" /> + Hero</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addSection('text')} className="gap-1"><Type className="w-3 h-3" /> + Text</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addSection('image')} className="gap-1"><ImageIcon className="w-3 h-3" /> + Image</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addSection('button')} className="gap-1"><MousePointer2 className="w-3 h-3" /> + Button</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addSection('faq')} className="gap-1"><MessageSquarePlus className="w-3 h-3" /> + FAQ</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {sections.length === 0 ? (
                    <div className="border-2 border-dashed rounded-xl py-20 text-center text-muted-foreground bg-secondary/10">
                      Belum ada konten. Gunakan tombol di atas untuk menambah section.
                    </div>
                  ) : (
                    sections.map((s, idx) => (
                      <Card key={s.id} className="relative group overflow-hidden border-2 hover:border-primary/30 transition-colors shadow-sm">
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <Button type="button" variant="secondary" size="icon" className="h-7 w-7" onClick={() => moveSection(idx, 'up')}><MoveUp className="w-3 h-3"/></Button>
                          <Button type="button" variant="secondary" size="icon" className="h-7 w-7" onClick={() => moveSection(idx, 'down')}><MoveDown className="w-3 h-3"/></Button>
                          <Button type="button" variant="destructive" size="icon" className="h-7 w-7" onClick={() => removeSection(s.id)}><Trash2 className="w-3 h-3"/></Button>
                        </div>
                        
                        <CardHeader className="bg-secondary/30 py-2 px-4 flex-row items-center gap-2 border-b">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary">{s.type} Section</span>
                        </CardHeader>
                        
                        <CardContent className="p-4 space-y-4">
                          {s.type === 'hero' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-xs">Hero Title</Label>
                                <Input value={s.data.title} onChange={e => updateSectionData(s.id, { title: e.target.value })} placeholder="Headline..." />
                                <Label className="text-xs">Subtitle</Label>
                                <Input value={s.data.subtitle} onChange={e => updateSectionData(s.id, { subtitle: e.target.value })} placeholder="Subheadline..." />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-xs">Background Image</Label>
                                <MediaPicker 
                                  onSelect={(id, data) => updateSectionData(s.id, { imageId: id, imageData: data })} 
                                  currentValue={s.data.imageId}
                                />
                                {s.data.imageData && (
                                  <div className="relative h-20 w-full rounded border overflow-hidden mt-2">
                                    <Image src={s.data.imageData} alt="Preview" fill className="object-cover" />
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {s.type === 'text' && (
                            <div className="bg-white rounded-md border overflow-hidden">
                              <JoditEditor 
                                value={s.data.content} 
                                config={editorConfig}
                                onBlur={val => updateSectionData(s.id, { content: val })} 
                              />
                            </div>
                          )}

                          {s.type === 'image' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="md:col-span-1">
                                <Label className="text-xs mb-2 block">Select Image</Label>
                                <MediaPicker 
                                  onSelect={(id, data) => updateSectionData(s.id, { imageId: id, imageData: data })} 
                                  currentValue={s.data.imageId}
                                />
                              </div>
                              <div className="md:col-span-2">
                                <Label className="text-xs">Caption / Alt Text</Label>
                                <Input value={s.data.caption} onChange={e => updateSectionData(s.id, { caption: e.target.value })} placeholder="Keterangan gambar..." />
                                {s.data.imageData && (
                                  <div className="relative h-32 w-full rounded border overflow-hidden mt-2">
                                    <Image src={s.data.imageData} alt="Preview" fill className="object-cover" />
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {s.type === 'button' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-xs">Button Label</Label>
                                <Input value={s.data.text} onChange={e => updateSectionData(s.id, { text: e.target.value })} placeholder="e.g. Hubungi Kami" />
                                <Label className="text-xs">Button Link</Label>
                                <Input value={s.data.link} onChange={e => updateSectionData(s.id, { link: e.target.value })} placeholder="e.g. /id/contact atau https://..." />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-xs">Alignment</Label>
                                <select 
                                  className="w-full h-10 px-3 rounded-md border text-sm bg-background"
                                  value={s.data.align}
                                  onChange={e => updateSectionData(s.id, { align: e.target.value })}
                                >
                                  <option value="left">Left</option>
                                  <option value="center">Center</option>
                                  <option value="right">Right</option>
                                </select>
                                <Label className="text-xs mt-2 block">Style Variant</Label>
                                <select 
                                  className="w-full h-10 px-3 rounded-md border text-sm bg-background"
                                  value={s.data.variant}
                                  onChange={e => updateSectionData(s.id, { variant: e.target.value })}
                                >
                                  <option value="default">Primary (Blue)</option>
                                  <option value="secondary">Secondary (Gray)</option>
                                  <option value="outline">Outline</option>
                                </select>
                              </div>
                            </div>
                          )}

                          {s.type === 'faq' && (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label className="text-xs">Section Title</Label>
                                <Input value={s.data.title} onChange={e => updateSectionData(s.id, { title: e.target.value })} placeholder="FAQ Title..." />
                              </div>
                              <div className="space-y-3">
                                {s.data.items.map((item: any, itemIdx: number) => (
                                  <div key={item.id} className="p-4 bg-secondary/20 rounded-lg border space-y-2 relative">
                                    <Button 
                                      type="button" 
                                      variant="ghost" 
                                      size="icon" 
                                      className="absolute top-1 right-1 h-6 w-6 text-destructive" 
                                      onClick={() => handleRemoveFaqItem(s.id, item.id)}
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                    <Label className="text-[10px] font-bold">Question {itemIdx + 1}</Label>
                                    <Input 
                                      value={item.question} 
                                      onChange={e => handleUpdateFaqItem(s.id, item.id, 'question', e.target.value)} 
                                      placeholder="Pertanyaan..."
                                    />
                                    <Label className="text-[10px] font-bold">Answer</Label>
                                    <textarea 
                                      className="w-full min-h-[80px] p-2 rounded-md border text-sm bg-background" 
                                      value={item.answer} 
                                      onChange={e => handleUpdateFaqItem(s.id, item.id, 'answer', e.target.value)} 
                                      placeholder="Jawaban..."
                                    />
                                  </div>
                                ))}
                                <Button type="button" variant="outline" className="w-full gap-2 text-xs" onClick={() => handleAddFaqItem(s.id)}>
                                  <Plus className="w-3 h-3" /> Add FAQ Item
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>

                <Button type="submit" className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {editingId ? 'Updating...' : 'Publishing...'}
                    </>
                  ) : editingId ? 'Update Modular Page' : 'Publish Modular Page'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-md border-0">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow>
              <TableHead className="font-bold">Page Title</TableHead>
              <TableHead className="font-bold">Public URL</TableHead>
              <TableHead className="font-bold">Nav Menu</TableHead>
              <TableHead className="font-bold">Lang</TableHead>
              <TableHead className="text-right font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-20">Loading builder pages...</TableCell></TableRow>
            ) : pages.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-20">No modular pages found.</TableCell></TableRow>
            ) : (
              pages.map((item) => (
                <TableRow key={item._id} className="hover:bg-secondary/10">
                  <TableCell className="font-bold">{item.title}</TableCell>
                  <TableCell className="text-xs font-mono">/p/{item.slug}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {item.showInNavbar && <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold">NAV</span>}
                      {item.showInFooter && <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold">FOOTER</span>}
                    </div>
                  </TableCell>
                  <TableCell><span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold">{item.lang.toUpperCase()}</span></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild title="View Live"><Link href={`/${item.lang}/p/${item.slug}`} target="_blank"><ExternalLink className="w-4 h-4"/></Link></Button>
                      <Button variant="ghost" size="icon" className="text-primary hover:text-primary hover:bg-primary/10" onClick={() => handleEdit(item)} title="Edit Page">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(item._id)} title="Delete Page">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
