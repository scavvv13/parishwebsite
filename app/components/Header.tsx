"use client";
import { useState } from "react";
import { navLinks } from "./Navbar";
import Link from "next/link";
import Image from "next/image";
import MassIndicator from "./MassIndicator";
import Navbar from "./Navbar";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      {/* main container */}
      <div className=" w-full h-full flex  justify-between items-center pt-3 px-3 lg:px-24 lg:pt-5">
        {/* logo and parish name */}
        <div className="flex items-center space-x-4">
          <img
            src="/madonnalogo.png"
            alt="Madonna del Divino Amore Parish Logo"
            className="size-16 md:size-13 mb-2 min-w-[64px]"
          />
          <span className="md:hidden sm:hidden lg:block text-4xl font-bold pinyon ">
            Madonna Del Divino Amore Parish
          </span>
        </div>

        {/* Mass Indicator section */}
        <MassIndicator />

        {/* Navlinks visible to lg screens only */}
        <div className="hidden lg:flex space-x-8 text-lg font-medium">
          <Navbar />
        </div>

        {/* Sidebar AREA ; CONDITIONAL */}

        {isSidebarOpen && (
          // main container
          <div className="fixed top-0 left-0 flex flex-col w-full h-full bg-white z-50 p-10 ">
            {/* logo area */}
            <div className="justify-between items-center border-b-2 border-gray-300 pb-12">
              <Image
                src="/madonnalogo.png"
                alt="Madonna del Divino Amore Parish Logo"
                width={100}
                height={100}
                className=" place-self-center"
              />
            </div>
            {/* Navlinks AREA */}
            <div className="pt-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={toggleSidebar}
                  className="cursor-pointer"
                >
                  <div className=" border-gray-500 space-y-4 py-4 text-2xl font-medium">
                    {link.text}
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={toggleSidebar}
              className="rounded-lg bg-sky-200 py-2 px-4 mt-8 text-xl font-medium fixed bottom-5 left-10 right-10"
              title="Close Sidebar"
            >
              Close
            </button>
          </div>
        )}

        {/* menu button visble only to small screens */}
        <div className="md: lg:hidden">
          <button
            onClick={toggleSidebar}
            className="focus:outline-none"
            title="Toggle Sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-[45px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
