import * as React from 'react';
import { useState, useEffect } from 'react';
import Catalogue from './Catalogue';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Instagram, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  ChevronRight, 
  ArrowRight,
  Award,
  ShieldCheck,
  Trees,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from '@emailjs/browser';

// --- Types & Constants ---

const appointmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  date: z.string().min(1, "Please select a date"),
  message: z.string().optional(),
});

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const COLLECTIONS = [
  {
    id: 'exotic',
    title: 'Exotic Burls',
    description: 'Rare burl patterns and unique grains sourced from the most remote corners of the world.',
    image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/complete%20room%20with%20balcony%20view.jpeg',
    tag: 'Rare'
  },
  {
    id: 'classic',
    title: 'Heritage Oaks',
    description: 'The foundation of luxury. Timeless European Oaks offering beautiful continuous wood grain.',
    image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/brown%20wood%20textured%20veneer%20with%20light%20colored%20sofa%20in%20the%20foreground.jpeg',
    tag: 'Heritage'
  },
  {
    id: 'fluted',
    title: 'Fluted Veneer',
    description: 'Elegant vertical grain patterns and rich textures creating stunning interior feature walls.',
    image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/fluted%20veneer%20.jpeg',
    tag: 'Artisanal'
  },
  {
    id: 'modern',
    title: 'Architectural Light',
    description: 'Consistent light shade veneers optimizing natural light for large-scale modern architectural projects.',
    image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/room%20with%20light%20coming%20from%20windows%20and%20light%20shade%20veneers.jpeg',
    tag: 'Modern'
  },
  {
    id: 'dark-fluted',
    title: 'Dark Fluted Elegance',
    description: 'A sophisticated harmony of dark fumed fluted veneer accented with light panels.',
    image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/fluted%20dark%20colored%20veneer%20in%20the%20background%20with%20light%20colored%20veneer%20in%20the%20rest%20of%20the%20area.jpeg',
    tag: 'Premium'
  },
  {
    id: 'checkered',
    title: 'White Checkered',
    description: 'Bespoke checkered patterns offering a vivid and dynamic visual texture to any expanse.',
    image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/full%20room%20view%20with%20balcone%20and%20TC%20with%20white%20chekered%20veneer%20.jpeg',
    tag: 'Bespoke'
  },
  {
    id: 'grand-lobby',
    title: 'Grand Walnut',
    description: 'Deep, rich dark-colored veneers perfect for wide window panes and sweeping lobbies.',
    image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/full%20room%20view%20with%20lobby%20and%20wide%20window%20pane%20and%20dark%20colored%20veneer.jpeg',
    tag: 'Grand'
  },
  {
    id: 'contemporary',
    title: 'Smoked Gray',
    description: 'Subtle brownish-gray tones lending a calm, contemporary ambiance to minimalist spaces.',
    image: 'https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/room%20with%20slight%20brownish%20gray%20veneer%20throughout%20the%20background%20and%20one%20wall%20with%20one%20side%20open%20window.jpeg',
    tag: 'Contemporary'
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Catalogue', href: '#/catalogue' },
    { name: 'Collections', href: '#collections' },
    { name: 'Showroom', href: '#showroom' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-wood-cream/95 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center shrink-0">
          <img 
            src="https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/logo/M%20BROS%20VENEERS%20%26%20PLY%20LOGO.PNG" 
            alt="M Bros Veneers Logo" 
            className={`transition-all duration-500 ${isScrolled ? 'h-10' : 'h-16'} object-contain`}
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm uppercase tracking-widest font-medium transition-colors hover:text-gold ${isScrolled ? 'text-wood-dark' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <AppointmentDialog>
            <Button className={`${isScrolled ? 'bg-wood-dark text-wood-cream' : 'bg-gold text-wood-dark'} hover:bg-wood-medium hover:text-wood-cream rounded-none px-6 uppercase tracking-widest text-xs transition-all duration-300`}>
              Book Viewing
            </Button>
          </AppointmentDialog>
        </div>

        {/* Mobile Menu Toggle */}
        <button className={`${isScrolled ? 'text-wood-dark' : 'text-white'} md:hidden`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-wood-cream border-t border-wood-light/20 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-serif text-wood-dark"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <AppointmentDialog>
                <Button className="w-full bg-wood-dark text-wood-cream rounded-none uppercase tracking-widest">
                  Book Private Viewing
                </Button>
              </AppointmentDialog>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const AppointmentDialog = ({ children }: { children: React.ReactElement }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof appointmentSchema>) {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    try {
      await emailjs.send(
        'service_cgxlu6r',
        'template_fppwhse',
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
          preferred_date: values.date,
        },
        'NPtOCVI7yLpyBNURh'
      );
      setSubmitStatus({ type: 'success', message: 'Appointment request sent! We will contact you shortly.' });
      form.reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus({ type: 'error', message: 'Failed to send the request, please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-[425px] bg-wood-cream border-wood-light/20">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-wood-dark">Book a Private Viewing</DialogTitle>
          <DialogDescription className="text-wood-medium">
            Experience our exotic collections in person at our Nagpur showroom.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-wood-dark">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} className="rounded-none border-wood-light/40" />
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
                  <FormLabel className="text-wood-dark">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} className="rounded-none border-wood-light/40" />
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
                  <FormLabel className="text-wood-dark">Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 00000 00000" {...field} className="rounded-none border-wood-light/40" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-wood-dark">Preferred Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="rounded-none border-wood-light/40" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} type="submit" className="w-full bg-wood-dark text-wood-cream hover:bg-wood-medium rounded-none uppercase tracking-widest">
              {isSubmitting ? "Sending..." : "Confirm Request"}
            </Button>
            {submitStatus.type && (
              <div className={`px-4 py-2 mt-4 text-sm font-medium border-l-4 ${submitStatus.type === 'success' ? 'border-green-500 text-green-700 bg-green-50' : 'border-red-500 text-red-700 bg-red-50'}`}>
                {submitStatus.message}
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2064&auto=format&fit=crop" 
          alt="Luxury Wood Interior" 
          className="w-full h-full object-cover scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-gold uppercase tracking-[0.5em] text-xs font-bold mb-6 block">
              The Art of Fine Timber • Nagpur
            </span>
            <h1 className="text-6xl md:text-9xl font-serif text-white leading-[0.9] mb-10 premium-text-shadow">
              Exotic <br />
              <span className="italic text-gold">Veneers</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mb-12 font-light max-w-2xl leading-relaxed">
              Curating the world's most prestigious wood surfaces for visionary architects and bespoke interiors.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="#collections">
                <Button className="bg-gold text-wood-dark hover:bg-white transition-all rounded-none px-10 py-8 text-sm uppercase tracking-[0.2em] font-bold shadow-2xl w-full sm:w-auto">
                  View Collections
                </Button>
              </a>
              <AppointmentDialog>
                <Button variant="outline" className="border-white/60 text-white hover:bg-white hover:text-wood-dark transition-all rounded-none px-10 py-8 text-sm uppercase tracking-[0.2em] font-bold backdrop-blur-md bg-transparent">
                  Book Viewing
                </Button>
              </AppointmentDialog>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30" />
      </motion.div>
    </section>
  );
};

const Collections = () => {
  const [selectedItem, setSelectedItem] = useState<typeof COLLECTIONS[0] | null>(null);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedItem]);

  return (
    <section id="collections" className="py-32 md:py-48 bg-wood-cream relative overflow-hidden">
      {/* Decorative background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none wood-grain-overlay" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-3xl">
            <span className="text-wood-medium uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Curated Selection</span>
            <h2 className="text-5xl md:text-7xl font-serif text-wood-dark mb-8">
              Exotic <span className="italic">Masterpieces</span>
            </h2>
            <p className="text-wood-medium text-xl font-light leading-relaxed">
              Our gallery features over 200+ varieties of natural wood veneers, each hand-selected for its unique character and architectural potential.
            </p>
          </div>
          <a href="#/catalogue">
            <Button variant="link" className="text-wood-dark p-0 h-auto uppercase tracking-[0.2em] text-xs font-bold group">
              View Full Catalog <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {COLLECTIONS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className="group cursor-pointer overflow-hidden border-none rounded-none bg-transparent h-full flex flex-col"
                onClick={() => setSelectedItem(item)}
              >
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative aspect-[4/5] overflow-hidden mb-8 shadow-2xl shrink-0">
                    <motion.img 
                      layoutId={`card-img-${item.id}`}
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    <div className="absolute top-6 right-6 bg-wood-dark/90 text-gold text-[10px] uppercase tracking-[0.3em] px-4 py-2 backdrop-blur-md border border-gold/20">
                      {item.tag}
                    </div>
                  </div>
                  <h3 className="text-3xl font-serif text-wood-dark mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-wood-medium text-base font-light leading-relaxed mb-6 line-clamp-2">{item.description}</p>
                  <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-gold flex items-center gap-3 group-hover:gap-5 transition-all duration-500">
                    Discover Collection <ArrowRight size={14} />
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded View Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <div 
              className="absolute inset-0 bg-wood-dark/95 backdrop-blur-2xl cursor-zoom-out" 
              onClick={() => setSelectedItem(null)} 
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-7xl bg-wood-cream shadow-2xl flex flex-col lg:flex-row overflow-hidden z-10 max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 bg-black/20 hover:bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-all rounded-full group outline-none"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
              </button>

              <div className="w-full lg:w-[60%] h-[40vh] lg:h-[85vh] relative overflow-hidden bg-black shrink-0">
                <motion.img 
                  layoutId={`card-img-${selectedItem.id}`}
                  src={selectedItem.image} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="w-full lg:w-[40%] p-8 lg:p-16 flex flex-col justify-center bg-wood-cream relative h-full shrink-0 overflow-y-auto custom-scrollbar">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/40 to-transparent" />
                <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">
                  Archive No. {selectedItem.id.substring(0, 3).toUpperCase()} {new Date().getFullYear()}
                </span>
                <h3 className="text-4xl lg:text-6xl font-serif text-wood-dark mb-6 tracking-tight leading-tight">
                  {selectedItem.title}
                </h3>
                <div className="w-12 h-[1px] bg-wood-light/30 mb-8" />
                <p className="text-wood-medium text-lg lg:text-xl font-light leading-relaxed mb-10">
                  {selectedItem.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-wood-dark mb-12">
                  <span className="px-4 py-2 border border-wood-light/20">{selectedItem.tag} Collection</span>
                </div>

                <a href="#contact" onClick={() => setSelectedItem(null)}>
                  <Button className="w-full bg-wood-dark text-wood-cream hover:bg-gold hover:text-wood-dark transition-all duration-500 rounded-none py-8 uppercase tracking-[0.2em] font-bold group flex items-center justify-center gap-4">
                    Inquire Availability
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Showroom = () => {
  return (
    <section id="showroom" className="py-32 md:py-48 bg-wood-dark text-wood-cream overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-6 block">
              The Experience Center
            </span>
            <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-tight">
              Nagpur's Premier <br />
              <span className="italic text-gold">Veneer Gallery</span>
            </h2>
            <p className="text-wood-light text-xl mb-12 leading-relaxed font-light">
              Located in the heart of Lakadganj, our showroom is a sensory journey through nature's finest textures. We invite you to experience the warmth and depth of real wood in a space designed for inspiration.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-16">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-wood-medium flex items-center justify-center shrink-0">
                  <Trees className="text-gold" size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1">200+ Varieties</h4>
                  <p className="text-wood-light text-sm">The largest collection in Central India.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-wood-medium flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-gold" size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1">Quality Assured</h4>
                  <p className="text-wood-light text-sm">Sourced from sustainable forests.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-wood-medium flex items-center justify-center shrink-0">
                  <Award className="text-gold" size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1">Expert Guidance</h4>
                  <p className="text-wood-light text-sm">Consultation for architects & designers.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-wood-medium flex items-center justify-center shrink-0">
                  <Clock className="text-gold" size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1">30 Years Legacy</h4>
                  <p className="text-wood-light text-sm">Trusted by generations in Nagpur.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-4">
                <MapPin className="text-gold" />
                <span className="text-sm font-light">81, Queta Colony, Lakadganj, Nagpur</span>
              </div>
              <a 
                href="https://maps.app.goo.gl/uYq6NxYmGsNvMEaT7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold text-sm uppercase tracking-widest font-bold hover:underline"
              >
                Get Directions
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square relative z-10">
              <img 
                src="https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/showroom_images/DSC06721.JPG" 
                alt="M Bros Veneers Showroom Exterior" 
                className="w-full h-full object-cover rounded-sm border border-wood-light/10"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 border border-gold/20 z-0" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-wood-medium/30 z-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ShowroomGallery = () => {
  const images = [
    "https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/showroom_images/IMG_5678.JPG",
    "https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/showroom_images/IMG_5665.JPG",
    "https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/showroom_images/IMG_5680.JPG",
    "https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/showroom_images/DSC06641.JPG",
    "https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/showroom_images/IMG_5679.JPG",
    "https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/showroom_images/IMG_5688.JPG"
  ];

  return (
    <section className="py-20 bg-wood-dark overflow-hidden border-t border-wood-light/10">
      <div className="container mx-auto px-6 mb-12">
        <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold block text-center">Inside The Gallery</span>
      </div>
      <div className="relative w-full flex overflow-x-hidden">
        <motion.div 
          className="flex whitespace-nowrap gap-6 px-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
        >
          {/* Duplicate images array to create seamless loop */}
          {[...images, ...images].map((img, index) => (
            <div 
              key={index} 
              className="relative w-[300px] md:w-[450px] lg:w-[600px] aspect-[4/3] shrink-0 overflow-hidden bg-black rounded-sm group"
            >
              <img 
                src={img} 
                alt={`Showroom View ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-80 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Offers = () => {
  return (
    <section className="py-32 bg-wood-cream border-y border-wood-light/10">
      <div className="container mx-auto px-6">
        <div className="bg-wood-dark text-wood-cream p-12 md:p-24 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
            <img 
              src="https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/fluted%20dark%20colored%20veneer%20in%20the%20background%20with%20light%20colored%20veneer%20in%20the%20rest%20of%20the%20area.jpeg" 
              alt="Wood Texture" 
              className="w-full h-full object-cover grayscale opacity-50 mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-6 block">Seasonal Curation</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              The <span className="italic">Spring</span> <br />
              Burl Collection
            </h2>
            <p className="text-wood-light text-lg mb-10 font-light leading-relaxed">
              Exclusive early access to our newly arrived Italian Walnut burls. Limited stock available for bespoke architectural projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <Button className="bg-gold text-wood-dark hover:bg-white transition-all rounded-none px-10 py-6 text-xs uppercase tracking-widest font-bold">
                Inquire Now
              </Button>
              <span className="text-gold font-serif italic text-xl">Up to 15% off for architects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CuratedPalettes = () => {
  const pallets = [
    "https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/pallets/8c18080c-d49a-4f71-9a4f-ed9a0c72ab2e.jpg",
    "https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/pallets/DSC06764.JPG",
    "https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/pallets/DSC06783.JPG",
    "https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/pallets/IMG_5695.JPG"
  ];
  
  return (
    <section className="py-24 md:py-32 bg-wood-cream border-t border-wood-light/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-wood-medium uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Endless Possibilities</span>
            <h2 className="text-4xl md:text-5xl font-serif text-wood-dark mb-6">
              Bespoke <span className="italic">Palettes</span>
            </h2>
            <p className="text-wood-medium text-lg font-light leading-relaxed">
              Discover a spectrum of hues, grains, and finishes. Our comprehensive swatches allow visionaries to perfectly match any aesthetic requirement in person.
            </p>
          </div>
          <a href="#/catalogue">
            <Button variant="outline" className="border-wood-dark text-wood-dark hover:bg-wood-dark hover:text-wood-cream transition-all rounded-none px-8 py-6 text-xs uppercase tracking-[0.2em] font-bold">
              Explore Full Catalog
            </Button>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pallets.map((img, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, delay: idx * 0.15 }}
               viewport={{ once: true }}
               className="group relative w-full aspect-[4/3] overflow-hidden bg-wood-dark rounded-sm shadow-xl"
             >
               <img 
                 src={img} 
                 alt={`Curated Palette ${idx + 1}`} 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

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
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif text-wood-dark mb-6">Get in <span className="italic">Touch</span></h2>
            <p className="text-wood-medium max-w-2xl mx-auto">
              Have a specific requirement or want to inquire about a collection? Fill out the form below and our experts will assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} className="rounded-none border-wood-light/40 h-12" />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} className="rounded-none border-wood-light/40 h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Inquiry about Exotic Veneers" {...field} className="rounded-none border-wood-light/40 h-12" />
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your project..." {...field} className="rounded-none border-wood-light/40 min-h-[150px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Button disabled={isSubmitting} type="submit" className="w-full md:w-auto bg-wood-dark text-wood-cream hover:bg-wood-medium rounded-none px-12 py-6 uppercase tracking-widest font-bold">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                    {submitStatus.type && (
                      <div className={`px-4 py-2 text-sm font-medium border-l-4 ${submitStatus.type === 'success' ? 'border-green-500 text-green-700 bg-green-50' : 'border-red-500 text-red-700 bg-red-50'}`}>
                        {submitStatus.message}
                      </div>
                    )}
                  </div>
                </form>
              </Form>
            </div>

            <div className="space-y-10">
              <div>
                <h4 className="font-serif text-2xl text-wood-dark mb-4">Contact Info</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Phone className="text-gold shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-xs uppercase tracking-widest text-wood-medium mb-1">Call Us</p>
                      <p className="text-wood-dark font-medium">+91 99221 66866</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="text-gold shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-xs uppercase tracking-widest text-wood-medium mb-1">Email Us</p>
                      <p className="text-wood-dark font-medium">info@mbrosveneers.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-2xl text-wood-dark mb-4">Showroom Hours</h4>
                <div className="space-y-2 text-sm text-wood-medium">
                  <div className="flex justify-between border-b border-wood-light/20 pb-2">
                    <span>Mon - Sat</span>
                    <span className="text-wood-dark font-medium">10:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-wood-light/20 pb-2">
                    <span>Sunday</span>
                    <span className="text-wood-dark font-medium">By Appointment Only</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-2xl text-wood-dark mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="https://instagram.com/mbrosveneers" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-wood-light/40 flex items-center justify-center text-wood-dark hover:bg-wood-dark hover:text-wood-cream transition-all">
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PrivacyDialog = ({ children }: { children: React.ReactElement }) => {
  return (
    <Dialog>
      <DialogTrigger render={children} />
      <DialogContent className="w-[95vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[85vh] overflow-y-auto bg-wood-cream border-wood-light/20 custom-scrollbar p-6 md:p-12 lg:p-20 transition-all duration-500">
        <DialogHeader className="mb-10">
          <DialogTitle className="font-serif text-3xl md:text-5xl lg:text-6xl text-wood-dark mb-4 leading-tight">Privacy Policy</DialogTitle>
          <DialogDescription className="text-wood-medium text-lg">
            How we protect your experience at M Bros Veneers.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-12 text-wood-dark font-light leading-relaxed py-8">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <h4 className="font-serif text-2xl text-wood-dark font-bold">Our Commitment</h4>
            <p className="md:col-span-2 text-lg">At M Bros Veneers, we understand that luxury is built on trust. We are dedicated to protecting the personal information you share with us through our website and our Nagpur showroom.</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <h4 className="font-serif text-2xl text-wood-dark font-bold">Information We Collect</h4>
            <div className="md:col-span-2 space-y-4">
              <p className="text-lg">We only collect information that helps us serve you better, specifically:</p>
              <ul className="list-disc pl-5 space-y-2 text-lg">
                <li><strong>Personal Details:</strong> Your name, email address, and phone number when booking a private viewing or inquiring about our collections.</li>
                <li><strong>Interaction Data:</strong> Basic technical details about your visit to help us improve our website experience.</li>
              </ul>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <h4 className="font-serif text-2xl text-wood-dark font-bold">How We Use Your Data</h4>
            <p className="md:col-span-2 text-lg">Your information is used exclusively to coordinate your showroom visits and respond to your architectural requirements. We do not sell, rent, or trade your personal data with any third parties.</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <h4 className="font-serif text-2xl text-wood-dark font-bold">Security & Storage</h4>
            <p className="md:col-span-2 text-lg">We use industry-standard security measures to ensure your data is handled safely. Requests are processed securely and your information is only accessible to authorized team members assisting with your project.</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <h4 className="font-serif text-2xl text-wood-dark font-bold">Contact Us</h4>
            <div className="md:col-span-2">
              <p className="text-lg mb-6">If you have any questions about our privacy practices, or if you would like to update or remove your information from our records, please reach out to our team:</p>
              <div className="p-8 bg-wood-dark text-wood-cream border-l-4 border-gold">
                <p className="font-serif text-2xl text-gold mb-2">M Bros Veneers</p>
                <p className="text-lg">81, Queta Colony, Lakadganj, Nagpur</p>
                <p className="text-lg">Maharashtra, India - 440008</p>
                <p className="mt-4 text-gold text-lg">Email: info@mbrosveneers.com</p>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Footer = () => {
  return (
    <footer className="bg-wood-cream border-t border-wood-light/20 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="https://pub-7357fd3d80834c06ae56c110336d6783.r2.dev/logo/M%20BROS%20VENEERS%20%26%20PLY%20LOGO.PNG" 
                alt="M Bros Veneers Logo" 
                className="h-24 md:h-32 object-contain"
              />
            </div>
            <p className="text-wood-medium max-w-md mb-8 leading-relaxed">
              Nagpur's premier destination for luxury wood veneers. We bring the world's finest timber textures to your doorstep, ensuring every architectural vision is realized with perfection.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-wood-dark hover:text-gold transition-colors"><Instagram size={24} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl text-wood-dark mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-wood-medium">
              <li><a href="#" className="hover:text-gold transition-colors">Home</a></li>
              <li><a href="#collections" className="hover:text-gold transition-colors">Collections</a></li>
              <li><a href="#showroom" className="hover:text-gold transition-colors">Showroom</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors">Contact</a></li>
              <li>
                <PrivacyDialog>
                  <button className="hover:text-gold transition-colors p-0 h-auto bg-transparent border-none cursor-pointer">
                    Privacy Policy
                  </button>
                </PrivacyDialog>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl text-wood-dark mb-6">Newsletter</h4>
            <p className="text-sm text-wood-medium mb-4">Subscribe to receive updates on new arrivals and special offers.</p>
            <div className="flex gap-2">
              <Input placeholder="Email Address" className="rounded-none border-wood-light/40 bg-white" />
              <Button className="bg-wood-dark text-wood-cream hover:bg-wood-medium rounded-none px-4">
                Join
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-wood-light/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-wood-medium uppercase tracking-widest">
            © {new Date().getFullYear()} M Bros Veneers. All Rights Reserved.
          </p>
          <p className="text-xs text-wood-medium uppercase tracking-widest">
            Designed for Luxury
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPath(window.location.hash);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const isCatalogue = currentPath.startsWith('#/catalogue');

  return (
    <div className="min-h-screen selection:bg-gold selection:text-wood-dark">
      {!isCatalogue && <Navbar />}
      {isCatalogue ? (
        <Catalogue />
      ) : (
        <>
          <main>
            <Hero />
            <Collections />
            <Offers />
            <Showroom />
            <ShowroomGallery />
            <CuratedPalettes />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
