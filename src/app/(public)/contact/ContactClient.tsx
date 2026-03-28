"use client";

import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/common/form";

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="pt-20 pb-12 text-center container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">
          Get in{" "}
          <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Touch
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Have a project in mind or want to learn more about our services?
          We&apos;d love to hear from you. Fill out the form below and
          we&apos;ll get back to you shortly.
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
                  <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Email Us</h4>
                    <p className="text-muted-foreground">
                      info@rangdhanuit.com
                    </p>
                    <p className="text-muted-foreground">
                      support@rangdhanuit.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Call Us</h4>
                    <p className="text-muted-foreground">+880 123 456 789</p>
                    <p className="text-muted-foreground">+880 987 654 321</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Our Office</h4>
                    <p className="text-muted-foreground">
                      Sector 10, Uttara, Dhaka-1230, Bangladesh
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Working Hours</h4>
                    <p className="text-muted-foreground">
                      Sat - Thu: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-muted-foreground">Friday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-md">
            <h2 className="text-3xl font-bold mb-8 italic uppercase tracking-tight italic">
              Send a Message
            </h2>
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  <Label
                    htmlFor="name"
                    className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="bg-zinc-900/40 border-white/10 h-12 rounded-2xl focus-visible:ring-indigo-500/40 focus-visible:border-indigo-500/40 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label
                    htmlFor="email"
                    className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-zinc-900/40 border-white/10 h-12 rounded-2xl focus-visible:ring-indigo-500/40 focus-visible:border-indigo-500/40 transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="subject"
                  className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1"
                >
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="Project Inquiry"
                  className="bg-zinc-900/40 border-white/10 h-12 rounded-2xl focus-visible:ring-indigo-500/40 focus-visible:border-indigo-500/40 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="message"
                  className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="bg-zinc-900/40 border-white/10 rounded-2xl focus-visible:ring-indigo-500/40 focus-visible:border-indigo-500/40 transition-all duration-300 resize-none px-4 py-4"
                />
              </div>

              <SubmitButton
                label="Send Message"
                iconRight={<Send className="w-5 h-5" />}
                className="mt-4"
                size="lg"
              />
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
