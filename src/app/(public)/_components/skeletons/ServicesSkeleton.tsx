import { Container } from "@/components/ui/Container";

export const ServicesSkeleton = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-background">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl space-y-4">
            <div className="w-32 h-4 bg-muted animate-pulse rounded-sm" />
            <div className="w-64 md:w-96 h-12 md:h-16 bg-muted animate-pulse rounded-md" />
            <div className="w-48 md:w-72 h-12 md:h-16 bg-muted animate-pulse rounded-md" />
          </div>
          <div className="w-full md:w-96 h-20 bg-muted animate-pulse rounded-md" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[360px] border border-border/50 p-10 rounded-sm glass flex flex-col items-start overflow-hidden"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted animate-pulse mb-8" />
              <div className="w-3/4 h-8 bg-muted animate-pulse rounded-sm mb-4" />
              <div className="w-full h-4 bg-muted animate-pulse rounded-sm mb-2" />
              <div className="w-full h-4 bg-muted animate-pulse rounded-sm mb-2" />
              <div className="w-2/3 h-4 bg-muted animate-pulse rounded-sm mb-10" />
              <div className="w-32 h-5 bg-muted animate-pulse rounded-sm mt-auto" />
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="w-64 h-3 bg-muted animate-pulse rounded-sm" />
          <div className="w-48 h-12 bg-muted animate-pulse rounded-2xl" />
        </div>
      </Container>
    </section>
  );
};
