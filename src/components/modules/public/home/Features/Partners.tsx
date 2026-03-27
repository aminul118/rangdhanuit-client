'use client';

const partners = [
  "Google", "Microsoft", "Amazon", "Meta", "Adobe", "Slack", "Spotify", "Netflix"
];

export default function Partners() {
  return (
    <section className="py-12 border-y border-white/5 bg-white/2 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center text-white">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Trusted by Industry Leaders</p>
      </div>
      <div className="flex relative group">
        <div className="flex animate-scroll-left whitespace-nowrap min-w-full items-center py-4">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="mx-12 text-3xl font-bold text-muted-foreground/30 hover:text-indigo-500/50 transition-colors cursor-default"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
