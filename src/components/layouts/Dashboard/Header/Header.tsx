'use client';

import { useAuth } from '@/providers/AuthProvider';
import { 
  Search, 
  ChevronDown,
  Settings,
  User as UserIcon,
  LogOut
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { NotificationDropdown } from './NotificationDropdown';

export default function AdminHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 border-b border-white/5 bg-background/40 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-30 transition-all duration-300">
      <div className="flex items-center gap-6 flex-1">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-md w-full hidden md:block group"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search for users, portfolios..." 
            className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-indigo-500/50 rounded-2xl pl-12 pr-4 py-2.5 text-sm outline-none transition-all duration-300 backdrop-blur-sm"
          />
        </motion.div>
      </div>

      <div className="flex items-center gap-4">
        <NotificationDropdown />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button variant="ghost" className="pl-1 pr-3 gap-3 h-12 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5">
                <div className="relative">
                  <Avatar className="h-9 w-9 border-2 border-white/10 shadow-lg">
                    <AvatarImage src={user?.picture} />
                    <AvatarFallback className="bg-linear-to-br from-indigo-500 to-purple-600 text-white text-xs font-bold">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div className="hidden md:flex flex-col items-start gap-0">
                  <span className="text-sm font-semibold text-foreground/90">{user?.name || 'Admin User'}</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{user?.role || 'Administrator'}</span>
                </div>
                <ChevronDown size={14} className="text-muted-foreground ml-1" />
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl bg-background/95 backdrop-blur-xl border-white/10 shadow-2xl">
            <DropdownMenuLabel className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">Account Central</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/5" />
            <Link href="/profile">
              <DropdownMenuItem className="rounded-xl px-3 py-2.5 gap-3 focus:bg-indigo-500/10 focus:text-indigo-500 cursor-pointer transition-colors">
                <UserIcon size={18} />
                <span className="font-medium text-sm">View Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/profile?tab=theme">
              <DropdownMenuItem className="rounded-xl px-3 py-2.5 gap-3 focus:bg-indigo-500/10 focus:text-indigo-500 cursor-pointer transition-colors">
                <Settings size={18} />
                <span className="font-medium text-sm">Account Settings</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem onClick={logout} className="rounded-xl px-3 py-2.5 gap-3 text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer transition-colors">
              <LogOut size={18} />
              <span className="font-medium text-sm">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
