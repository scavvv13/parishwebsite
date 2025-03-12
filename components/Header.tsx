"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Modal from "./Modal";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { motion, useAnimation } from "framer-motion";

import { Authenticator } from "@aws-amplify/ui-react";

import useAuthStore from "@/store/authStore";

const LoginModal = () => {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const user = useAuthStore((state) => state.user);
  const searchParams = useSearchParams();
  const router = useRouter();
  const isLoginModalOpen = searchParams.get("loginModal") === "login";

  const openLoginModal = () => {
    router.push("?loginModal=login", { scroll: false });
  };

  const closeLoginModal = () => {
    router.push("/", { scroll: false });
  };

  useEffect(() => {
    fetchUser(); // Load user on mount
  }, [fetchUser]);
  return (
    <>
      {/* Login Section */}
      <button
        onClick={openLoginModal}
        className="hidden h-full lg:flex flex-col items-center justify-center border-l border-l-black px-8"
      >
        {user ? (
          <>
            <span className="font-bold text-md leading-none">{user.email}</span>
          </>
        ) : (
          <>
            <span className="font-bold text-md leading-none">
              Have an Account?
            </span>
            <span className="font-normal text-sm leading-none">Login here</span>
          </>
        )}
      </button>

      {/* Modal */}
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <Login />
      </Modal>
    </>
  );
};

const RegisterModal = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isRegisterModalOpen = searchParams.get("registerModal") === "register";

  const closeRegisterModal = () => {
    router.push("/", { scroll: false });
  };

  return (
    <>
      <Modal isOpen={isRegisterModalOpen} onClose={closeRegisterModal}>
        <Register />
      </Modal>
    </>
  );
};

const Header = () => {
  const [hasBorder, setHasBorder] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const controls = useAnimation();

  ///[header useEffects]
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasBorder(false); // Hide border when scrolling
        controls.start({
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white
          borderBottom: "1px solid transparent", // Hide border
        });
      } else {
        setHasBorder(true); // Show border at top
        controls.start({
          backdropFilter: "blur(0px)",
          backgroundColor: "rgba(255, 255, 255, 1)", // Solid white
          borderBottom: "1px solid black", // Show border
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <Authenticator.Provider>
      <motion.header
        animate={controls}
        initial={{
          backdropFilter: "blur(0px)",
          borderBottom: "1px solid ",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={fixed top-0 left-0 right-0 flex items-center justify-between px-2 py-2 lg:px-3 lg:py-2 z-50 
  ${
    hasBorder
      ? "border-b border-black"
      : "border-b shadow-md border-transparent"
  }}
      >
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
                className="w-12 lg:w-12"
              />
            </Link>
            {/* Vertical Line */}
            <div className="absolute sm:left-[66px] left-[70px] top-0 bottom-0 h-full w-[1px] bg-black" />
          </div>

          {/* Parish name and diocese */}
          <div className="flex items-center">
            <div className="flex flex-col ml-4 sm:ml-5">
              <strong className="playfair font-black text-[12px] text-start lg:text-2xl leading-none lg:leading-none">
                Madonna Del Divino Amore Parish
              </strong>
              <span className="flex instrument text-[9px] text-center lg:text-start lg:text-lg leading-tight lg:leading-none">
                Diocese of Parañaque
              </span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div
          className={absolute top-[-1px] bottom-[1px] right-0 flex h-[calc(100%+2px)] items-center border ${
            hasBorder ? "border-black" : " border-l-black"
          }}
        >
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

          {/* Login Modal (wrapped in Suspense) */}
          <Suspense fallback={null}>
            <LoginModal />
            <RegisterModal />
          </Suspense>
        </div>
      </motion.header>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="relative">
          <Navbar />
        </div>
      )}
    </Authenticator.Provider>
  );
};

export default Header;