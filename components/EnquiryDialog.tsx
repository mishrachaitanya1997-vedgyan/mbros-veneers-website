import * as React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from '@emailjs/browser';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

interface EnquiryDialogProps {
  children: React.ReactElement;
  defaultMessage?: string;
}

export function EnquiryDialog({ children, defaultMessage = "" }: EnquiryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: defaultMessage,
    },
  });

  // Re-initialize defaultValues if defaultMessage prop changes (e.g., when a different item is selected)
  React.useEffect(() => {
    form.reset({
      name: form.getValues('name'),
      email: form.getValues('email'),
      subject: form.getValues('subject'),
      message: defaultMessage,
    });
  }, [defaultMessage, form]);

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    try {
      await emailjs.send(
        'service_cgxlu6r',
        'template_5i87ik5',
        {
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        },
        'NPtOCVI7yLpyBNURh'
      );
      setSubmitStatus({ type: 'success', message: 'Message sent! We will get back to you soon.' });
      form.reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus({ type: 'error', message: 'Failed to send the message, please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-[500px] bg-wood-cream border-wood-light/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-3xl text-wood-dark">Send an Enquiry</DialogTitle>
          <DialogDescription className="text-wood-medium text-base">
            Please fill out the form below and our team will get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-wood-dark uppercase tracking-widest text-xs font-bold">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} className="rounded-none border-wood-light/40 bg-white h-12" />
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
                  <FormLabel className="text-wood-dark uppercase tracking-widest text-xs font-bold">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} className="rounded-none border-wood-light/40 bg-white h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-wood-dark uppercase tracking-widest text-xs font-bold">Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Inquiry about Veneers" {...field} className="rounded-none border-wood-light/40 bg-white h-12" />
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
                  <FormLabel className="text-wood-dark uppercase tracking-widest text-xs font-bold">Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about your project..." {...field} className="rounded-none border-wood-light/40 bg-white min-h-[120px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} type="submit" className="w-full bg-wood-dark text-wood-cream hover:bg-gold hover:text-wood-dark transition-all duration-300 rounded-none h-14 uppercase tracking-[0.2em] font-bold mt-2">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            {submitStatus.type && (
              <div className={`px-4 py-3 mt-4 text-sm font-medium border-l-4 ${submitStatus.type === 'success' ? 'border-green-500 text-green-700 bg-green-50' : 'border-red-500 text-red-700 bg-red-50'}`}>
                {submitStatus.message}
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
