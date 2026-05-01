import * as React from 'react';
import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Shared SPA navigate helper
const navigate = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

// ─── Category configuration ────────────────────────────────────────────────
type CategorySlug = 'burl' | 'teak' | 'oak';

const CATEGORY_CONFIG = {
  burl: {
    title: 'Exotic Burl Wood Veneers in Nagpur | M Bros Veneers',
    h1: 'Exotic Burl Wood Veneers in Nagpur',
    subtitle: 'Rare, Hand-Selected Patterns for Luxury Interiors',
    description: 'Discover M Bros Veneers\' exclusive collection of exotic burl wood veneer sheets in Nagpur — rare, one-of-a-kind swirling grain patterns sourced from the most remote forests in the world. Ideal for luxury interior design, bespoke furniture, and architectural accent walls.',
    canonical: 'https://mbrosveneers.com/veneers/burl',
    ogTitle: 'Exotic Burl Wood Veneers in Nagpur | M Bros Veneers',
    ogDesc: 'Shop rare burl wood veneer sheets in Nagpur. Hand-selected exotic burl patterns for luxury interiors and architectural projects. Visit our Lakadganj showroom.',
    heroImage: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/complete%20room%20with%20balcony%20view.jpeg',
    items: [
      { title: 'Royal Ebony Burl', tag: 'Exotic Series', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5110.JPG' },
      { title: 'Geometric Array', tag: 'Bespoke', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/DSC06765.JPG' },
      { title: 'Veneer Swatch Collection', tag: 'Reference', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/C1311FB5-0B7A-4C65-B51D-A9E9F996F3A6.jpg' },
    ],
    faqs: [
      { q: 'What is burl wood veneer?', a: 'Burl veneer is cut from abnormal rounded growths on tree trunks, producing unique swirling grain patterns found nowhere else in nature. No two burl veneer sheets are identical, making them highly prized for luxury interiors.' },
      { q: 'Where can I buy burl wood veneer in Nagpur?', a: 'M Bros Veneers at 81, Queta Colony, Lakadganj, Nagpur stocks one of the largest collections of exotic burl wood veneers in Central India. Visit our showroom Monday–Saturday, 10 AM–8 PM.' },
    ],
  },
  teak: {
    title: 'Natural Teak Wood Veneers in Nagpur | M Bros Veneers',
    h1: 'Natural Teak Wood Veneers in Nagpur',
    subtitle: 'Premium Teak Veneer Sheets for Every Interior Style',
    description: 'Browse M Bros Veneers\' premium natural teak wood veneer sheets in Nagpur. From classic Golden Teak Crown cuts to chestnut-grain finishes, our teak veneer collection is ideal for wall panelling, bespoke furniture, and interior design projects across Central India.',
    canonical: 'https://mbrosveneers.com/veneers/teak',
    ogTitle: 'Natural Teak Wood Veneers in Nagpur | M Bros Veneers',
    ogDesc: 'Premium natural teak wood veneer sheets in Nagpur for furniture, wall panelling, and interior design. Visit our showroom in Lakadganj.',
    heroImage: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/brown%20wood%20textured%20veneer%20with%20light%20colored%20sofa%20in%20the%20foreground.jpeg',
    items: [
      { title: 'Golden Teak Crown', tag: 'Classic', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5339.JPG' },
      { title: 'Chestnut Grain', tag: 'Classic', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5341.JPG' },
      { title: 'Smoked Walnut', tag: 'Premium', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5118.JPG' },
    ],
    faqs: [
      { q: 'What is teak wood veneer used for?', a: 'Teak veneer is widely used for wall panelling, furniture surfaces, cabinet doors, flooring overlays, and interior accent features. It provides the warmth and natural grain of solid teak at a fraction of the cost.' },
      { q: 'Where can I buy teak veneer sheets in Nagpur?', a: 'M Bros Veneers stocks premium natural teak veneer sheets at our Lakadganj showroom in Nagpur, available for architects, interior designers, and individual buyers.' },
    ],
  },
  oak: {
    title: 'Heritage Oak Wood Veneers in Nagpur | M Bros Veneers',
    h1: 'Heritage Oak Wood Veneers in Nagpur',
    subtitle: 'European Oak Veneer Sheets for Timeless Interiors',
    description: 'Explore premium European oak wood veneer sheets at M Bros Veneers, Nagpur. From dark fumed oak to smoked charcoal oak, our oak veneer collection is perfect for feature walls, cabinet surfaces, and luxury interior design projects across Maharashtra and Central India.',
    canonical: 'https://mbrosveneers.com/veneers/oak',
    ogTitle: 'Heritage Oak Wood Veneers in Nagpur | M Bros Veneers',
    ogDesc: 'Premium European oak veneer sheets in Nagpur — fumed oak, smoked oak, and natural oak for interior design and architectural projects.',
    heroImage: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/room%20with%20light%20coming%20from%20windows%20and%20light%20shade%20veneers.jpeg',
    items: [
      { title: 'Dark Fumed Oak', tag: 'Heritage', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5121.JPG' },
      { title: 'Textured Ash', tag: 'Textured', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5119.JPG' },
      { title: 'Nordic Charcoal', tag: 'Minimalist', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_6041.JPG' },
    ],
    faqs: [
      { q: 'What types of oak veneer are available in Nagpur?', a: 'At M Bros Veneers Nagpur, we stock European oak in multiple finishes including dark fumed oak, natural ash, smoked oak, and Nordic charcoal — suitable for both classic and contemporary interior styles.' },
      { q: 'Is oak veneer suitable for wall panelling?', a: 'Yes. Oak veneer is one of the most popular choices for interior wall panelling due to its clean grain, durability, and ability to complement a wide range of design styles from traditional to modern minimalist.' },
    ],
  },
} satisfies Record<CategorySlug, {
  title: string; h1: string; subtitle: string; description: string;
  canonical: string; ogTitle: string; ogDesc: string; heroImage: string;
  items: { title: string; tag: string; image: string }[];
  faqs: { q: string; a: string }[];
}>;

export default function VeneerCategoryPage({ slug }: { slug: CategorySlug }) {
  const config = CATEGORY_CONFIG[slug];

  // Update page meta on mount
  useEffect(() => {
    document.title = config.title;
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = config.canonical;
    const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
    const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
    const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (ogTitle) ogTitle.content = config.ogTitle;
    if (ogDesc) ogDesc.content = config.ogDesc;
    if (ogUrl) ogUrl.content = config.canonical;
    window.scrollTo(0, 0);
  }, [config]);

  // JSON-LD FAQ schema for rich results
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

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
              <span>81, Queta Colony, Lakadganj, Nagpur – 440008</span>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="text-gold shrink-0 mt-0.5" size={16} aria-hidden="true" />
              <a href="tel:+919922166866" className="hover:text-gold transition-colors">+91 99221 66866</a>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="text-gold shrink-0 mt-0.5" size={16} aria-hidden="true" />
              <a href="mailto:info@mbrosveneers.com" className="hover:text-gold transition-colors">info@mbrosveneers.com</a>
            </div>
          </div>
          <Button
            className="bg-wood-dark text-wood-cream hover:bg-gold hover:text-wood-dark transition-all rounded-none px-10 py-6 uppercase tracking-widest font-bold"
            onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
          >
            Send an Enquiry
          </Button>
        </section>
      </div>

      {/* Inject FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
