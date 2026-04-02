/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { FADE_IN_UP } from "@/constants/animations";

const contactDetails = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+88 017 105 104 77",
    href: "tel:+8801710510477",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "info@rangdhanuit.com",
    href: "mailto:info@rangdhanuit.com",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: MapPin,
    title: "Our Office",
    value: "Rampura, Dhaka-1230",
    href: null,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
];

export function ContactInfo() {
  return (
    <div className="flex flex-col justify-center h-full max-w-xl">
      <div className="space-y-8">
        <div className="space-y-4">
          <motion.h3
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-foreground italic tracking-tighter"
          >
            Let's create something <br />
            <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent underline decoration-indigo-500/20 underline-offset-8">
              amazing together.
            </span>
          </motion.h3>
          <motion.p
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg font-medium leading-relaxed"
          >
            Have a project that needs a creative touch? We'd love to hear about
            it. Our team is ready to turn your vision into a digital reality.
          </motion.p>
        </div>

        <div className="space-y-4 mt-8">
          {contactDetails.map((item, index) => (
            <motion.div
              key={index}
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="group flex items-center gap-6 p-5 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl transition-all hover:border-primary/20 hover:bg-card/60 shadow-sm"
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${item.bg}`}
              >
                <item.icon className={`h-7 w-7 ${item.color}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 mb-1">
                  {item.title}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-lg font-black text-foreground transition-colors hover:text-primary tracking-tight"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-lg font-black text-foreground tracking-tight">
                    {item.value}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
