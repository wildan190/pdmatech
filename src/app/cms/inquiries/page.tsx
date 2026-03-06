
'use client';

import { useEffect, useState } from 'react';
import { getInquiries, deleteInquiry } from './actions';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, User, Building, MessageSquare, Clock, Mail, Phone, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function InquiriesManagement() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      const result = await deleteInquiry(id);
      if (result.success) {
        toast({ title: "Inquiry Deleted", description: "The lead has been removed." });
        loadInquiries();
      }
    }
  };

  const formatWhatsAppNumber = (num: string) => {
    // Remove non-digit characters
    let cleaned = num.replace(/\D/g, '');
    // Replace leading '0' with '62' if it's likely an Indonesian number
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.substring(1);
    }
    return cleaned;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-headline font-bold">Inquiries / Leads</h2>
          <p className="text-muted-foreground">Manage project requests from potential clients.</p>
        </div>
        <Badge variant="outline" className="h-fit">
          Total: {inquiries.length}
        </Badge>
      </div>

      <Card className="shadow-md border-0 overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-secondary/30">
              <TableRow>
                <TableHead className="font-bold w-[250px]">Contact Info</TableHead>
                <TableHead className="font-bold">Business Context</TableHead>
                <TableHead className="font-bold">Message</TableHead>
                <TableHead className="font-bold w-[150px]">Date</TableHead>
                <TableHead className="text-right font-bold w-[120px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20 text-muted-foreground">
                    Loading inquiries...
                  </TableCell>
                </TableRow>
              ) : inquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20 text-muted-foreground font-medium">
                    No inquiries received yet.
                  </TableCell>
                </TableRow>
              ) : (
                inquiries.map((item) => (
                  <TableRow key={item._id} className="hover:bg-secondary/10 transition-colors align-top">
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <div className="font-bold flex items-center gap-2">
                          <User className="w-3 h-3 text-primary" /> {item.name}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <Mail className="w-3 h-3" /> {item.email}
                        </div>
                        {item.whatsapp && (
                          <div className="flex items-center gap-2">
                            <div className="text-xs text-green-600 font-semibold flex items-center gap-2">
                              <Phone className="w-3 h-3" /> {item.whatsapp}
                            </div>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-6 w-6 rounded-full border-green-200 text-green-600 hover:bg-green-50"
                              title="Chat on WhatsApp"
                              asChild
                            >
                              <a 
                                href={`https://wa.me/${formatWhatsAppNumber(item.whatsapp)}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-medium flex items-center gap-2">
                          <Building className="w-3 h-3 text-muted-foreground" /> 
                          {item.company || 'Individual'}
                        </div>
                        {item.industry && (
                          <Badge variant="secondary" className="w-fit text-[10px] h-4">
                            {item.industry}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground max-w-md whitespace-pre-wrap">
                        <MessageSquare className="w-3 h-3 inline mr-2 text-primary/50" />
                        {item.message}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {new Date(item.createdAt).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive hover:text-destructive hover:bg-destructive/10" 
                        onClick={() => handleDelete(item._id)}
                      >
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
