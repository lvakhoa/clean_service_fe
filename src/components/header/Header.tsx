'use client';

import ENV from '@/configs/env';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';


type HeaderProps = {
  isAuth?: boolean;
  role?: string;
};

const Header = ({ isAuth, role }: HeaderProps) => {
  //const links = ['About Us', 'Career', 'Dashboard'];

  const router = useRouter();


  const {useGetProfile, useLogout} = useAuth();
  
  const mutation = useLogout;
  const { data , error , isPending } = useGetProfile()
  console.log('useGetProfile', data);
  const links = [
    {
      name: 'About Us',
      url: '/about-us'
    },
    {
      name: 'Career',
      url: '/career'
    },
    {
      name: 'Dashboard',
      url: '/dashboard'
    }
  ]

  const handleLogIn = () => { 
    window.location.href = ENV.API_BASE_URL + '/auth/login';
  };

  const handleSignUpCustomer = () => {
    window.location.href = ENV.API_BASE_URL + '/auth/signup/customer';
  };

  return (
    <header className="flex justify-center bg-transparent">
      <div className="flex flex-row w-full max-w-[1170px] h-[38px] justify-between items-end mt-[20px]">
        <a href="/">
        <img src="/images/Header/Logo.svg" alt="Clean" className="h-[38px]" />
        </a>
        <nav className="flex flex-wrap gap-8 items-center">
          {links.map((link) => (
            <a
              href={`${link.url}`}
              key={link.url}
              className="text-gray-700 font-Averta-Semibold mt-1"
            >
              {link.name}
            </a>
          ))}
          
          {isAuth ? (
            // <div className="flex gap-5 justify-between items-center w-[169px]">
            //   <Image
            //     src="/images/Dashboard/Header/Avatar.png"
            //     alt="Avatar"
            //     width={44}
            //     height={44}
            //     sizes="100vw"
            //     style={{ width: '44px', height: 'auto' }}
            //   />
            //   <div className="flex flex-col self-stretch my-auto">
            //     <div className="text-sm font-bold text-neutral-700 font-Averta-Semibold">
            //       Moni Roy
            //     </div>
            //     <div className="self-start text-xs font-semibold text-neutral-600 font-Averta-Regular">
            //       Admin
            //     </div>
            //   </div>
            //   <Image
            //     src="/images/Dashboard/Header/DropDown.svg"
            //     alt=""
            //     width={18}
            //     height={18}
            //     sizes="100vw"
            //     style={{ width: '18px', height: 'auto' }}
            //   />
            //   <img loading="lazy" src="/images/Dashboard/Header/DropDown.svg" alt="" className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]" />
            // </div>
            <DropdownMenu>
  <DropdownMenuTrigger> 
     <div className="flex gap-5 justify-between items-center w-[169px]">
               <Image
                src={data?.profilePicture ||'/images/Dashboard/Header/Avatar.png'}
                alt="Avatar"
                width={44}
                height={44}
                sizes="100vw"
                style={{ width: '44px', height: 'auto' }}
              />
              <div className="flex flex-col self-stretch my-auto">
                <div className="text-sm font-bold text-neutral-700 font-Averta-Semibold">
                  {data?.fullName}
                </div>
                <div className="self-start text-xs font-semibold text-neutral-600 font-Averta-Regular">
                  {role}
                </div>
              </div>
              <Image
                src="/images/Dashboard/Header/DropDown.svg"
                alt=""
                width={18}
                height={18}
                sizes="100vw"
                style={{ width: '18px', height: 'auto' }}
              />
              {/* <img loading="lazy" src="/images/Dashboard/Header/DropDown.svg" alt="" className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]" /> */}
            </div>
            </DropdownMenuTrigger> 
  <DropdownMenuContent>
    <DropdownMenuLabel className='hidden'>My Account</DropdownMenuLabel>
    <DropdownMenuItem><button onClick={() => router.push(`/dashboard/profile`)} >
Profile
              </button></DropdownMenuItem>
    <DropdownMenuSeparator />
        <DropdownMenuItem><button onClick={() => mutation.mutate()} >
Log out
              </button></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

          ) : (
            <div className="space-x-2">
              <button
                onClick={handleLogIn}
                className="text-center text-blue-600 rounded-xl px-6 py-1 border-2 border-blue-600 hover:bg-blue-100 border-solid font-Averta-Semibold duration-300"
              >
                Log In
              </button>
              <button
                onClick={handleSignUpCustomer}
                className="text-center text-white rounded-xl px-6 py-1 border-2 border-blue-600 bg-blue-600 border-solid font-Averta-Semibold"
              >
                Sign Up
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
