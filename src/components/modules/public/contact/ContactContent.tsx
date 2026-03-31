"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/common/form";
import { Container } from "@/components/common/Container";
import {
  FADE_IN_LEFT,
  FADE_IN_RIGHT,
  VIEWPORT_CONFIG,
} from "@/constants/animations";

export function ContactContent() {
  return (
    <section className="bg-background text-foreground transition-colors duration-500">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            variants={FADE_IN_LEFT}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            className="flex flex-col gap-12"
          >
            <div>
              <h2 className="text-3xl font-black mb-8">Contact Information</h2>
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black mb-1">Email Us</h4>
                    <p className="text-muted-foreground font-bold">
                      info@rangdhanuit.com
                    </p>
                    <p className="text-muted-foreground font-bold">
                      support@rangdhanuit.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black mb-1">Call Us</h4>
                    <p className="text-muted-foreground font-bold">
                      +880 123 456 789
                    </p>
                    <p className="text-muted-foreground font-bold">
                      +880 987 654 321
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black mb-1">Our Office</h4>
                    <p className="text-muted-foreground font-bold">
                      Sector 10, Uttara, Dhaka-1230, Bangladesh
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black mb-1">Working Hours</h4>
                    <p className="text-muted-foreground font-bold">
                      Sat - Thu: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-muted-foreground font-bold">
                      Friday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={FADE_IN_RIGHT}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            className="glass border-border/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-md"
          >
            <h2 className="text-3xl font-black mb-8 italic uppercase tracking-tight">
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
                    className="text-xs font-black text-muted-foreground uppercase tracking-widest px-1"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label
                    htmlFor="email"
                    className="text-xs font-black text-muted-foreground uppercase tracking-widest px-1"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                   
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="subject"
                  className="text-xs font-black text-zinc-500 uppercase tracking-widest px-1"
                >
                  Subject
                </Label>
                <Input id="subject" placeholder="Project Inquiry" />
              </div>
              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="message"
                  className="text-xs font-black text-zinc-500 uppercase tracking-widest px-1"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                />
              </div>

              <SubmitButton
                label="Send Message"
                iconRight={<Send className="w-5 h-5" />}
                className="mt-4"
                size="lg"
              />
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
