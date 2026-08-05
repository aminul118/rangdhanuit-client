import { Container } from "@/components/ui/Container";

export const PartnersSkeleton = () => {
  return (
    <section className="py-16 border-y border-border/60 bg-muted/10 overflow-hidden">
      <Container className="mb-10 text-center">
        <div className="w-64 h-4 bg-muted animate-pulse mx-auto rounded-sm" />
      </Container>
      <div className="flex justify-center gap-8 md:gap-16 lg:gap-24 overflow-hidden py-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-10 w-24 md:h-12 md:w-32 bg-muted animate-pulse rounded-md"
          />
        ))}
      </div>
    </section>
  );
};
