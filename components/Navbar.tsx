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
import { LogOut } from "lucide-react";
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
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent className=" border-l border-black">
        <DrawerHeader>
          <DrawerTitle className="text-3xl font-extrabold">Menu</DrawerTitle>
        </DrawerHeader>

        {/* Nav Links - FLEX WRAP FIX */}
        <div className="p-10 flex flex-wrap justify-center gap-x-36 gap-y-12">
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

        {/* Logout & Close Buttons */}
        <div className="p-4 border-t">
          <Button
            variant="destructive"
            className="w-full flex items-center justify-center gap-2 text-2xl py-4"
            onClick={handleLogout}
          >
            <LogOut className="w-7 h-7" /> Logout
          </Button>
        </div>
        <DrawerClose asChild>
          <Button variant="outline" className="w-full mt-2 text-2xl py-4">
            Close
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default Navbar;
