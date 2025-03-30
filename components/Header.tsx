"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import Navbar from "./Navbar";
import Modal from "./Modal";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Profile from "./Profile";
import { useUser } from "../app/providers/UserProvider";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const controls = useAnimation();
  const { user } = useUser(); //todo:use isLoading
  const [hasBorder, setHasBorder] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State for modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Function to update URL when opening/closing modals
  const setModal = (modalType: string | null) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);

      if (modalType) {
        url.searchParams.set("modal", modalType);
      } else {
        url.searchParams.delete("modal");
      }

      // Use history.pushState to update URL without full navigation
      window.history.pushState({}, "", url.toString());
    }
  };

  // Set modal state and update URL
  const handleLoginModalToggle = (value: boolean) => {
    setIsLoginModalOpen(value);
    if (value) {
      setModal("login");
    } else {
      setModal(null);
    }
  };

  const handleRegisterModalToggle = (value: boolean) => {
    setIsRegisterModalOpen(value);
    if (value) {
      setModal("register");
    } else {
      setModal(null);
    }
  };

  const handleProfileModalToggle = (value: boolean) => {
    setIsProfileModalOpen(value);
    if (value) {
      setModal("profile");
    } else {
      setModal(null);
    }
  };

  // Handle popstate (browser back/forward) event
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== "undefined") {
        const searchParams = new URLSearchParams(window.location.search);
        const modalParam = searchParams.get("modal");

        // Update modal states based on URL
        setIsLoginModalOpen(modalParam === "login");
        setIsRegisterModalOpen(modalParam === "register");
        setIsProfileModalOpen(modalParam === "profile");
      }
    };

    // Initial check on mount
    handlePopState();

    // Listen for browser back/forward
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Check URL on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const modalParam = searchParams.get("modal");

      setIsLoginModalOpen(modalParam === "login");
      setIsRegisterModalOpen(modalParam === "register");
      setIsProfileModalOpen(modalParam === "profile");
    }
  }, []);

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

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
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
          ${hasBorder ? "" : ""}
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

        <div className="flex items-center space-x-2">
          <button
            onClick={() =>
              user
                ? handleProfileModalToggle(true)
                : handleLoginModalToggle(true)
            }
            className="hidden lg:flex flex-col items-end justify-center 
    p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 
    transition-colors duration-200"
          >
            {user ? (
              <div className="flex flex-row  space-x-2">
                <div className="flex flex-col place-content-center mr-3">
                  <span className="font-bold text-md text-gray-900 dark:text-white leading-none">
                    {user.givenName} {user.familyName}
                  </span>
                  <span className="font-normal text-xs text-gray-600 dark:text-gray-400 place-self-end">
                    {user.groups[1]}
                  </span>
                </div>
                <Image
                  src={user.profile_picture}
                  width={40}
                  height={40}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mt-1"
                />
              </div>
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
          <Button
            variant="outline"
            title="Menu"
            aria-label="Menu"
            className="p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 
              transition-colors duration-200"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu />
          </Button>
        </div>
      </motion.header>

      <Suspense fallback={null}>
        <Modal
          isOpen={isLoginModalOpen}
          onClose={() => handleLoginModalToggle(false)}
        >
          <Login
            setIsLoginModalOpen={handleLoginModalToggle}
            setIsRegisterModalOpen={handleRegisterModalToggle}
          />
        </Modal>
        <Modal
          isOpen={isRegisterModalOpen}
          onClose={() => handleRegisterModalToggle(false)}
        >
          <Register
            setIsLoginModalOpen={handleLoginModalToggle}
            setIsRegisterModalOpen={handleRegisterModalToggle}
          />
        </Modal>
        <Modal
          isOpen={isProfileModalOpen}
          onClose={() => handleProfileModalToggle(false)}
          className="relative p-6 max-w-xl w-full"
        >
          <Profile />
        </Modal>
      </Suspense>

      <Navbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </>
  );
};

export default Header;
