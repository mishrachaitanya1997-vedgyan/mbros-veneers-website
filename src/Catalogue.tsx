import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnquiryDialog } from '@/components/EnquiryDialog';

const API_URL = ((import.meta.env.VITE_API_URL as string | undefined) ?? '').replace(/\/$/, '');

// Shared SPA navigate helper (mirrors App.tsx)
const navigate = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

type CatalogueItem = {
  id: string;
  title: string;
  tag: string;
  image: string;
  imageUrls: string[];
  description: string;
  lotNo?: string;
  priceLabel?: string;
  stockLabel?: string;
};

type PublicCatalogProduct = {
  lotId: string;
  title?: string;
  tag?: string;
  lotNo?: string;
  description?: string;
  primaryImageUrl?: string | null;
  imageUrls?: string[];
  saleRatePerSqM?: number | null;
  availableQuantity?: number;
};

const FALLBACK_DESCRIPTION =
  'Part of our exclusive showroom collection, renowned for depth of texture and presence in luxury architectural spaces. Hand-selected for grain quality and aesthetic clarity.';

const CATALOGUE_ITEMS: CatalogueItem[] = [
  { id: 'cat-1', title: 'Royal Ebony Burl', tag: 'Exotic Series', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5110.JPG', imageUrls: ['https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5110.JPG'], description: FALLBACK_DESCRIPTION },
  { id: 'cat-2', title: 'Smoked Walnut', tag: 'Premium', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5118.JPG', imageUrls: ['https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5118.JPG'], description: FALLBACK_DESCRIPTION },
  { id: 'cat-3', title: 'Textured Ash', tag: 'Textured', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5119.JPG', imageUrls: ['https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5119.JPG'], description: FALLBACK_DESCRIPTION },
  { id: 'cat-4', title: 'Dark Fumed Oak', tag: 'Heritage', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5121.JPG', imageUrls: ['https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5121.JPG'], description: FALLBACK_DESCRIPTION },
  { id: 'cat-5', title: 'Golden Teak Crown', tag: 'Classic', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5339.JPG', imageUrls: ['https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5339.JPG'], description: FALLBACK_DESCRIPTION },
  { id: 'cat-6', title: 'Chestnut Grain', tag: 'Classic', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5341.JPG', imageUrls: ['https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5341.JPG'], description: FALLBACK_DESCRIPTION },
  { id: 'cat-7', title: 'Wenge Fine Line', tag: 'Modern', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5343.JPG', imageUrls: ['https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5343.JPG'], description: FALLBACK_DESCRIPTION },
  { id: 'cat-8', title: 'Silver Grey Fluted', tag: 'Fluted', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5874.JPG', imageUrls: ['https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_5874.JPG'], description: FALLBACK_DESCRIPTION },
  { id: 'cat-9', title: 'Nordic Charcoal', tag: 'Minimalist', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_6041.JPG', imageUrls: ['https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/IMG_6041.JPG'], description: FALLBACK_DESCRIPTION },
  { id: 'cat-10', title: 'Noir Etched Wood', tag: 'Etched', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/DSC05814.JPG', imageUrls: ['https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/DSC05814.JPG'], description: FALLBACK_DESCRIPTION },
  { id: 'cat-11', title: 'Geometric Array', tag: 'Bespoke', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/DSC06765.JPG', imageUrls: ['https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/DSC06765.JPG'], description: FALLBACK_DESCRIPTION },
  { id: 'cat-12', title: 'Veneer Swatch Collection', tag: 'Reference', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/C1311FB5-0B7A-4C65-B51D-A9E9F996F3A6.jpg', imageUrls: ['https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/C1311FB5-0B7A-4C65-B51D-A9E9F996F3A6.jpg'], description: FALLBACK_DESCRIPTION },
  { id: 'cat-13', title: 'Textured Charcoal (Applied)', tag: 'Textured', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/textured-charcoal-applied.jpeg', imageUrls: ['https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/textured-charcoal-applied.jpeg'], description: FALLBACK_DESCRIPTION },
  { id: 'cat-14', title: 'Textured Charcoal (Raw)', tag: 'Textured', image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/textured-charcoal-raw.jpeg', imageUrls: ['https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/catalogue_asset/textured-charcoal-raw.jpeg'], description: FALLBACK_DESCRIPTION },
];

export default function Catalogue() {
  const [inventoryItems, setInventoryItems] = useState<CatalogueItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<CatalogueItem | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const items = inventoryItems.length > 0 ? inventoryItems : CATALOGUE_ITEMS;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!API_URL) return;
    const controller = new AbortController();
    fetch(`${API_URL}/public/catalog/products`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data: { products?: PublicCatalogProduct[] }) => {
        const products = (data.products ?? [])
          .map((product, index): CatalogueItem | null => {
            const images = [
              product.primaryImageUrl ?? '',
              ...(Array.isArray(product.imageUrls) ? product.imageUrls : []),
            ].filter((url, imageIndex, list) => url && list.indexOf(url) === imageIndex);
            if (images.length === 0) return null;
            return {
              id: product.lotId,
              title: product.title || `Veneer Lot ${product.lotNo ?? index + 1}`,
              tag: product.tag || 'In Stock',
              image: images[0],
              imageUrls: images,
              description: product.description || FALLBACK_DESCRIPTION,
              lotNo: product.lotNo,
              priceLabel: typeof product.saleRatePerSqM === 'number'
                ? `Rs ${Math.round(product.saleRatePerSqM)} / sq.m`
                : undefined,
              stockLabel: typeof product.availableQuantity === 'number'
                ? `${Math.round(product.availableQuantity)} sheets available`
                : undefined,
            };
          })
          .filter((item): item is CatalogueItem => item !== null);
        setInventoryItems(products);
      })
      .catch(() => {
        setInventoryItems([]);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedItem]);

  return (
    <div className="min-h-screen bg-wood-dark text-wood-cream selection:bg-gold selection:text-wood-dark font-sans relative overflow-hidden pt-24 pb-32">
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/fluted%20dark%20colored%20veneer%20in%20the%20background%20with%20light%20colored%20veneer%20in%20the%20rest%20of%20the%20area.jpeg')] bg-cover mix-blend-overlay" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-3xl">
            <div className="mb-10">
              <a href="/" aria-label="M Bros Veneers — Back to Homepage" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                <img 
                  src="https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/logo/M%20BROS%20VENEERS%20%26%20PLY%20LOGO.PNG" 
                  alt="M Bros Veneers Logo" 
                  width="160"
                  height="64"
                  className="h-16 object-contain"
                  loading="eager"
                  decoding="async"
                />
              </a>
            </div>
            <a href="/" className="inline-flex items-center gap-2 text-wood-medium hover:text-gold transition-colors text-sm uppercase tracking-widest font-medium mb-8 group" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </a>
            <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Natural Veneer Sheets — 200+ Varieties</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
              Premium <span className="italic text-wood-light">Veneer Sheets</span>
            </h1>
            <p className="text-wood-light text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              India's most comprehensive decorative veneer catalogue — teak veneer sheets, oak veneer sheets, walnut veneer sheets, burl veneers, and exotic fluted panels. Available for furniture makers, interior designers, architects, and commercial bulk orders from our Nagpur showroom.
            </p>
          </div>
        </div>

        {/* Masonry/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
          {items.map((item, index) => (
              <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-50px' }}
              className="group cursor-pointer flex flex-col"
              onClick={() => {
                setSelectedItem(item);
                setActiveImage(item.image);
              }}
            >
              <div className="relative w-full aspect-[4/3] md:aspect-square overflow-hidden mb-6 bg-black">
                <motion.img 
                  layoutId={`catalogue-img-${item.id}`}
                  src={item.image} 
                  alt={`${item.title} — ${item.tag} wood veneer from M Bros Veneers Nagpur`}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay grading */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Maximize icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                  <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 text-white">
                    <Maximize2 className="w-6 h-6" aria-hidden="true" />
                  </div>
                </div>

                {/* Tag */}
                <div className="absolute top-4 left-4 bg-black/60 text-gold text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 backdrop-blur-md border border-white/10">
                  {item.tag}
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-wood-light text-xs font-serif italic mb-2">No. {String(index + 1).padStart(2, '0')}</span>
                <h3 className="text-2xl font-serif text-white tracking-wide group-hover:text-gold transition-colors duration-300">
                  {item.title}
                </h3>
                {(item.priceLabel || item.stockLabel) && (
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-wood-medium">
                    {[item.priceLabel, item.stockLabel].filter(Boolean).join(' | ')}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Expanded View */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div 
              className="absolute inset-0 bg-black/95 backdrop-blur-3xl cursor-zoom-out" 
              onClick={() => setSelectedItem(null)} 
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-6xl flex flex-col md:flex-row bg-[#0A0A0A] border border-white/10 shadow-2xl overflow-hidden z-10 max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-all rounded-full group outline-none border border-white/10"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
              </button>

              <div className="w-full md:w-[65%] h-[50vh] md:h-[85vh] relative flex items-center justify-center p-4 md:p-8 bg-black">
                <motion.img 
                  layoutId={`catalogue-img-${selectedItem.id}`}
                  src={activeImage ?? selectedItem.image}
                  alt={selectedItem.title} 
                  className="max-w-full max-h-full object-contain shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                {selectedItem.imageUrls.length > 1 && (
                  <div className="absolute left-4 right-4 bottom-4 flex gap-3 overflow-x-auto py-2">
                    {selectedItem.imageUrls.map((url) => (
                      <button
                        key={url}
                        type="button"
                        onClick={() => setActiveImage(url)}
                        className={`h-16 w-16 shrink-0 overflow-hidden border ${url === (activeImage ?? selectedItem.image) ? 'border-gold' : 'border-white/20'} bg-black`}
                      >
                        <img src={url} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="w-full md:w-[35%] p-8 md:p-12 flex flex-col justify-center bg-[#0A0A0A] relative h-full shrink-0">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold/40 to-transparent" />
                
                <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">
                  {selectedItem.tag}
                </span>
                
                <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 tracking-tight leading-tight">
                  {selectedItem.title}
                </h3>
                
                <div className="w-12 h-[1px] bg-white/20 mb-8" />
                
                <p className="text-wood-light text-sm md:text-base font-light leading-relaxed mb-10">
                  {selectedItem.description}
                </p>
                {(selectedItem.priceLabel || selectedItem.stockLabel || selectedItem.lotNo) && (
                  <div className="space-y-2 text-sm text-wood-medium mb-8">
                    {selectedItem.lotNo && <div>Lot {selectedItem.lotNo}</div>}
                    {selectedItem.priceLabel && <div>{selectedItem.priceLabel}</div>}
                    {selectedItem.stockLabel && <div>{selectedItem.stockLabel}</div>}
                  </div>
                )}

                <EnquiryDialog defaultMessage={`Hi, I would like to request pricing for the ${selectedItem.title} veneer. Please let me know the details.`}>
                  <Button
                      className="w-full bg-gold text-wood-dark hover:bg-white transition-all duration-300 rounded-none py-6 uppercase tracking-[0.2em] font-bold"
                    >
                      Request Pricing
                  </Button>
                </EnquiryDialog>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
