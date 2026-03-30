import { getServices } from "@/services/Service/services";
import ServiceCard from "@/components/modules/public/Service/ServiceCard";
import { IService } from "@/types/Service/service.types";
import { Metadata } from 'next';
import { Sparkles, Terminal, Wand2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services | Rangdhanu IT',
  description: 'Unlocking digital potential through specialized web development, app design, SEO, and cybersecurity solutions.',
};

const ServicesPage = async () => {
  const res = await getServices();
  const services = res?.data || [];

  return (
    <div className="min-h-screen bg-zinc-950 pt-16 md:pt-32 pb-32">
      <div className="max-w-8xl mx-auto px-6 lg:px-12">
        <div className="text-center space-y-8 mb-24">
          <div className="flex items-center justify-center gap-3 text-indigo-500 mb-2">
             <div className="h-px w-12 bg-linear-to-r from-transparent to-indigo-500" />
             <span className="text-xs font-black uppercase tracking-[0.4em]">Our Digital Capabilities</span>
             <div className="h-px w-12 bg-linear-to-l from-transparent to-indigo-500" />
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.95] text-white flex flex-col items-center">
             <span>Comprehensive</span>
             <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-500 to-rose-400">Technical Mastery</span>
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-2xl max-w-[800px] mx-auto leading-relaxed font-medium">
             Transcend traditional boundaries with our specialized digital solutions. From elegant UI/UX to robust cybersecurity, we redefine excellence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">
             <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5">
                <Terminal size={14} className="text-indigo-400" /> Web & Mobile
             </div>
             <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5">
                <Wand2 size={14} className="text-purple-400" /> UI/UX Creative
             </div>
             <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5">
                <Sparkles size={14} className="text-rose-400" /> Strategy & SEO
             </div>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service: IService, index: number) => (
            <ServiceCard 
               key={service._id} 
               service={service} 
               index={index} 
            />
          ))}
        </div>
        
        {/* Placeholder for CTA if needed */}
        <div className="mt-32 p-12 md:p-24 rounded-[4rem] border border-white/5 bg-linear-to-br from-indigo-500/5 to-purple-500/5 text-center relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
           <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Need a custom solution?</h2>
           <p className="text-zinc-500 text-lg max-w-[600px] mx-auto mb-12 font-bold uppercase tracking-widest">Let&apos;s build something extraordinary together.</p>
           <button className="h-14 px-12 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black shadow-2xl shadow-indigo-600/40 transition-all active:scale-95 leading-none">
              Start Your Project
           </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
