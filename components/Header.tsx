"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";
import Modal from "./Modal";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { motion, useAnimation } from "framer-motion";
import { Authenticator } from "@aws-amplify/ui-react";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";

const Header = () => {
  const [hasBorder, setHasBorder] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [givenName, setGivenName] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await fetchAuthSession();
        await getCurrentUser();
        setGivenName(String(session.tokens?.idToken?.payload.given_name) || "");
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasBorder(false);
        controls.start({
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderBottom: "1px solid transparent",
        });
      } else {
        setHasBorder(true);
        controls.start({
          backdropFilter: "blur(0px)",
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderBottom: "1px solid black",
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
        initial={{ backdropFilter: "blur(0px)", borderBottom: "1px solid " }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 flex items-center justify-between px-2 py-2 lg:px-3 lg:py-0 z-50 
          ${
            hasBorder
              ? "border-b border-black"
              : "border-b shadow-md border-transparent"
          }`}
      >
        <div className="flex max-w-[calc(100%-60px)] sm:max-w-[calc(100%-80px)] lg:max-w-[calc(100%-200px)]">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/madonnalogo.png"
                width={50}
                height={50}
                alt="Logo"
                className="w-12 lg:w-12"
              />
            </Link>
            <div className="absolute sm:left-[66px] left-[70px] top-0 bottom-0 h-full w-[1px] bg-black" />
          </div>
          <div className="flex items-center">
            <div className="flex flex-col ml-4 sm:ml-5">
              <strong className="playfair font-black text-[12px] lg:text-2xl leading-none">
                Madonna Del Divino Amore Parish
              </strong>
              <span className="instrument text-[9px] lg:text-lg leading-tight">
                Diocese of Parañaque
              </span>
            </div>
          </div>
        </div>

        <div
          className={`absolute top-[-1px] bottom-[1px] right-0 flex h-[calc(100%+2px)] items-center border ${
            hasBorder ? "border-black" : " border-l-black"
          }`}
        >
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
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="hidden h-full lg:flex flex-col items-center justify-center border-l border-l-black px-8"
          >
            {givenName ? (
              <span className="font-bold text-md">{givenName}</span>
            ) : (
              <>
                <span className="font-bold text-md">Have an Account?</span>
                <span className="font-normal text-sm">Login here</span>
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
          <Login />
        </Modal>
        <Modal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
        >
          <Register />
        </Modal>
      </Suspense>

      {isSidebarOpen && (
        <div className="relative">
          <Navbar />
        </div>
      )}
    </Authenticator.Provider>
  );
};

export default Header;
