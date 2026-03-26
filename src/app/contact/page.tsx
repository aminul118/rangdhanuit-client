"use client";

import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="pt-20 pb-12 text-center container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Get in <span className="gradient-text">Touch</span></h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Have a project in mind or want to learn more about our services? We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you shortly.
        </p>
      </section>

      {/* Contact Grid */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="flex flex-col gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Email Us</h4>
                    <p className="text-muted-foreground">info@rangdhanuit.com</p>
                    <p className="text-muted-foreground">support@rangdhanuit.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Call Us</h4>
                    <p className="text-muted-foreground">+880 123 456 789</p>
                    <p className="text-muted-foreground">+880 987 654 321</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Our Office</h4>
                    <p className="text-muted-foreground">Sector 10, Uttara, Dhaka-1230, Bangladesh</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Working Hours</h4>
                    <p className="text-muted-foreground">Sat - Thu: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Friday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass p-8 md:p-12 rounded-[40px]">
            <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest px-1">Full Name</label>
                  <input type="text" placeholder="John Doe" className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-primary/50 transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest px-1">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-primary/50 transition-colors" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest px-1">Subject</label>
                <input type="text" placeholder="Project Inquiry" className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest px-1">Message</label>
                <textarea rows={5} placeholder="Tell us about your project..." className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-primary/50 transition-colors resize-none"></textarea>
              </div>
              <button
                type="submit"
                className="bg-primary text-white p-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 mt-4"
              >
                Send Message <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
