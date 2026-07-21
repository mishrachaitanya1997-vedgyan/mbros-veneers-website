import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnquiryDialog } from '@/components/EnquiryDialog';
import { SITE_SETTINGS } from './content/siteSettings';
import { applyCategorySeo } from './content/seo';
import {
  fetchCatalogCategories,
  fetchCatalogProducts,
  type CatalogCategory,
  type CatalogProduct,
} from './catalog/api';

// Shared SPA navigate helper (mirrors App.tsx / Catalogue.tsx)
const navigate = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const FALLBACK_HERO =
  'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/brown%20wood%20textured%20veneer%20with%20light%20colored%20sofa%20in%20the%20foreground.jpeg';

type CategoryPageConfig = {
  title: string;
  h1: string;
  subtitle: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDesc: string;
  heroImage: string;
};

/**
 * Landing page for one veneer-type category, e.g. /veneers/teak. Copy is
 * derived from the catalogue category itself (managed in the app's Website →
 * Catalogue Categories editor); the product grid is live showroom stock for
 * the category.
 */
export default function VeneerCategoryPage({ slug }: { slug: string }) {
  const settings = SITE_SETTINGS;

  const [categories, setCategories] = useState<CatalogCategory[] | null>(null);
  const [products, setProducts] = useState<CatalogProduct[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetchCatalogCategories()
      .then((list) => {
        if (!cancelled) setCategories(list);
      })
      .catch(() => {
        if (!cancelled) setCategories([]);
      });
    fetchCatalogProducts(slug)
      .then((list) => {
        if (!cancelled) setProducts(list);
      })
      .catch(() => {
        if (!cancelled) setProducts([]);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const category = categories?.find((entry) => entry.id === slug);

  // Assemble the page config from the catalogue category.
  const config: CategoryPageConfig | null = useMemo(() => {
    if (!category) return null;
    return {
      title: `${category.title} in Nagpur | M Bros Veneers`,
      h1: category.title,
      subtitle: category.description,
      description: category.description,
      canonical: `https://mbrosveneers.com/veneers/${category.id}`,
      ogTitle: `${category.title} in Nagpur | M Bros Veneers`,
      ogDesc: category.description,
      heroImage: category.image || FALLBACK_HERO,
    };
  }, [category]);

  useEffect(() => {
    if (config) applyCategorySeo(config);
    window.scrollTo(0, 0);
  }, [config]);

  // Unknown slug (categories loaded, no CMS page either) → gentle dead end.
  if (!config) {
    if (categories === null) return <div className="min-h-screen bg-wood-dark" />;
    return (
      <div className="min-h-screen bg-wood-dark text-wood-cream font-sans flex items-center">
        <div className="container mx-auto px-6 text-center">
          <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-6 block">404</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
            This collection has <span className="italic text-gold">moved on</span>
          </h1>
          <p className="text-wood-light text-lg font-light mb-10">
            The veneer type you're looking for isn't in the catalogue right now.
          </p>
          <a href="/catalogue" onClick={(e) => { e.preventDefault(); navigate('/catalogue'); }}>
            <Button className="bg-gold text-wood-dark hover:bg-white transition-all rounded-none px-10 py-6 text-sm uppercase tracking-widest font-bold">
              Browse the Full Catalogue
            </Button>
          </a>
        </div>
      </div>
    );
  }

  const liveItems = products
    .map((product) => {
      const image = product.primaryImageUrl ?? product.imageUrls?.[0] ?? '';
      if (!image) return null;
      return {
        title: product.title || `Veneer Lot ${product.lotNo ?? ''}`.trim(),
        tag: product.tag || 'In Stock',
        image,
        lotNo: product.lotNo,
        stockLabel:
          typeof product.availableQuantity === 'number'
            ? `${Math.round(product.availableQuantity)} sheets available`
            : undefined,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const showLive = liveItems.length > 0;
  const gridItems = liveItems;

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
              <li className="text-gold" aria-current="page">{config.h1}</li>
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
          <a href={`/catalogue?type=${slug}`} onClick={(e) => { e.preventDefault(); navigate(`/catalogue?type=${slug}`); }} className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors text-sm uppercase tracking-widest font-bold group">
            View Full Catalogue
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </a>
        </div>

        {/* Description */}
        <div className="max-w-3xl mb-20">
          <p className="text-wood-light text-lg font-light leading-relaxed">{config.description}</p>
        </div>

        {/* Product grid — live showroom stock when published, CMS items otherwise */}
        <section aria-labelledby="products-heading" className="mb-24">
          <h2 id="products-heading" className="text-3xl md:text-4xl font-serif text-white mb-12">
            {showLive ? (
              <>In Stock <span className="italic text-gold">Now</span></>
            ) : (
              <>Featured <span className="italic text-gold">Collection</span></>
            )}
          </h2>
          {gridItems.length === 0 ? (
            <p className="text-wood-light text-lg font-light">
              Nothing from this collection is published online right now — new lots arrive weekly.
              Call {settings.phoneDisplay} or visit the Lakadganj showroom to see what just came in.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {gridItems.map((item, i) => (
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
                  <p className="text-wood-light text-sm font-light">
                    {item.stockLabel
                      ? `${item.stockLabel}${item.lotNo ? ` · Lot ${item.lotNo}` : ''} — contact us for pricing.`
                      : 'Available at our Nagpur showroom. Contact us for pricing.'}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <a href="/catalogue" onClick={(e) => { e.preventDefault(); navigate('/catalogue'); }}>
              <Button className="bg-gold text-wood-dark hover:bg-white transition-all rounded-none px-10 py-6 text-sm uppercase tracking-widest font-bold">
                View All 200+ Veneers
              </Button>
            </a>
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
