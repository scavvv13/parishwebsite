"use client";

import Link from "next/link";
import { signOut } from "@aws-amplify/auth";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { LogOut, X } from "lucide-react";
import { navLinks } from "../app/hooks/useNavItems";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Navbar = ({ isOpen, setIsOpen }: NavbarProps) => {
  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      {/* Drawer Content */}
      <DrawerContent className="p-4">
        {/* Header with Logout & Close Buttons */}
        <DrawerHeader className="flex justify-between items-center">
          <DrawerTitle className="text-4xl font-black">Menu</DrawerTitle>
          <div className="flex gap-2">
            <Button
              variant="logout"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
            <DrawerClose asChild>
              <Button variant="default">
                <X className="w-5 h-5" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* Nav Links - FLEX WRAP FIX */}
        <div className="pb-12 flex flex-wrap justify-center gap-x-36 gap-y-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-7xl font-bold dark:text-gray-800 text-gray-300 hover:text-black transition-all dark:hover:text-white"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Navbar;
