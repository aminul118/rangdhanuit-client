"use client";

import { useAuth } from "@/providers/AuthProvider";
import {
  MessageSquare,
  ShieldCheck,
  Clock,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const UserDashboardWrapper = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 -ml-40 -mt-40 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 -mr-40 -mb-40 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] -z-10 animate-pulse" />

      <div className="container mx-auto py-12 px-8 relative">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-indigo-500/10 text-indigo-500 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-indigo-500/20">
                  Account Verified
                </span>
                <Sparkles size={14} className="text-yellow-500 animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                Welcome back, <br />
                <span className="bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  {user?.name || "Explorer"}!
                </span>
              </h1>
              <p className="mt-4 text-muted-foreground text-lg max-w-lg leading-relaxed">
                Your portal to premium IT services and real-time support. How
                can we help you today?
              </p>
            </div>
          </motion.div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="group relative p-8 rounded-3xl bg-card border border-white/5 hover:border-indigo-500/30 transition-all duration-500 overflow-hidden shadow-2xl shadow-indigo-500/5"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <MessageSquare size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3">Support Chat</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Connect instantly with our admin team. Get responses within
                  minutes for your technical queries.
                </p>
                <Link href="/dashboard/messages">
                  <Button className="w-full rounded-2xl h-12 bg-indigo-500 hover:bg-indigo-600 shadow-xl shadow-indigo-500/20 group/btn">
                    Open Support Hub
                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="group relative p-8 rounded-3xl bg-card border border-white/5 hover:border-purple-500/30 transition-all duration-500 overflow-hidden shadow-2xl shadow-purple-500/5"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3">Service Catalog</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Browse our range of professional portfolios and project case
                  studies curated just for you.
                </p>
                <Link href="/admin/portfolios">
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl h-12 border-white/10 hover:bg-white/5 group/btn"
                  >
                    View Portfolios
                    <ExternalLink
                      size={18}
                      className="ml-2 opacity-50 group-hover/btn:opacity-100 transition-opacity"
                    />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Activity Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">
                Recent Activity
              </h4>
              <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1 rounded-full">
                <Clock size={12} />
                Updated Just Now
              </div>
            </div>

            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-black/20 border border-white/5"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground">
                    <MessageSquare size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="h-4 bg-white/5 rounded-full w-24 mb-2 animate-pulse" />
                    <div className="h-3 bg-white/5 rounded-full w-48 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardWrapper;
