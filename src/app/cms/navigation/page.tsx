'use client';

import { useEffect, useState } from 'react';
import { getNavLinks, saveNavLink, deleteNavLink, reorderNavLinks } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Edit, MoveUp, MoveDown, Globe, ExternalLink, Menu, LayoutPanelTop } from 'lucide-react';
import Swal from 'sweetalert2';

export default function NavigationManagement() {
  const [lang, setLang] = useState('en');
  const [type, setType] = useState<'navbar' | 'footer'>('navbar');
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLink, setEditingId] = useState<any>(null);

  useEffect(() => {
    loadLinks();
  }, [lang, type]);

  const loadLinks = async () => {
    setLoading(true);
    const data = await getNavLinks(lang, type);
    setLinks(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('lang', lang);
    formData.append('type', type);
    if (editingLink) formData.append('id', editingLink._id);

    await saveNavLink(formData);
    setIsDialogOpen(false);
    setEditingId(null);
    loadLinks();
    Swal.fire('Success', 'Navigation updated', 'success');
  };

  const handleDelete = async (id: string) => {
    const res = await Swal.fire({ title: 'Delete link?', icon: 'warning', showCancelButton: true });
    if (res.isConfirmed) {
      await deleteNavLink(id);
      loadLinks();
    }
  };

  const move = async (index: number, direction: 'up' | 'down') => {
    const newLinks = [...links];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= newLinks.length) return;
    [newLinks[index], newLinks[target]] = [newLinks[target], newLinks[index]];
    setLinks(newLinks);
    await reorderNavLinks(newLinks.map(l => l._id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-headline font-bold">Navigation Management</h2>
          <p className="text-muted-foreground">Manage global links for Navbar and Footer.</p>
        </div>
        <div className="flex gap-4">
          <select value={lang} onChange={e => setLang(e.target.value)} className="h-10 px-3 rounded-md border bg-background text-sm">
            <option value="en">English</option>
            <option value="id">Indonesia</option>
            <option value="zh">中文</option>
          </select>
          <Dialog open={isDialogOpen} onOpenChange={(v) => { setIsDialogOpen(v); if(!v) setEditingId(null); }}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus className="w-4 h-4" /> Add Link</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingLink ? 'Edit Link' : 'Add New Link'}</DialogTitle>
                <DialogDescription className="hidden">Form to add or edit navigation menu items</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Label</label>
                  <Input name="title" defaultValue={editingLink?.title} placeholder="e.g. Services" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">URL / Path</label>
                  <Input name="href" defaultValue={editingLink?.href} placeholder="e.g. /en/services or https://..." required />
                </div>
                <Button type="submit" className="w-full">{editingLink ? 'Update' : 'Save'} Link</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={type} onValueChange={(v: any) => setType(v)} className="w-full">
        <TabsList className="grid w-full max-w-sm grid-cols-2">
          <TabsTrigger value="navbar" className="gap-2"><LayoutPanelTop className="w-4 h-4" /> Navbar</TabsTrigger>
          <TabsTrigger value="footer" className="gap-2"><Menu className="w-4 h-4" /> Footer</TabsTrigger>
        </TabsList>

        <TabsContent value={type} className="mt-6">
          <Card className="shadow-md border-0">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow>
                  <TableHead className="w-12">Order</TableHead>
                  <TableHead>Label</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-10">Loading links...</TableCell></TableRow>
                ) : links.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-10">No links found for this section.</TableCell></TableRow>
                ) : (
                  links.map((link, idx) => (
                    <TableRow key={link._id}>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => move(idx, 'up')} disabled={idx === 0}><MoveUp className="w-3 h-3"/></Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => move(idx, 'down')} disabled={idx === links.length - 1}><MoveDown className="w-3 h-3"/></Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold">{link.title}</TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{link.href}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => { setEditingId(link); setIsDialogOpen(true); }}><Edit className="w-4 h-4"/></Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(link._id)}><Trash2 className="w-4 h-4"/></Button>
                        </div>
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
