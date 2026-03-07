
'use client';

import { useEffect, useState } from 'react';
import { getMediaLibrary, deleteFromLibrary, uploadToLibrary } from './actions';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Upload, FileText, Search, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Swal from 'sweetalert2';

export default function MediaManagement() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const data = await getMediaLibrary();
      setMedia(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadToLibrary(formData);
      Swal.fire({ icon: 'success', title: 'Berhasil', text: 'File berhasil diunggah ke pustaka media.' });
      loadMedia();
    } catch (error: any) {
      Swal.fire({ icon: 'error', title: 'Gagal', text: error.message || 'Terjadi kesalahan saat mengunggah.' });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Hapus File?',
      text: "File akan dihapus permanen dan mungkin merusak postingan yang menggunakannya.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      const res = await deleteFromLibrary(id);
      if (res.success) {
        Swal.fire('Terhapus!', 'File telah dihapus dari pustaka.', 'success');
        loadMedia();
      } else {
        Swal.fire('Gagal!', 'Terjadi kesalahan sistem.', 'error');
      }
    }
  };

  const filteredMedia = media.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h2 className="text-3xl font-headline font-bold">Media Library</h2>
          <p className="text-muted-foreground">Manage and reuse your images and assets.</p>
        </div>
        <div className="relative">
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            onChange={handleUpload}
            disabled={uploading}
          />
          <Button asChild disabled={uploading}>
            <label htmlFor="file-upload" className="cursor-pointer gap-2">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              Upload File
            </label>
          </Button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search by filename..." 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-muted-foreground">Loading library...</div>
        ) : filteredMedia.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed rounded-lg">
            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">No files found in the library.</p>
          </div>
        ) : (
          filteredMedia.map((item) => (
            <Card key={item._id} className="overflow-hidden group relative">
              <div className="relative aspect-square bg-secondary/20">
                {item.type.startsWith('image/') ? (
                  <Image 
                    src={item.data} 
                    alt={item.name} 
                    fill 
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <FileText className="w-12 h-12 text-primary/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-2">
                <p className="text-[10px] font-medium truncate" title={item.name}>{item.name}</p>
                <p className="text-[8px] text-muted-foreground mt-1">{formatSize(item.size)} • {item.type.split('/')[1].toUpperCase()}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
