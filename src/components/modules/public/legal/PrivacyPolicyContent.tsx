"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles, Lock, Eye, Bell, Globe } from "lucide-react";
import { Container } from "@/components/common/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

export default function PrivacyPolicyContent() {
  const sections = [
    {
      title: "Introduction",
      icon: <Globe className="w-6 h-6" />,
      content: "At Rangdhanu IT, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or use our services. By using our platform, you agree to the terms outlined in this policy."
    },
    {
      title: "Information We Collect",
      icon: <Eye className="w-6 h-6" />,
      content: "We collect information that you provide directly to us, such as your name, email address, and phone number when you contact us for services. We also automatically collect certain information about your device and how you interact with our website through cookies and similar tracking technologies."
    },
    {
      title: "How We Use Your Data",
      icon: <Shield className="w-6 h-6" />,
      content: "Your data is used to provide, maintain, and improve our services, to communicate with you about projects and updates, and to ensure a personalized experience. We do not sell your personal information to third parties."
    },
    {
      title: "Data Security",
      icon: <Lock className="w-6 h-6" />,
      content: "We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
    },
    {
      title: "Changes to This Policy",
      icon: <Bell className="w-6 h-6" />,
      content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes."
    }
  ];

  return (
    <div className="flex flex-col pb-24 font-sans border-t border-border/50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 text-center bg-linear-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20">
        <Container>
          <motion.div
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold mb-8 uppercase tracking-widest backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Legal Transparency</span>
          </motion.div>

          <motion.h1 
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight text-foreground"
          >
            Privacy <span className="text-primary">Policy</span>
          </motion.h1>
          
          <motion.p 
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Last Updated: March 31, 2026. Your privacy is our priority. 
            Learn how we manage and protect your data.
          </motion.p>
        </Container>
      </section>

      {/* Content Section */}
      <Container>
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              transition={{ delay: 0.1 * index }}
              className="p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform duration-500">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            className="p-12 rounded-[2.5rem] bg-zinc-900 text-white border border-white/10 text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Have Questions?</h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
              If you have any questions about this Privacy Policy, please contact our data protection team.
            </p>
            <a 
              href="mailto:privacy@rangdhanuit.com" 
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
