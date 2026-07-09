import type { SiteContent } from './types';

const R2 = 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev';

// Canonical default content. The site renders from these when the CMS API is
// unreachable, and the CMS is seeded with the same values so editors open on
// real content. Keep in sync with database/migrations/0013_web_content.sql.
export const DEFAULT_CONTENT: SiteContent = {
  site: {
    settings: {
      businessName: 'M Bros Veneers',
      tagline: "Nagpur's Premier Veneer Gallery",
      phone: '+919922166866',
      phoneDisplay: '+91 99221 66866',
      email: 'info@mbrosveneers.com',
      instagram: 'mbrosveneers',
      instagramUrl: 'https://www.instagram.com/mbrosveneers',
      mapUrl: 'https://maps.app.goo.gl/uYq6NxYmGsNvMEaT7',
      priceRange: '₹₹₹',
      logoUrl: `${R2}/logo/M%20BROS%20VENEERS%20%26%20PLY%20LOGO.PNG`,
      address: {
        street: '81, Queta Colony, Lakadganj',
        locality: 'Nagpur',
        region: 'Maharashtra',
        postalCode: '440008',
        country: 'IN',
        full: '81, Queta Colony, Lakadganj, Nagpur – 440008',
      },
      geo: { latitude: 21.1465, longitude: 79.1121 },
      hoursDisplay: 'Mon–Sat 10 AM – 8 PM · Sun by appointment',
      hours: [
        { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '20:00' },
        { days: ['Sunday'], opens: '00:00', closes: '00:00', note: 'By appointment only' },
      ],
    },
  },
  home: {
    collections: {
      heading: 'Natural Veneer Sheets',
      intro:
        "India's most curated selection of decorative veneer sheets — teak, oak, walnut, burl, and fluted panels. Over 200 varieties in our Nagpur showroom, each hand-picked for quality and character. Available for furniture makers, interior designers, architects, and bulk orders.",
      items: [
        { id: 'exotic', title: 'Exotic Burls', description: 'Rare burl patterns and unique grains sourced from the most remote corners of the world.', image: `${R2}/complete%20room%20with%20balcony%20view.jpeg`, tag: 'Rare', href: '/veneers/burl' },
        { id: 'classic', title: 'Heritage Oaks', description: 'The foundation of luxury. Timeless European Oaks offering beautiful continuous wood grain.', image: `${R2}/brown%20wood%20textured%20veneer%20with%20light%20colored%20sofa%20in%20the%20foreground.jpeg`, tag: 'Heritage', href: '/veneers/oak' },
        { id: 'fluted', title: 'Fluted Veneer', description: 'Elegant vertical grain patterns and rich textures creating stunning interior feature walls.', image: `${R2}/fluted%20veneer%20.jpeg`, tag: 'Artisanal', href: '/catalogue' },
        { id: 'modern', title: 'Architectural Light', description: 'Consistent light shade veneers optimizing natural light for large-scale modern architectural projects.', image: `${R2}/room%20with%20light%20coming%20from%20windows%20and%20light%20shade%20veneers.jpeg`, tag: 'Modern', href: '/catalogue' },
        { id: 'dark-fluted', title: 'Dark Fluted Elegance', description: 'A sophisticated harmony of dark fumed fluted veneer accented with light panels.', image: `${R2}/fluted%20dark%20colored%20veneer%20in%20the%20background%20with%20light%20colored%20veneer%20in%20the%20rest%20of%20the%20area.jpeg`, tag: 'Premium', href: '/catalogue' },
        { id: 'checkered', title: 'White Checkered', description: 'Bespoke checkered patterns offering a vivid and dynamic visual texture to any expanse.', image: `${R2}/full%20room%20view%20with%20balcone%20and%20TC%20with%20white%20chekered%20veneer%20.jpeg`, tag: 'Bespoke', href: '/catalogue' },
        { id: 'grand-lobby', title: 'Grand Walnut', description: 'Deep, rich dark-colored veneers perfect for wide window panes and sweeping lobbies.', image: `${R2}/full%20room%20view%20with%20lobby%20and%20wide%20window%20pane%20and%20dark%20colored%20veneer.jpeg`, tag: 'Grand', href: '/catalogue' },
        { id: 'contemporary', title: 'Smoked Gray', description: 'Subtle brownish-gray tones lending a calm, contemporary ambiance to minimalist spaces.', image: `${R2}/room%20with%20slight%20brownish%20gray%20veneer%20throughout%20the%20background%20and%20one%20wall%20with%20one%20side%20open%20window.jpeg`, tag: 'Contemporary', href: '/catalogue' },
      ],
    },
    faqs: {
      items: [
        { q: 'What is wood veneer?', a: 'Wood veneer is a thin, precision-cut slice of real natural wood — typically 0.5mm to 3mm thick — bonded to a substrate such as MDF or plywood. It delivers the warmth, grain, and character of solid timber at a fraction of the weight and cost, making it the preferred choice of architects and interior designers worldwide.' },
        { q: 'What types of wood veneer sheets do you stock?', a: 'Our Nagpur showroom carries over 200 varieties of natural veneer sheets including teak veneer, oak veneer, walnut veneer, burl wood veneer, smoked walnut, fluted veneer panels, Nordic charcoal, wenge, and a full range of exotic and architectural veneers. Every piece is hand-selected for consistency and quality.' },
        { q: 'Where is your veneer showroom located in Nagpur?', a: 'M Bros Veneers is located at 81, Queta Colony, Lakadganj, Nagpur — 440008, Maharashtra. We are conveniently accessible from Sitabuldi, Dharampeth, and central Nagpur. Open Monday to Saturday, 10:00 AM to 8:00 PM. Sundays by appointment only.' },
        { q: 'What is the difference between veneer and laminate?', a: 'Veneer is a real wood surface — it ages gracefully, can be re-sanded and re-polished, and carries the natural warmth only genuine timber offers. Laminate is a synthetic material with a printed wood pattern. For premium furniture, doors, cabinets, and feature walls, veneer is the material of distinction.' },
        { q: 'Can I use veneer sheets for furniture and cabinets?', a: 'Absolutely. Veneer sheets are ideal for furniture surfaces, cabinet fronts, wardrobe shutters, and bespoke joinery. Teak, oak, and walnut veneer are especially popular for furniture-grade applications. Visit our showroom to choose from physical swatches before placing your order.' },
        { q: 'Can I visit the showroom to see veneer samples in person?', a: 'Yes — and we strongly encourage it. The true character of a wood veneer is best experienced in person: the grain depth, the surface texture, the way light plays across it. Visit us at Lakadganj, Nagpur, Monday to Saturday. For architects and designers with large requirements, private viewings can be arranged.' },
        { q: 'Do you supply bulk veneer sheets for commercial projects?', a: 'Yes. We are a trusted commercial veneer supplier across Central India, regularly supplying bulk veneer sheets to hotel groups, corporate fit-out contractors, residential developers, and large-scale interior projects. Contact us with your project specifications for a tailored quote.' },
        { q: 'Do you work with architects and interior designers?', a: 'Veneer selection is a core part of our offering for the design community. We work closely with architects, interior designers, and specification consultants to source the right veneer for each project. We offer expert material guidance, sample packs, and dedicated support throughout your project.' },
        { q: 'How do I choose the right veneer for my project?', a: 'Start with the setting: lighter veneers like ash and oak work well in spaces with natural light; dark veneers like fumed oak or smoked walnut add depth in statement rooms. Consider the application — furniture, wall panels, or doors — and always evaluate a physical swatch in the actual lighting of your space. Our team is available to advise.' },
        { q: 'How do I get a price for wood veneer sheets in Nagpur?', a: 'Pricing depends on species, grade, sheet size, and quantity. We offer competitive rates for both retail and bulk orders. Visit our Nagpur showroom or send us your project brief via the contact form below — our team will respond within 24 hours with a detailed quote.' },
      ],
    },
  },
  pages: {
    burl: {
      title: 'Exotic Burl Wood Veneers in Nagpur | M Bros Veneers',
      h1: 'Exotic Burl Wood Veneers in Nagpur',
      subtitle: 'Rare, Hand-Selected Patterns for Luxury Interiors',
      description: "Discover M Bros Veneers' exclusive collection of exotic burl wood veneer sheets in Nagpur — rare, one-of-a-kind swirling grain patterns sourced from the most remote forests in the world. Ideal for luxury interior design, bespoke furniture, and architectural accent walls.",
      canonical: 'https://mbrosveneers.com/veneers/burl',
      ogTitle: 'Exotic Burl Wood Veneers in Nagpur | M Bros Veneers',
      ogDesc: 'Shop rare burl wood veneer sheets in Nagpur. Hand-selected exotic burl patterns for luxury interiors and architectural projects. Visit our Lakadganj showroom.',
      heroImage: `${R2}/complete%20room%20with%20balcony%20view.jpeg`,
      items: [
        { title: 'Royal Ebony Burl', tag: 'Exotic Series', image: `${R2}/catalogue_asset/IMG_5110.JPG` },
        { title: 'Geometric Array', tag: 'Bespoke', image: `${R2}/catalogue_asset/DSC06765.JPG` },
        { title: 'Veneer Swatch Collection', tag: 'Reference', image: `${R2}/catalogue_asset/C1311FB5-0B7A-4C65-B51D-A9E9F996F3A6.jpg` },
      ],
      faqs: [
        { q: 'What is burl wood veneer?', a: 'Burl veneer is cut from abnormal rounded growths on tree trunks, producing unique swirling grain patterns found nowhere else in nature. No two burl veneer sheets are identical, making them highly prized for luxury interiors.' },
        { q: 'What is the difference between veneer and laminate?', a: 'Wood veneer is a real, thin slice of natural wood bonded to a substrate. Laminate is a synthetic material printed to mimic wood. Veneer offers genuine grain warmth, aging character, and is more environmentally sustainable than laminate.' },
        { q: 'Where can I buy burl wood veneer in Nagpur?', a: 'M Bros Veneers at 81, Queta Colony, Lakadganj, Nagpur stocks one of the largest collections of exotic burl wood veneers in Central India. Visit our showroom Monday–Saturday, 10 AM–8 PM.' },
      ],
    },
    teak: {
      title: 'Natural Teak Wood Veneers in Nagpur | M Bros Veneers',
      h1: 'Natural Teak Wood Veneers in Nagpur',
      subtitle: 'Premium Teak Veneer Sheets for Every Interior Style',
      description: "Browse M Bros Veneers' premium natural teak wood veneer sheets in Nagpur. From classic Golden Teak Crown cuts to chestnut-grain finishes, our teak veneer collection is ideal for wall panelling, bespoke furniture, and interior design projects across Central India.",
      canonical: 'https://mbrosveneers.com/veneers/teak',
      ogTitle: 'Natural Teak Wood Veneers in Nagpur | M Bros Veneers',
      ogDesc: 'Premium natural teak wood veneer sheets in Nagpur for furniture, wall panelling, and interior design. Visit our showroom in Lakadganj.',
      heroImage: `${R2}/brown%20wood%20textured%20veneer%20with%20light%20colored%20sofa%20in%20the%20foreground.jpeg`,
      items: [
        { title: 'Golden Teak Crown', tag: 'Classic', image: `${R2}/catalogue_asset/IMG_5339.JPG` },
        { title: 'Chestnut Grain', tag: 'Classic', image: `${R2}/catalogue_asset/IMG_5341.JPG` },
        { title: 'Smoked Walnut', tag: 'Premium', image: `${R2}/catalogue_asset/IMG_5118.JPG` },
      ],
      faqs: [
        { q: 'What is teak wood veneer used for?', a: 'Teak veneer is widely used for wall panelling, furniture surfaces, cabinet doors, flooring overlays, and interior accent features. It provides the warmth and natural grain of solid teak at a fraction of the cost.' },
        { q: 'How do I choose the best veneer for furniture?', a: 'For furniture, choose a veneer with consistent grain and no knots for a clean look. Teak veneer is excellent for durability; oak for a classic feel. Always request a physical swatch from our Nagpur showroom before committing.' },
        { q: 'Veneer vs plywood — what is the difference?', a: 'Plywood is a structural board made of multiple wood layers. Veneer is a decorative surface material applied over plywood or MDF. Veneers give plywood furniture the look of solid wood at a much lower cost and weight.' },
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
      heroImage: `${R2}/room%20with%20light%20coming%20from%20windows%20and%20light%20shade%20veneers.jpeg`,
      items: [
        { title: 'Dark Fumed Oak', tag: 'Heritage', image: `${R2}/catalogue_asset/IMG_5121.JPG` },
        { title: 'Textured Ash', tag: 'Textured', image: `${R2}/catalogue_asset/IMG_5119.JPG` },
        { title: 'Nordic Charcoal', tag: 'Minimalist', image: `${R2}/catalogue_asset/IMG_6041.JPG` },
      ],
      faqs: [
        { q: 'What types of oak veneer are available in Nagpur?', a: 'At M Bros Veneers Nagpur, we stock European oak in multiple finishes including dark fumed oak, natural ash, smoked oak, and Nordic charcoal — suitable for both classic and contemporary interior styles.' },
        { q: 'How do I maintain wood veneer sheets?', a: 'Clean wood veneer with a soft, slightly damp cloth. Avoid harsh chemicals, excess moisture, and direct sunlight. Use a quality wood oil or polish every 6–12 months to preserve the finish. Properly maintained veneer can last decades.' },
        { q: 'Is oak veneer suitable for wall panelling?', a: 'Yes. Oak veneer is one of the most popular choices for interior wall panelling due to its clean grain, durability, and ability to complement a wide range of design styles from traditional to modern minimalist.' },
        { q: 'What is the difference between veneer and laminate for doors?', a: 'Veneer-covered doors use a real wood surface that can be sanded, re-polished, and refinished. Laminate doors have a plastic surface that cannot be restored once scratched. Veneer is the premium, longer-lasting choice for doors and cabinetry.' },
      ],
    },
  },
  seo: {
    home: {
      title: 'Wood Veneers in Nagpur | M Bros Veneers Showroom',
      description:
        "Nagpur's leading veneer showroom. Shop 200+ natural & decorative veneer sheets for furniture, doors, cabinets & interiors. Trusted by architects since 1990.",
      keywords:
        'wood veneers in Nagpur, veneer sheets supplier Nagpur, natural veneer dealer Nagpur, decorative veneer sheets Nagpur, veneer showroom Nagpur, teak veneer sheets, oak veneer sheets, burl veneer sheets, fluted veneer panels, veneer for interior design',
      ogImage: `${R2}/complete%20room%20with%20balcony%20view.jpeg`,
      canonical: 'https://mbrosveneers.com/',
    },
  },
};
