"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="relative flex items-center justify-between border border-black px-2 py-2 lg:px-3 lg:py-1">
        {/* Left side */}
        <div className="flex max-w-[calc(100%-60px)] sm:max-w-[calc(100%-80px)] lg:max-w-[calc(100%-200px)]">
          {/* Image container */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/madonnalogo.png"
                width={50}
                height={50}
                alt="madonna del divino amore logo"
                className=" w-12 lg:w-12"
              />
            </Link>
            {/* Vertical Line */}
            <div className="absolute sm:left-[66px] left-[70px] top-0 bottom-0 h-full w-[1px] bg-black" />
          </div>

          {/* Parish name and diocese */}
          <div className="flex items-center">
            <div className="flex flex-col ml-4 sm:ml-5">
              <strong className="playfair font-black text-[12px] text-start  lg:text-2xl leading-none lg:leading-none ">
                Madonna Del Divino Amore Parish
              </strong>
              <span className=" flex instrument text-[9px] text-center lg:text-start lg:text-lg leading-tight lg:leading-none">
                Diocese of Parañaque
              </span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="absolute top-[-1px] bottom-[-1px] right-0 flex h-[calc(100%+2px)] items-center border border-l-black border-y-black">
          {/* Menu Icon */}
          <button
            title="sideBarToggle"
            className="px-3 sm:px-4 h-full"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          {/* Login Section */}

          <button className="hidden h-full lg:flex flex-col items-center justify-center border-l border-l-black px-8">
            <span className="font-bold text-md leading-none">
              Have an Account?
            </span>
            <span className="font-normal text-sm leading-none">Login here</span>
          </button>
        </div>
      </header>
      {/* sidebar open  */}
      {isSidebarOpen && (
        <div className="relative">
          <Navbar />
        </div>
      )}
    </>
  );
};

export default Header;
