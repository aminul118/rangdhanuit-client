'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  UserX, 
  Shield, 
  ArrowUpRight,
  TrendingUp,
  Activity,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: number;
  icon: any;
  description: string;
  trend?: string;
  color: string;
  delay: number;
}

const StatCard = ({ title, value, icon: Icon, description, trend, color, delay }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <Card className="relative overflow-hidden border-white/5 bg-background/40 backdrop-blur-xl rounded-[2.5rem] group hover:border-indigo-500/30 transition-all duration-500">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</CardTitle>
        <div className={`p-2.5 rounded-2xl bg-linear-to-br ${color} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
          <Icon size={18} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-black tracking-tight mb-1">{value.toLocaleString()}</div>
        <div className="flex items-center gap-2">
          {trend && (
            <span className="flex items-center text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
              <ArrowUpRight size={10} className="mr-0.5" />
              {trend}
            </span>
          )}
          <p className="text-xs text-muted-foreground font-medium">{description}</p>
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
  };
}

export default function AdminDashboardHome({ stats }: AdminDashboardHomeProps) {
  const statCards = [
    {
      title: 'Total Inhabitants',
      value: stats.totalUsers,
      icon: Users,
      description: 'Global population',
      trend: '+12%',
      color: 'from-indigo-500 to-blue-600',
    },
    {
      title: 'Active Explorers',
      value: stats.activeUsers,
      icon: Activity,
      description: 'Currently navigating',
      trend: '+5%',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Trusted Citizens',
      value: stats.verifiedUsers,
      icon: UserCheck,
      description: 'Verified identities',
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'System Architects',
      value: stats.adminUsers,
      icon: Shield,
      description: 'Privileged access',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      title: 'Restricted Souls',
      value: stats.blockedUsers,
      icon: UserX,
      description: 'Access denied',
      color: 'from-rose-500 to-pink-600',
    },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-indigo-500 mb-1">
            <TrendingUp size={20} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Insights Central</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
            System Overview
            <Sparkles className="text-indigo-400" size={32} />
          </h1>
          <p className="text-muted-foreground max-w-lg text-lg">
            Real-time telemetry from your digital ecosystem. Monitor growth, trust, and security.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {statCards.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Placeholder for future Charts */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="rounded-[3rem] border border-white/5 bg-background/20 backdrop-blur-2xl p-12 text-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-purple-500/5 -z-10" />
        <Activity className="mx-auto mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-500 shadow-xl" size={48} />
        <h3 className="text-2xl font-bold mb-2">Advanced Analytics Coming Soon</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We are currently calibrating the neural pathways to bring you deeper insights into user behavior and system performance.
        </p>
      </motion.div>
    </div>
  );
}
