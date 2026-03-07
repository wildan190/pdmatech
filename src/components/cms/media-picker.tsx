'use client';

import { useState, useEffect } from 'react';
import { getMediaLibrary, uploadToLibrary } from '@/app/cms/media/actions';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image as ImageIcon, Upload, Search, CheckCircle2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type MediaPickerProps = {
  onSelect: (mediaId: string, data: string) => void;
  currentValue?: string;
};

export default function MediaPicker({ onSelect, currentValue }: MediaPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState(currentValue || '');

  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen]);

  const loadMedia = async () => {
    setLoading(true);
    const data = await getMediaLibrary();
    setMediaItems(data);
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await uploadToLibrary(formData);
      if (result.success) {
        loadMedia();
        setSelectedId(result.id);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const filteredItems = mediaItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const confirmSelection = () => {
    const selected = mediaItems.find(i => i._id === selectedId);
    if (selected) {
      onSelect(selected._id, selected.data);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full gap-2 border-dashed border-2 h-24 flex flex-col hover:bg-primary/5">
          {currentValue && currentValue.length === 24 ? (
            <span className="text-xs text-primary font-bold">Image Selected (ID: {currentValue.substring(0,8)}...)</span>
          ) : (
            <>
              <ImageIcon className="w-6 h-6 text-muted-foreground" />
              <span className="text-muted-foreground">Select or Upload Media</span>
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search files..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <input 
              type="file" 
              id="library-upload" 
              className="hidden" 
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
            />
            <Button asChild disabled={uploading}>
              <label htmlFor="library-upload" className="cursor-pointer gap-2">
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                Upload New
              </label>
            </Button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-1">
          {loading ? (
            <div className="col-span-full py-20 text-center text-muted-foreground">Loading library...</div>
          ) : filteredItems.length === 0 ? (
            <div className="col-span-full py-20 text-center text-muted-foreground">No media found.</div>
          ) : (
            filteredItems.map((item) => (
              <div 
                key={item._id}
                onClick={() => setSelectedId(item._id)}
                className={cn(
                  "relative aspect-square rounded-md overflow-hidden border-2 cursor-pointer transition-all group",
                  selectedId === item._id ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-muted-foreground/30"
                )}
              >
                <Image 
                  src={item.data} 
                  alt={item.name} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <p className="text-[10px] text-white truncate w-full">{item.name}</p>
                </div>
                {selectedId === item._id && (
                  <div className="absolute top-1 right-1">
                    <CheckCircle2 className="w-5 h-5 text-primary fill-white" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3 shrink-0">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={confirmSelection} disabled={!selectedId}>Select Media</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
