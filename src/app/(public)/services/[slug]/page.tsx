import { getServiceBySlug } from "@/services/Service/services";
import { IService } from "@/types/Service/service.types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Laptop,
  Smartphone,
  Compass,
  Palette,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import HtmlContent from "@/components/rich-text/core/html-content";

const IconMap: Record<string, React.ElementType> = {
  Laptop,
  Smartphone,
  Compass,
  Palette,
  TrendingUp,
  ShieldCheck,
};

import { ISlugPageProps } from "@/types";

export async function generateMetadata({
  params,
}: ISlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getServiceBySlug(slug);
    if (!res.success || !res.data) {
      return { title: "Service Not Found | Rangdhanu IT" };
    }
    const service: IService = res.data;
    return {
      title: `${service.title} | Our Services`,
      description: service.description,
      openGraph: {
        title: service.title,
        description: service.description,
        images: [service.image],
      },
    };
  } catch {
    return { title: "Services | Rangdhanu IT" };
  }
}

import metaConfig from "@/config/meta.config";
import { generateJsonLd } from "@/Seo/generateJsonLd";

export default async function ServiceDetailsPage({ params }: ISlugPageProps) {
  const { slug } = await params;
  const res = await getServiceBySlug(slug);

  if (!res.success || !res.data) {
    notFound();
  }

  const service: IService = res.data;
  const Icon = IconMap[service.icon] || Laptop;

  const serviceJsonLd = generateJsonLd("Service", {
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: metaConfig.siteName,
      url: metaConfig.baseUrl,
    },
    image: service.image,
    url: `${metaConfig.baseUrl}/services/${service.slug}`,
  });

  const breadcrumbJsonLd = generateJsonLd("BreadcrumbList", {
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: metaConfig.baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${metaConfig.baseUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${metaConfig.baseUrl}/services/${service.slug}`,
      },
    ],
  });

  return (
    <main className="min-h-screen pb-32 bg-background transition-colors duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={serviceJsonLd}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbJsonLd}
      />
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center pt-24">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/90 via-background/60 to-background" />

        <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-indigo-400 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all mb-4"
          >
            <ArrowLeft size={16} />
            Back to Expertise
          </Link>

          <div className="flex flex-col items-center gap-6">
            <div className="p-5 rounded-3xl bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40 animate-bounce-subtle">
              <Icon size={48} strokeWidth={1.5} />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">
                <Sparkles size={12} />
                Premium Service Offering
              </div>
              <h1 className="text-4xl md:text-7xl font-black tracking-tight text-foreground leading-tight">
                {service.title}
              </h1>
              <p className="text-muted-foreground text-lg md:text-2xl max-w-[700px] mx-auto leading-relaxed italic font-medium">
                &quot;{service.description}&quot;
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background to-transparent" />
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="grid gap-16 lg:grid-cols-3">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            <div className="glass-premium p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-border/50 backdrop-blur-3xl shadow-2xl">
              <div className="flex items-center gap-4 mb-12">
                <Zap className="text-amber-400" size={24} />
                <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tighter">
                  Service Breakdown
                </h2>
                <div className="h-px flex-1 bg-border/50" />
              </div>

              <HtmlContent
                className="prose prose-lg md:prose-xl max-w-none prose-indigo prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-img:rounded-[2.5rem] prose-img:shadow-2xl prose-strong:text-indigo-400 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-500/5 dark:prose-invert prose-blockquote:p-10 prose-blockquote:rounded-[2.5rem]"
                content={service.content}
              />
            </div>
          </div>

          {/* Sidebar Info Area */}
          <aside className="space-y-8">
            <div className="glass-premium p-8 rounded-[3.5rem] border border-border/50 bg-card/60 backdrop-blur-xl">
              <h3 className="text-xl font-black mb-6 uppercase tracking-wider text-foreground">
                Why Choose This?
              </h3>
              <ul className="space-y-6">
                {[
                  "Cutting-edge Technology Stack",
                  "Agile & Iterative Workflows",
                  "Dedicated Expert Team",
                  "Strategic Business Alignment",
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                      <Sparkles size={12} className="text-emerald-500" />
                    </div>
                    <span className="text-sm font-bold text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-[3.5rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] z-0 group-hover:bg-white/20 transition-all" />
              <h3 className="text-2xl font-black mb-4 relative z-10 leading-tight">
                Ready to Elevate Your Project?
              </h3>
              <p className="text-white/70 text-sm font-bold mb-8 relative z-10 leading-relaxed uppercase tracking-widest">
                Let&lsquo;s discuss how {service.title} can transform your
                vision into a digital reality.
              </p>
              <Link href="/contact" className="block w-full">
                <button className="w-full h-14 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20">
                  Get Started Now
                </button>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
