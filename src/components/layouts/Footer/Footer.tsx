import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-white border-t border-white/10">
      <div className="container mx-auto px-6 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Rangdhanu <span className="text-primary">IT</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Leading IT solutions provider specializing in web development, app development, and digital marketing.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2 bg-white/5 border border-white/10 rounded-full hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-white/5 border border-white/10 rounded-full hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-white/5 border border-white/10 rounded-full hover:text-primary transition-colors">
                <MapPin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-sm text-zinc-400">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-6 text-white">Our Services</h4>
            <ul className="flex flex-col gap-4 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">App Development</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Digital Marketing</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Graphics Design</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">SEO Services</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
            <ul className="flex flex-col gap-4 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-zinc-300">Sector 10, Uttara, Dhaka-1230, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-zinc-300">+880 123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-zinc-300">info@rangdhanuit.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 md:mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-400">
            © {currentYear} Rangdhanu IT. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-zinc-400">
            <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
