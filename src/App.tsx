import * as React from 'react';
import { useState, useEffect } from 'react';
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
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop',
    tag: 'Rare'
  },
  {
    id: 'classic',
    title: 'Heritage Oaks',
    description: 'The foundation of luxury. Timeless European Oaks and American Walnuts.',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=2070&auto=format&fit=crop',
    tag: 'Heritage'
  },
  {
    id: 'smoked',
    title: 'Smoked Eucalyptus',
    description: 'Deep, mysterious tones achieved through precision fuming for a velvety finish.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop',
    tag: 'Artisanal'
  },
  {
    id: 'dyed',
    title: 'Architectural Dyed',
    description: 'Consistent color saturation for large-scale modern architectural projects.',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=2070&auto=format&fit=crop',
    tag: 'Modern'
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
    { name: 'Collections', href: '#collections' },
    { name: 'Showroom', href: '#showroom' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-wood-cream/95 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-wood-dark flex items-center justify-center rounded-sm shadow-lg">
            <span className="text-wood-cream font-serif text-xl font-bold">M</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className={`text-xl md:text-2xl font-serif font-bold tracking-tight ${isScrolled ? 'text-wood-dark' : 'text-white'}`}>
              M BROS
            </span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">VENEERS</span>
          </div>
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

  function onSubmit(values: z.infer<typeof appointmentSchema>) {
    console.log(values);
    alert("Appointment request sent! We will contact you shortly.");
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
            <Button type="submit" className="w-full bg-wood-dark text-wood-cream hover:bg-wood-medium rounded-none uppercase tracking-widest">
              Confirm Request
            </Button>
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
              <Button className="bg-gold text-wood-dark hover:bg-white transition-all rounded-none px-10 py-8 text-sm uppercase tracking-[0.2em] font-bold shadow-2xl">
                View Collections
              </Button>
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
          <Button variant="link" className="text-wood-dark p-0 h-auto uppercase tracking-[0.2em] text-xs font-bold group">
            View Full Catalog <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
          </Button>
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
              <Card className="group cursor-pointer overflow-hidden border-none rounded-none bg-transparent h-full flex flex-col">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative aspect-[4/5] overflow-hidden mb-8 shadow-2xl shrink-0">
                    <img 
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
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
                alt="Showroom Interior" 
                className="w-full h-full object-cover rounded-sm"
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

const Offers = () => {
  return (
    <section className="py-32 bg-wood-cream border-y border-wood-light/10">
      <div className="container mx-auto px-6">
        <div className="bg-wood-dark text-wood-cream p-12 md:p-24 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=2070&auto=format&fit=crop" 
              alt="Wood Texture" 
              className="w-full h-full object-cover"
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

const ContactSection = () => {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    console.log(values);
    alert("Message sent! We will get back to you soon.");
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
                  <Button type="submit" className="w-full md:w-auto bg-wood-dark text-wood-cream hover:bg-wood-medium rounded-none px-12 py-6 uppercase tracking-widest font-bold">
                    Send Message
                  </Button>
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
                      <p className="text-wood-dark font-medium">+91 98230 00000</p>
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

const Footer = () => {
  return (
    <footer className="bg-wood-cream border-t border-wood-light/20 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-wood-dark flex items-center justify-center rounded-sm">
                <span className="text-wood-cream font-serif text-lg font-bold">M</span>
              </div>
              <span className="text-xl font-serif font-bold tracking-tight text-wood-dark">
                M BROS <span className="text-gold">VENEERS</span>
              </span>
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
              <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
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
  return (
    <div className="min-h-screen selection:bg-gold selection:text-wood-dark">
      <Navbar />
      <main>
        <Hero />
        <Collections />
        <Offers />
        <Showroom />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
