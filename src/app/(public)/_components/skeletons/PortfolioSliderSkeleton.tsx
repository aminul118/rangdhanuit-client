import { Container } from "@/components/ui/Container";

export const PortfolioSliderSkeleton = () => {
  return (
    <section className="py-16 md:py-24 relative bg-background overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="w-64 md:w-96 h-12 md:h-16 bg-muted animate-pulse rounded-md" />
            <div className="w-48 md:w-72 h-12 md:h-16 bg-muted animate-pulse rounded-md" />
            <div className="w-full md:w-[500px] h-16 bg-muted animate-pulse rounded-md mt-4" />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex gap-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-muted animate-pulse" />
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-muted animate-pulse" />
            </div>
            <div className="w-40 h-12 md:h-14 rounded-xl md:rounded-2xl bg-muted animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="group relative h-[450px] w-full overflow-hidden rounded-[2rem] bg-muted/30 border border-border/50"
            >
              <div className="absolute inset-0 bg-muted animate-pulse" />
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-background/50 backdrop-blur-xl border border-white/10">
                <div className="w-20 h-4 bg-muted animate-pulse rounded-full mb-3" />
                <div className="w-3/4 h-8 bg-muted animate-pulse rounded-sm mb-2" />
                <div className="w-full h-4 bg-muted animate-pulse rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
