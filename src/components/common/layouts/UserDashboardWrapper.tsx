"use client";

import { useAuth } from "@/providers/AuthProvider";
import { m } from "framer-motion";
import Link from "next/link";
import {
  Briefcase,
  Headset,
  FileText,
  Clock,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  RefreshCcw,
  Box,
  MapPin,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const UserDashboardWrapper = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Top Grid: Main Left Column & Right Tall Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column (Spans 8 columns on XL) */}
        <div className="xl:col-span-8 space-y-6">
          {/* Active Projects Status Card */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-[#0a0b10] border border-white/5 relative overflow-hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white">Active Projects</h2>
              <Link href="/dashboard/projects">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-white/10 hover:bg-white/5 text-xs font-semibold h-8 px-4"
                >
                  See More →
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                {
                  icon: Briefcase,
                  label: "Planning",
                  color: "text-purple-400",
                  bg: "bg-purple-500/10",
                },
                {
                  icon: RefreshCcw,
                  label: "In Progress",
                  color: "text-blue-400",
                  bg: "bg-blue-500/10",
                },
                {
                  icon: ShieldCheck,
                  label: "Review",
                  color: "text-emerald-400",
                  bg: "bg-emerald-500/10",
                },
                {
                  icon: CheckCircle2,
                  label: "Completed",
                  color: "text-primary",
                  bg: "bg-primary/10",
                },
              ].map((status, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center gap-3 group cursor-pointer"
                >
                  <div
                    className={`w-16 h-16 rounded-full ${status.bg} flex items-center justify-center ${status.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <status.icon size={24} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-white transition-colors">
                    {status.label}
                  </span>
                </div>
              ))}
            </div>
          </m.div>

          {/* Two Smaller Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-[#0a0b10] border border-white/5 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/20 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                <Search size={24} />
              </div>
              <h3 className="font-semibold text-white">Track Project</h3>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-[#0a0b10] border border-white/5 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-blue-500/20 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin size={24} />
              </div>
              <h3 className="font-semibold text-white">Address Book</h3>
            </m.div>
          </div>
        </div>

        {/* Right Column (Spans 4 columns on XL) */}
        <div className="xl:col-span-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6">
          {/* Support Tickets Gradient Card */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl overflow-hidden flex flex-col relative h-[300px] xl:h-[calc(50%-12px)] group cursor-pointer"
          >
            <div className="h-1/2 bg-linear-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-white/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Headset size={32} className="text-white" />
              </div>
            </div>
            <div className="h-1/2 bg-[#0a0b10] flex flex-col items-center justify-center p-6 text-center border-b border-x border-white/5 rounded-b-3xl">
              <div className="w-10 h-10 -mt-11 mb-2 bg-[#0a0b10] rounded-full flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <MessageSquare size={14} />
                </div>
              </div>
              <h3 className="font-bold text-white mb-1">Support Tickets</h3>
              <p className="text-xs text-muted-foreground">
                All your support requests here
              </p>
            </div>
          </m.div>

          {/* Invoices Gradient Card */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-3xl overflow-hidden flex flex-col relative h-[300px] xl:h-[calc(50%-12px)] group cursor-pointer"
          >
            <div className="h-1/2 bg-linear-to-br from-pink-400 to-rose-500 flex items-center justify-center">
              <FileText
                size={48}
                className="text-white opacity-80 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="h-1/2 bg-[#0a0b10] flex flex-col items-center justify-center p-6 text-center border-b border-x border-white/5 rounded-b-3xl">
              <div className="w-10 h-10 -mt-11 mb-2 bg-[#0a0b10] rounded-full flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center">
                  <FileText size={14} />
                </div>
              </div>
              <h3 className="font-bold text-white mb-1">Invoices</h3>
              <p className="text-xs text-muted-foreground">
                All your billing history here
              </p>
            </div>
          </m.div>
        </div>
      </div>

      {/* Bottom Section: Recent Activity */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="pt-4"
      >
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="p-8 rounded-3xl bg-[#0a0b10] border border-white/5 min-h-[200px] flex items-center justify-center">
          <div className="text-center text-muted-foreground flex flex-col items-center gap-3">
            <Box size={40} className="opacity-20" />
            <p>No recent activity found.</p>
          </div>
        </div>
      </m.div>
    </div>
  );
};

export default UserDashboardWrapper;
