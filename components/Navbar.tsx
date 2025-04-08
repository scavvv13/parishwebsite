"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "@aws-amplify/auth";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { LogOut, X, LogIn } from "lucide-react";
import { navLinks } from "../app/hooks/useNavItems";
import ThemeToggle from "./ui/themeToggle";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useUser } from "@/app/providers/UserProvider";
import Modal from "./Modal";
import Login from "./auth/Login";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Navbar = ({ isOpen, setIsOpen }: NavbarProps) => {
  const { user, isLoading } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* Login Modal */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <Login
          setIsLoginModalOpen={setIsLoginModalOpen}
          setIsRegisterModalOpen={setIsRegisterModalOpen}
        />
      </Modal>

      {/* Register Modal would go here */}

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        {/* Drawer Content */}
        <DrawerContent className="p-4">
          {/* Header with Logout & Close Buttons */}
          <DrawerHeader className="flex justify-between items-center">
            <DrawerTitle className="text-4xl font-black">Menu</DrawerTitle>
            <div className="flex gap-2">
              <ThemeToggle />
              {isLoading ? (
                <Button disabled className="flex items-center gap-2">
                  Loading...
                </Button>
              ) : user ? (
                <Button
                  variant="logout"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center gap-2"
                >
                  Login
                  <LogIn className="  w-4 h-4" />
                </Button>
              )}
            </div>
          </DrawerHeader>

          {/* Nav Links as Horizontal Cards */}
          <div className="pb-12 flex flex-row flex-wrap gap-4 justify-center mt-6 sm:max-h-max overflow-scroll no-scrollbar ">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-all hover:scale-105 "
              >
                <Card className="md:w-40 md:h-32 sm:w-28 sm:h-18 md:overflow-hidden border">
                  <CardContent className="p-0 md:h-20 h-10 bg-gray-100 dark:bg-gray-800 flex items-center justify-center object-cover rounded-t-xl">
                    {link.icon ? (
                      <link.icon className="md:w-10 md:h-10 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-300 " />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600" />
                    )}
                  </CardContent>
                  <CardFooter className="p-0 h-12 flex items-center justify-center">
                    <span className="font-normal text-gray-800 dark:text-gray-200 text-center text-xs px-1">
                      {link.text}
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
