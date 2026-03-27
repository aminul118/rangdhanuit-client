import { Button } from '@/components/ui/button';
import Link from 'next/link';

const PortalButton = () => {
  return (
    <Button
      asChild
      className="group relative overflow-hidden rounded-full bg-slate-900 px-6 font-bold text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
    >
      <Link href="/login">
        <div className="absolute inset-0 rounded-full border border-white/10 p-px">
          <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#8b5cf6_0%,#d946ef_50%,#8b5cf6_100%)] opacity-100" />
        </div>
        <div className="absolute inset-px rounded-full bg-slate-900 transition-colors duration-300 group-hover:bg-slate-950" />
        <span className="relative z-10 bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent transition-colors duration-300 group-hover:text-white">
          Portal
        </span>
        <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      </Link>
    </Button>
  );
};

export default PortalButton;
