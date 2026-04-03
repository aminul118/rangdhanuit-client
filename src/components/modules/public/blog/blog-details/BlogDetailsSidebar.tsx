
import Link from "next/link";
import RecentBlogsSidebar from "@/components/modules/public/blog/RecentBlogsSidebar";

export const BlogDetailsSidebar = () => {
  return (
    <aside className="space-y-8 lg:w-[380px]">
      {/* Existing Shared Component */}
      <RecentBlogsSidebar />

      {/* CTA Block (Consistent with Portfolio/Services) */}
      <div className="p-10 rounded-[3.5rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20 group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] z-0 group-hover:bg-white/20 transition-all" />
        <h3 className="text-2xl font-black mb-4 relative z-10 leading-tight">
          Ready to Elevate Your Project?
        </h3>
        <p className="text-white/70 text-sm font-bold mb-8 relative z-10 leading-relaxed uppercase tracking-widest">
          Let&lsquo;s discuss how we can transform your vision into a digital
          masterpiece with our proven expert workflows.
        </p>
        <Link href="/contact" className="block w-full">
          <button className="w-full h-14 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20 cursor-pointer">
            Discuss Strategy
          </button>
        </Link>
      </div>
    </aside>
  );
};
