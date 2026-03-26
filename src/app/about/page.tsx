import { Users, Target, Award, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="pt-20 pb-12 text-center container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">About <span className="gradient-text">Rangdhanu IT</span></h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We are a team of passionate developers, designers, and digital strategists committed to helping businesses scale through technology and innovation.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="glass p-12 rounded-[40px]">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To provide high-quality IT solutions that empower our clients to achieve their business goals efficiently and effectively. We strive for excellence in every line of code and every pixel designed.
            </p>
          </div>
          <div className="glass p-12 rounded-[40px]">
            <div className="w-12 h-12 bg-violet-500/10 text-violet-500 rounded-xl flex items-center justify-center mb-6">
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
      <section className="glass py-16">
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">100+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Projects Completed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Happy Clients</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">10+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Support</div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Innovation", desc: "Always pushing the boundaries of what's possible with technology.", icon: Rocket },
            { title: "Quality", desc: "Rigorous standards for every project to ensure the best results.", icon: Award },
            { title: "Collaboration", desc: "Working closely with clients to understand and meet their needs.", icon: Users },
          ].map((value) => (
            <div key={value.title} className="glass p-8 rounded-3xl">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
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
