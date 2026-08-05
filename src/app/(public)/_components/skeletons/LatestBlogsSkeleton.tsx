import { Container } from "@/components/ui/Container";

export const LatestBlogsSkeleton = () => {
  return (
    <section className="py-24 relative bg-background overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="w-32 h-4 bg-muted animate-pulse rounded-sm" />
            <div className="w-64 md:w-96 h-12 md:h-16 bg-muted animate-pulse rounded-md" />
            <div className="w-48 md:w-72 h-12 md:h-16 bg-muted animate-pulse rounded-md" />
          </div>
          <div className="w-48 h-12 bg-muted animate-pulse rounded-2xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <article
              key={i}
              className="relative h-[480px] flex flex-col bg-muted/30 rounded-[2.5rem] border border-border/50 overflow-hidden"
            >
              <div className="relative aspect-16/10 bg-muted animate-pulse" />
              <div className="p-8 flex flex-col grow">
                <div className="flex items-center gap-6 mb-4">
                  <div className="w-24 h-3 bg-muted animate-pulse rounded-sm" />
                  <div className="w-24 h-3 bg-muted animate-pulse rounded-sm" />
                </div>
                <div className="w-full h-6 bg-muted animate-pulse rounded-sm mb-2" />
                <div className="w-3/4 h-6 bg-muted animate-pulse rounded-sm mb-4" />
                <div className="w-32 h-4 bg-muted animate-pulse rounded-sm mt-auto" />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
