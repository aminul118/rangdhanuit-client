import { Metadata } from "next";
import { ExternalLink, ShoppingBag, Globe, Smartphone, Palette } from "lucide-react";
import Link from "next/link";
import generateMetaTags from "@/Seo/generateMetaTags";
import { cn } from "@/lib/utils";

export const metadata: Metadata = generateMetaTags({
  title: "Our Portfolio | Rangdhanu IT",
  description: "Explore our diverse portfolio of high-end web development and mobile applications. See how we deliver excellence to our global clients.",
  keywords: "portfolio, recent projects, case studies, success stories",
});

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    client: "Global Retailers",
    description: "A full-scale e-commerce solution with advanced filtering and real-time inventory management.",
    icon: ShoppingBag,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Fitness Tracker App",
    category: "App Development",
    client: "ActiveLife Inc.",
    description: "Cross-platform mobile application for tracking workouts and nutritional intake.",
    icon: Smartphone,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Real Estate Portal",
    category: "Web Development",
    client: "Urban Spaces",
    description: "Property listing website with interactive maps and virtual tour integrations.",
    icon: Globe,
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "Branding & Identity",
    category: "Graphics Design",
    client: "Creative Hub",
    description: "Complete visual identity design including logo, typography, and marketing assets.",
    icon: Palette,
    color: "bg-pink-500/10 text-pink-500",
  },
];

export default function PortfolioPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="pt-20 pb-12 text-center container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Our <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Portfolio</span></h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Explore our recent projects and see how we&apos;ve helped our clients achieve their digital goals with premium IT solutions.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <div key={project.title} className="bg-white/5 border border-white/10 group overflow-hidden rounded-[40px] flex flex-col backdrop-blur-sm shadow-xl hover:border-indigo-500/50 transition-all">
              <div className="h-64 bg-white/2 relative flex items-center justify-center overflow-hidden">
                <project.icon className="w-24 h-24 text-muted-foreground/10 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-8 left-8">
                  <span className={cn("px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider", project.color)}>
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-10 flex flex-col grow">
                <div className="text-sm font-semibold text-primary mb-2">{project.client}</div>
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 grow">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <Link href="#" className="flex items-center gap-2 text-foreground font-bold hover:text-primary transition-colors">
                    View Project <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="glass py-24">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <div className="text-primary text-5xl mb-8">“</div>
          <p className="text-2xl md:text-3xl font-medium mb-12 italic leading-snug">
            Rangdhanu IT transformed our digital presence. Their attention to detail and technical expertise are unmatched.
          </p>
          <div className="font-bold text-xl uppercase tracking-widest">John Doe</div>
          <div className="text-sm text-muted-foreground mt-2">CEO, Global Retailers</div>
        </div>
      </section>
    </div>
  );
}
