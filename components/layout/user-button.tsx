"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from '@/components/ui/avatar';

import { FaUser } from 'react-icons/fa';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { LogoutButton } from '@/components/auth/logout-button';
import { ExitIcon } from '@radix-ui/react-icons';

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image}/>
          <AvatarFallback className='bg-sky-300'>
            <FaUser className='text-white'/>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <LogoutButton>
          <DropdownMenuItem className='cursor-pointer'>
            <ExitIcon className='h-4 w-4 mr-2'/>
            Salir
            </DropdownMenuItem>
        </LogoutButton>
        <DropdownMenuItem className='cursor-pointer'>Ajustes</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}