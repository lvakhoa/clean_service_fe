'use client'
import Image from 'next/image';
import ENV from '@/configs/env';
import React from 'react';
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

  const router = useRouter();

  const {useGetProfile, useLogout} = useAuth();
    const { data , error , isPending } = useGetProfile()


  const mutation = useLogout;

    const handleLogIn = () => { 
    window.location.href = ENV.API_BASE_URL + '/auth/login';
  };

  const handleSignUpCustomer = () => {
    window.location.href = ENV.API_BASE_URL + '/auth/signup/customer';
  };
  return (
    <header className="flex flex-wrap gap-10 justify-between items-center py-6 pr-5 pl-12 w-full bg-white min-h-[100px] max-md:pl-5 max-md:max-w-full">
      <a href="/">
      <Image src='/images/Header/Logo.svg' alt='HeroIllustration' width={0} height={0} sizes="100vw" style={{ width: '126px', height: 'auto' }} />
      </a>
      <nav className="flex flex-wrap gap-8 items-center self-stretch my-auto min-w-[240px] max-md:max-w-full">
        {/* <a href="#" className="text-slate-800 font-Averta-Semibold">Residential</a> */}
        <a href="/about-us" className="text-slate-800 font-Averta-Semibold">About Us</a>
        <a href="/career" className="text-slate-800 font-Averta-Semibold">Career</a>
        <a href="/dashboard" className="text-slate-800 font-Averta-Semibold">Dashboard</a>
        {isAuth ? (
                   
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
            <DropdownMenuItem>
              <button onClick={() => router.push(`/dashboard/profile`)} >
Profile
              </button>
              </DropdownMenuItem>
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
        {/* <div className="flex gap-3.5 items-start self-stretch my-auto w-[169px]">
          <div className="flex gap-5 justify-between items-center w-[169px]">
            <Image 
              src="/images/Dashboard/Header/Avatar.png" 
              alt="Avatar" 
              width={44}
              height={44}
              sizes='100vw'
              style={{ width: '44px', height: 'auto' }}
            />
            <div className="flex flex-col self-stretch my-auto">
              <div className="text-sm font-bold text-neutral-700 font-Averta-Semibold">Moni Roy</div>
              <div className="self-start text-xs font-semibold text-neutral-600 font-Averta-Regular">Admin</div>
            </div>
            <Image 
              src='/images/Dashboard/Header/DropDown.svg' 
              alt='' 
              width={18} 
              height={18} 
              sizes="100vw" 
              style={{ width: '18px', height: 'auto' }} />
            <img loading="lazy" src="/images/Dashboard/Header/DropDown.svg" alt="" className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]" />
          </div>
        </div> */}
      </nav>
    </header>
  );
};

export default Header;