import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import Logo from "@/assets/Logo";
import { getServices } from "@/services/Service/services";
import { IService } from "@/types/Service/service.types";

const Footer = async () => {
  const currentYear = new Date().getFullYear();

  // Fetch all real services from the database to ensure zero broken links
  const res = await getServices();
  const allServices = (res?.data as IService[]) || [];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const contactData = {
    address: "278, 1W Monipur, Mirpur, Dhaka-1230, Bangladesh",
    phone: "+88017 105 104 77",
    email: "info@rangdhanuit.com",
    facebook: "https://www.facebook.com/rangdhanuit.dev",
    mapLink:
      "https://maps.apple.com/?address=278,%201W%20Monipur,%20Mirpur,%20Dhaka%201230,%20Bangladesh",
  };

  return (
    <footer className="bg-zinc-950 text-white border-t border-white/10">
      <div className="container mx-auto px-6 py-12 md:py-24">
        {/* Main Footer Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24 mb-16 md:mb-24">
          {/* Logo & Brand Identity */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col gap-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="Rangdhanu IT Home"
            >
              <Logo className="w-10 h-10" />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Rangdhanu IT - Leading IT solutions provider specializing in web
              development, app development, and digital marketing. We deliver
              excellence with every pixel and line of code.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href={`mailto:${contactData.email}`}
                className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary transition-all hover:-translate-y-1 group"
                aria-label="Email Us"
              >
                <Mail className="w-5 h-5 text-primary group-hover:text-white" />
              </Link>
              <Link
                href={`tel:${contactData.phone.replace(/\s/g, "")}`}
                className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary transition-all hover:-translate-y-1 group"
                aria-label="Call Us"
              >
                <Phone className="w-5 h-5 text-primary group-hover:text-white" />
              </Link>
              <Link
                href={contactData.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary transition-all hover:-translate-y-1 group"
                aria-label="Follow us on Facebook"
              >
                <FaFacebook className="w-5 h-5 text-primary group-hover:text-white" />
              </Link>
              <Link
                href={contactData.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary transition-all hover:-translate-y-1 group"
                aria-label="Visit Our Location"
              >
                <MapPin className="w-5 h-5 text-primary group-hover:text-white" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-violet-400">
              Company
            </h2>
            <ul className="flex flex-col gap-5 text-sm text-zinc-300">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors flex items-center gap-3 group"
                  >
                    <span className="w-1 h-1 bg-primary/60 rounded-full group-hover:bg-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="col-span-1">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-violet-400">
              Support
            </h2>
            <ul className="flex flex-col gap-5 text-sm text-zinc-300">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors flex items-center gap-3 group"
                >
                  <span className="w-1 h-1 bg-primary/60 rounded-full group-hover:bg-primary transition-colors" />
                  Support Center
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors flex items-center gap-3 group"
                >
                  <span className="w-1 h-1 bg-primary/40 rounded-full group-hover:bg-primary transition-colors" />
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors flex items-center gap-3 group"
                >
                  <span className="w-1 h-1 bg-primary/40 rounded-full group-hover:bg-primary transition-colors" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-white transition-colors flex items-center gap-3 group"
                >
                  <span className="w-1 h-1 bg-primary/40 rounded-full group-hover:bg-primary transition-colors" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-zinc-300 font-bold uppercase tracking-widest text-center md:text-left">
            © {currentYear} <span className="text-zinc-200">Rangdhanu IT</span>.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
