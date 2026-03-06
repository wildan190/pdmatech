
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { submitInquiry } from '@/app/cms/inquiries/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  whatsapp: z.string().min(8, {
    message: 'Please enter a valid WhatsApp number.',
  }),
  company: z.string().optional(),
  industry: z.string().optional(),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
  agreement: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy.',
  }),
});

type ContactFormProps = {
  dictionary: any;
}

const ContactForm = ({ dictionary }: ContactFormProps) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      whatsapp: '',
      company: '',
      industry: '',
      message: '',
      agreement: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await submitInquiry({
        name: values.name,
        email: values.email,
        whatsapp: values.whatsapp,
        company: values.company,
        industry: values.industry,
        message: values.message,
      });

      if (result.success) {
        toast({
          title: "Inquiry Sent Successfully",
          description: "We have received your message and will get back to you soon.",
        });
        
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: "There was an error saving your inquiry. Please try again.",
        });
      }
    });
  }

  return (
    <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border shadow-lg">
        <CardContent className="pt-6">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>{dictionary.form.name}</FormLabel>
                        <FormControl>
                        <Input placeholder={dictionary.form.namePlaceholder} {...field} disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>{dictionary.form.email}</FormLabel>
                        <FormControl>
                        <Input placeholder={dictionary.form.emailPlaceholder} {...field} disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>{dictionary.form.whatsapp}</FormLabel>
                        <FormControl>
                        <Input placeholder={dictionary.form.whatsappPlaceholder} {...field} disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>{dictionary.form.industry}</FormLabel>
                        <FormControl>
                        <Input placeholder={dictionary.form.industryPlaceholder} {...field} disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>{dictionary.form.company}</FormLabel>
                        <FormControl>
                        <Input placeholder={dictionary.form.companyPlaceholder} {...field} disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>{dictionary.form.message}</FormLabel>
                    <FormControl>
                        <Textarea placeholder={dictionary.form.messagePlaceholder} className="min-h-[120px]" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="agreement"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isPending}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel className="text-xs text-muted-foreground" dangerouslySetInnerHTML={{ __html: dictionary.form.agreement }} />
                        <FormMessage />
                    </div>
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : dictionary.form.submit}
                </Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
};

export default ContactForm;
