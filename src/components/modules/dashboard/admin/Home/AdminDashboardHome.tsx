"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  UserX,
  Shield,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Sparkles,
  BookOpen,
  Rocket,
  Zap,
  PieChart,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  description: string;
  trend?: string;
  color: string;
  delay: number;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  color,
  delay,
}: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <Card className="relative overflow-hidden border-white/5 bg-background/40 backdrop-blur-xl rounded-[2.5rem] group hover:border-indigo-500/30 transition-all duration-500">
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`}
      />
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className={`p-2.5 rounded-2xl bg-linear-to-br ${color} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
        >
          <Icon size={18} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-black tracking-tight mb-1">
          {value.toLocaleString()}
        </div>
        <div className="flex items-center gap-2">
          {trend && (
            <span className="flex items-center text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
              <ArrowUpRight size={10} className="mr-0.5" />
              {trend}
            </span>
          )}
          <p className="text-xs text-muted-foreground font-medium">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

interface AdminDashboardHomeProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    blockedUsers: number;
    verifiedUsers: number;
    adminUsers: number;
    totalBlogs: number;
    totalPortfolios: number;
    totalServices: number;
  };
}

const AdminDashboardHome = ({ stats }: AdminDashboardHomeProps) => {
  const statCards = [
    {
      title: "Current Inhabitants",
      value: stats.totalUsers,
      icon: Users,
      description: "Global population",
      trend: "+12%",
      color: "from-indigo-500 to-blue-600",
    },
    {
      title: "Active Explorers",
      value: stats.activeUsers,
      icon: Activity,
      description: "Currently navigating",
      trend: "+5%",
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Knowledge Base",
      value: stats.totalBlogs,
      icon: BookOpen,
      description: "Published articles",
      trend: "+8%",
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "Galactic Portfolio",
      value: stats.totalPortfolios,
      icon: Rocket,
      description: "Project count",
      trend: "+3%",
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Core Capabilities",
      value: stats.totalServices,
      icon: Zap,
      description: "Services offered",
      color: "from-amber-400 to-yellow-600",
    },
    {
      title: "System Architects",
      value: stats.adminUsers,
      icon: Shield,
      description: "Privileged access",
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Restricted Souls",
      value: stats.blockedUsers,
      icon: UserX,
      description: "Access denied",
      color: "from-rose-500 to-pink-600",
    },
  ];

  const activePercentage =
    stats.totalUsers > 0 ? (stats.activeUsers / stats.totalUsers) * 100 : 0;

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-indigo-500 mb-1">
            <TrendingUp size={20} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              Insights Central
            </span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
            System Overview
            <Sparkles className="text-indigo-400" size={32} />
          </h1>
          <p className="text-muted-foreground max-w-lg text-lg">
            Real-time telemetry from your digital ecosystem. Monitor growth,
            trust, and security.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/profile"
            className="group flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Shield
              size={20}
              className="group-hover:rotate-12 transition-transform"
            />
            Manage My Profile
            <ArrowUpRight
              size={18}
              className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
            />
          </Link>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delay={index * 0.1} />
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* User Distribution Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="h-full border-white/5 bg-background/20 backdrop-blur-2xl rounded-[3rem] p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] -z-10 group-hover:bg-indigo-500/10 transition-all duration-700" />
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
                  <PieChart size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">User Distribution</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                    Health Monitor
                  </p>
                </div>
              </div>
              <Zap className="text-amber-400 animate-pulse" size={20} />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    Active Explorers
                  </span>
                  <span className="font-black">
                    {activePercentage.toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={activePercentage}
                  className="h-3 rounded-full bg-emerald-500/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-3xl bg-white/5 border border-white/5 hover:border-indigo-500/20 transition-all">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1 text-center">
                    Verified
                  </p>
                  <p className="text-2xl font-black text-center">
                    {stats.verifiedUsers}
                  </p>
                </div>
                <div className="p-4 rounded-3xl bg-white/5 border border-white/5 hover:border-rose-500/20 transition-all text-center">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">
                    Restricted
                  </p>
                  <p className="text-2xl font-black">{stats.blockedUsers}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* System Pulse Health Widget */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="h-full border-white/5 bg-linear-to-br from-indigo-600/10 to-purple-600/10 backdrop-blur-2xl rounded-[3rem] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-from)_0%,transparent_70%)] from-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative mb-6">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative bg-background/50 p-6 rounded-full border border-indigo-500/20">
                <Activity
                  size={48}
                  className="text-indigo-400 animate-[bounce_2s_infinite]"
                />
              </div>
            </div>

            <h3 className="text-2xl font-black mb-3">Ecosystem Health</h3>
            <p className="text-muted-foreground text-sm max-w-[280px] mb-8 font-medium">
              Your digital landscape is breathing normally. All neural pathways
              are firing at optimal speeds.
            </p>

            <div className="flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                <Target size={12} />
                Operational
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={12} />
                Optimized
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
