import * as React from 'react';
import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnquiryDialog } from '@/components/EnquiryDialog';
import { useContent } from './content/ContentProvider';
import { applyCategorySeo } from './content/seo';

// Shared SPA navigate helper (mirrors App.tsx / Catalogue.tsx)
const navigate = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

type CategorySlug = 'burl' | 'teak' | 'oak';

export default function VeneerCategoryPage({ slug }: { slug: CategorySlug }) {
  const { pages, site } = useContent();
  const config = pages[slug];
  const settings = site.settings;

  // Update page title/meta + FAQ structured data on mount, all CMS-editable.
  useEffect(() => {
    applyCategorySeo(config);
    window.scrollTo(0, 0);
  }, [config]);

  return (
    <div className="min-h-screen bg-wood-dark text-wood-cream font-sans">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-end pb-16 overflow-hidden">
        <img
          src={config.heroImage}
          alt={config.h1}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-white/60 uppercase tracking-widest">
              <li>
                <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="hover:text-gold transition-colors">
                  Home
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a href="/catalogue" onClick={(e) => { e.preventDefault(); navigate('/catalogue'); }} className="hover:text-gold transition-colors">
                  Catalogue
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gold" aria-current="page">{config.h1.split(' ')[0]} {config.h1.split(' ')[1]}</li>
            </ol>
          </nav>

          <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
            M Bros Veneers — Nagpur
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-4">
            {config.h1}
          </h1>
          <p className="text-wood-light text-lg font-light">{config.subtitle}</p>
        </div>
      </section>

      {/* Main content */}
      <div className="container mx-auto px-6 py-20">
        {/* Back + full catalogue link */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-16">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-wood-medium hover:text-gold transition-colors text-sm uppercase tracking-widest font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Back to Home
          </button>
          <a href="/catalogue" onClick={(e) => { e.preventDefault(); navigate('/catalogue'); }} className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors text-sm uppercase tracking-widest font-bold group">
            View Full Catalogue
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </a>
        </div>

        {/* Description */}
        <div className="max-w-3xl mb-20">
          <p className="text-wood-light text-lg font-light leading-relaxed">{config.description}</p>
        </div>

        {/* Product grid */}
        <section aria-labelledby="products-heading" className="mb-24">
          <h2 id="products-heading" className="text-3xl md:text-4xl font-serif text-white mb-12">
            Featured <span className="italic text-gold">Collection</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.items.map((item, i) => (
              <div key={i} className="group">
                <div className="aspect-[4/3] overflow-hidden mb-6 bg-black relative">
                  <img
                    src={item.image}
                    alt={`${item.title} — ${item.tag} wood veneer at M Bros Veneers Nagpur`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 text-gold text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 backdrop-blur-md border border-white/10">
                    {item.tag}
                  </div>
                </div>
                <h3 className="text-xl font-serif text-white mb-2">{item.title}</h3>
                <p className="text-wood-light text-sm font-light">Available at our Nagpur showroom. Contact us for pricing.</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="/catalogue" onClick={(e) => { e.preventDefault(); navigate('/catalogue'); }}>
              <Button className="bg-gold text-wood-dark hover:bg-white transition-all rounded-none px-10 py-6 text-sm uppercase tracking-widest font-bold">
                View All 200+ Veneers
              </Button>
            </a>
          </div>
        </section>

        {/* FAQ — structured for rich results */}
        <section aria-labelledby="faq-heading" className="mb-24 max-w-3xl">
          <h2 id="faq-heading" className="text-3xl font-serif text-white mb-10">
            Frequently Asked <span className="italic text-gold">Questions</span>
          </h2>
          <div className="space-y-8">
            {config.faqs.map((faq, i) => (
              <div key={i} className="border-b border-wood-light/10 pb-8">
                <h3 className="text-lg font-serif text-white mb-3">{faq.q}</h3>
                <p className="text-wood-light font-light leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section aria-labelledby="contact-cta" className="bg-wood-medium/20 border border-wood-light/10 p-10 md:p-16">
          <h2 id="contact-cta" className="text-3xl font-serif text-white mb-4">
            Visit Our Nagpur Showroom
          </h2>
          <p className="text-wood-light font-light mb-8 max-w-xl">
            Experience our full collection of natural wood veneer sheets in person at our Lakadganj showroom. Our experts will help you find the perfect veneer for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 mb-8 text-sm text-wood-light">
            <div className="flex items-start gap-3">
              <MapPin className="text-gold shrink-0 mt-0.5" size={16} aria-hidden="true" />
              <span>{settings.address.full}</span>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="text-gold shrink-0 mt-0.5" size={16} aria-hidden="true" />
              <a href={`tel:${settings.phone}`} className="hover:text-gold transition-colors">{settings.phoneDisplay}</a>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="text-gold shrink-0 mt-0.5" size={16} aria-hidden="true" />
              <a href={`mailto:${settings.email}`} className="hover:text-gold transition-colors">{settings.email}</a>
            </div>
          </div>
          <EnquiryDialog>
            <Button
              className="bg-wood-dark text-wood-cream hover:bg-gold hover:text-wood-dark transition-all rounded-none px-10 py-6 uppercase tracking-widest font-bold"
            >
              Send an Enquiry
            </Button>
          </EnquiryDialog>
        </section>
      </div>
    </div>
  );
}
