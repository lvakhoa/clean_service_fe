"use client";
import Image from "next/image";
import ENV from "@/configs/env";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

type HeaderProps = {
  isAuth?: boolean;
  role?: string;
};
const Header = ({ isAuth, role }: HeaderProps) => {
  const router = useRouter();

  const { useGetProfile, useLogout } = useAuth();
  const { data, error, isPending } = useGetProfile();

  const mutation = useLogout;

  const handleLogIn = () => {
    window.location.href = ENV.API_BASE_URL + "/auth/login";
  };

  const handleSignUpCustomer = () => {
    window.location.href = ENV.API_BASE_URL + "/auth/signup/customer";
  };

  const links = [
    {
      name: "About Us",
      url: "/about-us",
    },
    {
      name: "Career",
      url: "/career",
    },
    {
      name: "Dashboard",
      url: "/dashboard",
    },
  ];
  return (
    <header className="flex min-h-[100px] w-full flex-wrap items-center justify-between gap-10 bg-white py-6 pl-12 pr-5 max-md:max-w-full max-md:pl-5">
      <a href="/">
        <Image
          src="/images/Header/Logo.svg"
          alt="HeroIllustration"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "126px", height: "auto" }}
        />
      </a>
      <nav className="my-auto flex min-w-[240px] flex-wrap items-center gap-8 self-stretch max-md:max-w-full">
        {/* <a href="#" className="text-slate-800 font-Averta-Semibold">Residential</a> */}
        {links.map((link) => (
          <a
            href={`${link.url}`}
            key={link.url}
            className="mt-1 font-Averta-Semibold text-gray-700"
          >
            {link.name}
          </a>
        ))}
        {isAuth && role === "Customer" && (
          <a
            href="/booking"
            className="mt-1 font-Averta-Semibold text-gray-700"
          >
            Booking
          </a>
        )}
        {isAuth ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex w-[169px] items-center justify-between gap-5">
                <Image
                  src={
                    data?.profilePicture ||
                    "/images/Dashboard/Header/Avatar.png"
                  }
                  alt="Avatar"
                  width={44}
                  height={44}
                  sizes="100vw"
                  style={{ width: "44px", height: "auto" }}
                />
                <div className="my-auto flex flex-col self-stretch">
                  <div className="font-Averta-Semibold text-sm font-bold text-neutral-700">
                    {data?.fullName}
                  </div>
                  <div className="self-start font-Averta-Regular text-xs font-semibold text-neutral-600">
                    {role}
                  </div>
                </div>
                <Image
                  src="/images/Dashboard/Header/DropDown.svg"
                  alt=""
                  width={18}
                  height={18}
                  sizes="100vw"
                  style={{ width: "18px", height: "auto" }}
                />
                {/* <img loading="lazy" src="/images/Dashboard/Header/DropDown.svg" alt="" className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]" /> */}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="hidden">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <button onClick={() => router.push(`/dashboard/personal`)}>
                  Profile
                </button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button onClick={() => mutation.mutate()}>Log out</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="space-x-2">
            <button
              onClick={handleLogIn}
              className="rounded-xl border-2 border-solid border-blue-600 px-6 py-1 text-center font-Averta-Semibold text-blue-600 duration-300 hover:bg-blue-100"
            >
              Log In
            </button>
            <button
              onClick={handleSignUpCustomer}
              className="rounded-xl border-2 border-solid border-blue-600 bg-blue-600 px-6 py-1 text-center font-Averta-Semibold text-white"
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
