import * as React from 'react';
import { useEffect, useState } from 'react';
import { CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TurnstileWidget } from '@/components/TurnstileWidget';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  fetchProjectShare,
  submitSharedProjectEnquiry,
  type SharedProject,
} from './catalog/api';
import { thumbnailUrlFor } from './catalog/imageUrl';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(8, 'Enter a valid phone number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  message: z.string().min(3, 'Tell us a little about your requirement'),
});

/**
 * The client-facing side of a Design Partner's project board
 * (mbrosveneers.com/shared/:token). Read-only, unauthenticated, and
 * deliberately minimal — this is what an architect hands their client on
 * WhatsApp. Submitting the form below is what attributes the resulting CRM
 * lead back to the partner (see apps/api public-project-share.ts + the
 * shareToken field on POST /public/leads).
 */
export default function SharedProjectPage({ token }: { token: string }) {
  const [data, setData] = useState<SharedProject | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    document.title = 'Your curated selection | M Bros Veneers';
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, nofollow');
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchProjectShare(token)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-wood-cream flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-3xl text-wood-dark mb-3">
            This link is no longer available
          </h1>
          <p className="text-wood-medium">
            It may have expired or been revoked. Please ask your architect or
            designer for a fresh link, or contact M Bros Veneers directly.
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-wood-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-wood-light/40 border-t-wood-dark rounded-full animate-spin" />
      </div>
    );
  }

  const curatedBy = [data.partner.firmName, data.partner.name]
    .filter(Boolean)
    .join(' — ');

  return (
    <div className="min-h-screen bg-wood-cream">
      <header className="bg-wood-dark text-wood-cream shadow-md">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
            Curated selection
          </p>
          <h1 className="font-serif text-3xl md:text-4xl">{data.project.name}</h1>
          <p className="mt-3 text-sm text-wood-cream/80">
            {[
              curatedBy ? `Curated by ${curatedBy}` : null,
              data.project.clientLabel,
              data.project.siteLocation,
            ]
              .filter(Boolean)
              .join('  ·  ')}
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {data.project.notes && (
          <p className="text-wood-medium mb-10 max-w-2xl">{data.project.notes}</p>
        )}

        {data.items.length === 0 ? (
          <p className="text-wood-medium">
            No products have been added to this board yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {data.items.map((item) => (
              <div
                key={item.lotId}
                className="bg-white rounded-xl border border-wood-light/20 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="aspect-square bg-wood-light/10 overflow-hidden">
                  {item.primaryImageUrl ? (
                    <img
                      src={thumbnailUrlFor(item.primaryImageUrl)}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-wood-light text-xs uppercase tracking-widest">
                      No photo
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-serif text-lg text-wood-dark">{item.title}</h3>
                  <p className="text-xs text-wood-medium uppercase tracking-widest mt-1">
                    {[item.shadeFamily, item.finish].filter(Boolean).join(' · ')}
                  </p>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-wood-dark font-semibold">
                      {item.sellingPricePerSqM == null
                        ? 'Price on request'
                        : `₹${Number(item.sellingPricePerSqM).toLocaleString('en-IN')} / sq.m`}
                    </span>
                    <StockBadge status={item.stockStatus} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-10 border-t border-wood-light/20 pt-12">
          <div className="bg-white rounded-xl border border-wood-light/20 shadow-sm p-6 md:p-8">
            <h2 className="font-serif text-2xl text-wood-dark mb-4">
              Visit the showroom
            </h2>
            <div className="space-y-3 text-wood-medium text-sm">
              {data.seller.address && (
                <p className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 rounded-full bg-wood-dark/5 p-1.5">
                    <MapPin className="w-4 h-4 text-wood-dark" />
                  </span>
                  {data.seller.address}
                </p>
              )}
              {data.seller.phone && (
                <p className="flex items-center gap-3">
                  <span className="flex-shrink-0 rounded-full bg-wood-dark/5 p-1.5">
                    <Phone className="w-4 h-4 text-wood-dark" />
                  </span>
                  {data.seller.phone}
                </p>
              )}
              {data.seller.email && (
                <p className="flex items-center gap-3">
                  <span className="flex-shrink-0 rounded-full bg-wood-dark/5 p-1.5">
                    <Mail className="w-4 h-4 text-wood-dark" />
                  </span>
                  {data.seller.email}
                </p>
              )}
            </div>
            <p className="mt-6 text-xs text-wood-light leading-relaxed">
              Prices and availability are indicative and confirmed in the final
              showroom quotation. This is not an invoice or stock reservation.
            </p>
          </div>
          <EnquiryForm token={token} />
        </div>
      </main>
    </div>
  );
}

function StockBadge({ status }: { status: string }) {
  const label = status.replaceAll('_', ' ');
  const isAvailable = status === 'in_stock' || status === 'low_stock';
  return (
    <span
      className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${
        isAvailable
          ? 'bg-green-100 text-green-800'
          : 'bg-wood-light/20 text-wood-medium'
      }`}
    >
      {label}
    </span>
  );
}

function EnquiryForm({ token }: { token: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const form = useForm<z.infer<typeof enquirySchema>>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: '', phone: '', email: '', message: '' },
  });

  async function onSubmit(values: z.infer<typeof enquirySchema>) {
    if (!turnstileToken) {
      setSubmitError('Please complete the verification checkbox above.');
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitSharedProjectEnquiry({ ...values, shareToken: token, botToken: turnstileToken });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setSubmitError('Could not send your enquiry. Please try WhatsApp or call instead.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-wood-light/20 shadow-sm p-8 flex flex-col items-center text-center justify-center">
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-serif text-xl text-wood-dark">Enquiry sent</h3>
        <p className="text-wood-medium text-sm mt-2 leading-relaxed">
          The showroom will reach out shortly. Your architect/designer has been
          credited for this referral.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-wood-light/20 shadow-sm p-6 md:p-8">
      <h2 className="font-serif text-2xl text-wood-dark mb-4">
        Interested? Send an enquiry
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-wood-dark uppercase tracking-widest text-xs font-bold">
                  Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} className="rounded-lg border-wood-light/40 bg-white h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-wood-dark uppercase tracking-widest text-xs font-bold">
                  Phone
                </FormLabel>
                <FormControl>
                  <Input placeholder="+91" {...field} className="rounded-lg border-wood-light/40 bg-white h-12" />
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
                <FormLabel className="text-wood-dark uppercase tracking-widest text-xs font-bold">
                  Email (optional)
                </FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} className="rounded-lg border-wood-light/40 bg-white h-12" />
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
                <FormLabel className="text-wood-dark uppercase tracking-widest text-xs font-bold">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your project and timeline..."
                    {...field}
                    className="rounded-lg border-wood-light/40 bg-white min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <TurnstileWidget onToken={setTurnstileToken} />
          <Button
            disabled={isSubmitting || !turnstileToken}
            type="submit"
            className="w-full bg-wood-dark text-wood-cream hover:bg-gold hover:text-wood-dark transition-all duration-300 rounded-lg h-14 uppercase tracking-[0.2em] font-bold shadow-sm hover:shadow-md"
          >
            {isSubmitting ? 'Sending...' : 'Send enquiry'}
          </Button>
          {submitError && (
            <div className="px-4 py-3 text-sm font-medium rounded-lg border-l-4 border-red-500 text-red-700 bg-red-50">
              {submitError}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
