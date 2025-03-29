"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import Navbar from "./Navbar";
import Modal from "./Modal";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ThemeToggle from "./ui/themeToggle";
import { useUser } from "../app/providers/UserProvider";

const Header = () => {
  const controls = useAnimation();
  const { user } = useUser(); //todo:use isLoading
  const [hasBorder, setHasBorder] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        setHasBorder(false);
        controls.start({
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: { duration: 0.3 },
        });
      } else {
        setHasBorder(true);
        controls.start({
          backdropFilter: "blur(0px)",
          boxShadow: "none",
          transition: { duration: 0.3 },
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <>
      <motion.header
        animate={controls}
        initial={{
          backdropFilter: "blur(0px)",
          boxShadow: "none",
        }}
        className={`
          fixed top-0 left-0 right-0 flex items-center justify-between 
          px-4 py-1 lg:px-6 z-50 
          bg-white/80 dark:bg-black/70 
          transition-all duration-300 ease-in-out
          ${hasBorder ? "border-b border-gray-200 dark:border-gray-800" : ""}
        `}
      >
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src="/madonnalogo.png"
              width={50}
              height={50}
              alt="Logo"
              className="w-12 lg:w-14 rounded-full transition-transform hover:scale-105"
            />
            <div className="hidden sm:block">
              <div className="flex flex-col leading-none ">
                <strong
                  className="playfair font-black text-sm lg:text-2xl 
                  text-gray-900 dark:text-white leading-none"
                >
                  Madonna Del Divino Amore Parish
                </strong>
                <span
                  className="instrument text-xs lg:text-lg 
                  text-gray-600 dark:text-gray-300 leading-none"
                >
                  Diocese of Parañaque
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          <button
            title="Menu"
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 
              transition-colors duration-200"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-700 dark:text-gray-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="hidden lg:flex flex-col items-end justify-center 
              p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 
              transition-colors duration-200"
          >
            {user ? (
              <>
                <span className="font-bold text-md text-gray-900 dark:text-white leading-none">
                  {user.givenName} {user.familyName}
                </span>
                <span className="font-normal text-xs text-gray-600 dark:text-gray-400">
                  admin
                </span>
              </>
            ) : (
              <>
                <span className="font-bold text-sm text-gray-900 dark:text-white leading-none">
                  Have an Account?
                </span>
                <span className="font-normal text-xs text-gray-600 dark:text-gray-300">
                  Login here
                </span>
              </>
            )}
          </button>
        </div>
      </motion.header>

      <Suspense fallback={null}>
        <Modal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        >
          <Login
            setIsLoginModalOpen={setIsLoginModalOpen}
            setIsRegisterModalOpen={setIsRegisterModalOpen}
          />
        </Modal>
        <Modal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
        >
          <Register
            setIsLoginModalOpen={setIsLoginModalOpen}
            setIsRegisterModalOpen={setIsRegisterModalOpen}
          />
        </Modal>
      </Suspense>

      <Navbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </>
  );
};

export default Header;
