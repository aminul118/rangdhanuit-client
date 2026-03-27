import { Metadata } from "next";
import { Users, Target, Award, Rocket } from "lucide-react";
import generateMetaTags from "@/Seo/generateMetaTags";
import { cn } from "@/lib/utils";

export const metadata: Metadata = generateMetaTags({
  title: "About Us | Rangdhanu IT",
  description: "Learn about Rangdhanu IT's mission, vision, and core values. We are a team of passionate tech experts dedicated to your success.",
  keywords: "about us, our team, mission, vision, IT experts",
});

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="pt-20 pb-12 text-center container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">About <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Rangdhanu IT</span></h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We are a team of passionate developers, designers, and digital strategists committed to helping businesses scale through technology and innovation.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-white/5 border border-white/10 p-12 rounded-[40px] backdrop-blur-sm shadow-xl">
            <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To provide high-quality IT solutions that empower our clients to achieve their business goals efficiently and effectively. We strive for excellence in every line of code and every pixel designed.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-12 rounded-[40px] backdrop-blur-sm shadow-xl">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center mb-6">
              <Rocket className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To be a global leader in IT services, known for our innovation, reliability, and commitment to client success. We envision a world where technology seamlessly integrates with business to create meaningful impact.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white/2 border-y border-white/5 py-16 backdrop-blur-sm">
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-indigo-500 mb-2">100+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Projects Completed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-500 mb-2">50+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Happy Clients</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-500 mb-2">10+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-500 mb-2">24/7</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Support</div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Innovation", desc: "Always pushing the boundaries of what's possible with technology.", icon: Rocket, color: "bg-indigo-500/10 text-indigo-500" },
            { title: "Quality", desc: "Rigorous standards for every project to ensure the best results.", icon: Award, color: "bg-purple-500/10 text-purple-500" },
            { title: "Collaboration", desc: "Working closely with clients to understand and meet their needs.", icon: Users, color: "bg-pink-500/10 text-pink-500" },
          ].map((value) => (
            <div key={value.title} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm shadow-lg hover:border-indigo-500/50 transition-all">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-6", value.color)}>
                <value.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
