import Image from "next/image";
import { ArrowLeft, Globe, Cpu, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getPortfolioBySlug } from "@/services/Portfolio/portfolios";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ISlugPageProps, IPortfolio } from "@/types";
import HtmlContent from "@/components/rich-text/core/html-content";
import { Container } from "@/components/ui/Container";
import { generateJsonLd } from "@/Seo/generateJsonLd";
import metaConfig from "@/config/meta.config";

export async function generateMetadata({
  params,
}: ISlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = (await getPortfolioBySlug(slug)) as {
      success: boolean;
      data: IPortfolio;
    };

    if (!data.success || !data.data) {
      return {
        title: "Project Not Found | Rangdhanu IT",
      };
    }

    const project = data.data;
    const description = project.description
      .replace(/<[^>]*>/g, "")
      .slice(0, 160);

    return {
      title: `${project.title} | Portfolio | Rangdhanu IT`,
      description,
      openGraph: {
        title: project.title,
        description,
        images: [project.image],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: project.title,
        description,
        images: [project.image],
      },
    };
  } catch {
    return {
      title: "Portfolio | Rangdhanu IT",
    };
  }
}

export default async function PortfolioDetailsPage({ params }: ISlugPageProps) {
  const { slug } = await params;
  const data = (await getPortfolioBySlug(slug)) as {
    success: boolean;
    data: IPortfolio;
  };

  if (!data.success || !data.data) {
    notFound();
  }

  const project = data.data;

  const projectJsonLd = generateJsonLd("CreativeWork", {
    name: project.title,
    description: project.description.replace(/<[^>]*>/g, "").slice(0, 160),
    image: project.image,
    url: `${metaConfig.baseUrl}/portfolio/${project.slug}`,
    datePublished: project.createdAt,
    keywords: project.technologies.join(", "),
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
        name: "Portfolio",
        item: `${metaConfig.baseUrl}/portfolio`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${metaConfig.baseUrl}/portfolio/${project.slug}`,
      },
    ],
  });

  return (
    <main className="min-h-screen pt-32 pb-20 overflow-hidden bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={projectJsonLd}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbJsonLd}
      />
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-0 -z-10 h-full w-full bg-linear-to-b from-primary/5 via-background to-background" />

      <Container className="relative z-10">
        <div className="flex flex-col gap-12">
          {/* Header Section */}
          <div className="space-y-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back to Portfolio
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full">
                    <Cpu size={14} />
                    Project Case Study
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary" />
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-foreground tracking-tighter">
                  {project.title}
                </h1>
              </div>

              <div className="flex lg:justify-end gap-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-primary/20"
                  >
                    Live Preview
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-[50vh] md:h-[70vh] w-full rounded-[40px] overflow-hidden shadow-2xl border border-border/50">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                <h2 className="text-3xl font-black text-foreground">
                  Overview
                </h2>
                <div className="prose dark:prose-invert prose-lg max-w-none prose-primary font-medium text-muted-foreground leading-relaxed">
                  <HtmlContent content={project.description} />
                </div>
              </section>
            </div>

            {/* Sidebar Details */}
            <div className="space-y-12">
              <div className="glass p-10 rounded-[40px] border-border/50 space-y-8 backdrop-blur-sm shadow-xl">
                <div>
                  <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-primary" />
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-muted/30 border border-border/50 rounded-xl text-sm font-bold text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.link && (
                  <div className="pt-8 border-t border-border/50">
                    <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-primary" />
                      Project Link
                    </h3>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-bold hover:underline break-all"
                    >
                      {project.link}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
