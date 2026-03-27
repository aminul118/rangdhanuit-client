'use client';

import LogOutDropDown from '@/components/modules/Authentication/LogOutDropdown';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LayoutGrid, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavUserProps {
  user: {
    name: string;
    email: string;
    picture?: string;
    role?: string;
  };
}

const NavUser = ({ user }: NavUserProps) => {
  const router = useRouter();
  const initials = user.name
    ? user.name
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  const handleDashboardRedirect = () => {
    router.push('/admin');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer border border-white/10">
          <AvatarImage
            src={user?.picture}
            alt={user.name}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm">{user.name}</p>
            <p className="w-[200px] truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center gap-2 cursor-pointer w-full">
              <User size={16} /> Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDashboardRedirect} className="flex items-center gap-2 cursor-pointer">
            <LayoutGrid size={16} /> Dashboard
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogOutDropDown />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavUser;
