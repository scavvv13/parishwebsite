"use client";
import { useState } from "react";
import { navLinks } from "./Navbar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MassIndicator from "./MassIndicator";
import Navbar from "./Navbar";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //initializrs
  const pathname = usePathname(); // Get the current route

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <header className=" min-h-1 flex border-y border-black px-2 py-2 lg:px-3 lg:py-1 relative items-center justify-between">
      {/* left side */}
      <div className=" flex">
        {/* Image container and division*/}
        <div className="flex items-center ">
          <Image
            src="/madonnalogo.png"
            width={50}
            height={50}
            alt="madonna del divino amore logo"
          />
          {/* Absolute Vertical Line (Touches Header) */}
          <div className="absolute lg:right-0 lg:top-0 lg:bottom-0 lg:left-[76px] right-1 top-0 bottom-0 left-[66] w-[1px] bg-black "></div>
        </div>
        {/* Madonna del divino amore parish text and division */}
        <div className="flex items-center text-center lg:text-justify">
          {/* text of madona and diocease flex-col */}
          <div className="flex flex-col ml-5">
            <strong className=" playfair font-black lg:text-2xl lg:leading-none block">
              Madonna Del Divino Amore Parish
            </strong>
            <span className=" instrument lg:text-lg leading-none">
              Diocese of Parañaque
            </span>
          </div>
        </div>
      </div>
      {/* right side */}

      {/* Menu bar for sm screens */}
      <div className="lg:hidden flex items-center  absolute top-0 bottom-0 right-0  bg-black text-white px-3">
        Menu
      </div>

      {/* Navigation part for lg screens*/}
      <div className="hidden absolute top-0 bottom-0 right-0 lg:flex items-center leading-none">
        {navLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-10 flex items-center h-full leading-none ${
              pathname === link.href
                ? "text-[#ffffff] font-bold bg-black"
                : "text-black"
            }`}
          >
            {/* Add left border instead of right to prevent overlap */}
            {index !== 0 && (
              <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-black"></div>
            )}
            <span className="helvetica leading-none text-[15px] font-medium">
              {link.text}
            </span>
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
