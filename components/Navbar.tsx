"use client";

import Link from "next/link";
import { signOut } from "@aws-amplify/auth";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { LogOut, X } from "lucide-react";
import { navLinks } from "../app/hooks/useNavItems";
import ThemeToggle from "./ui/themeToggle";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
            <ThemeToggle />
          </div>
        </DrawerHeader>

        {/* Nav Links as Horizontal Cards */}
        <div className="pb-12 flex flex-row flex-wrap gap-4 justify-center mt-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-all hover:scale-105"
            >
              <Card className="w-40 h-32 overflow-hidden border">
                <CardContent className="p-0 h-20 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {link.icon ? (
                    <link.icon className="w-10 h-10 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600" />
                  )}
                </CardContent>
                <CardFooter className="p-0 h-12 flex items-center justify-center">
                  <span className="font-medium text-gray-800 dark:text-gray-200 text-center text-sm px-2">
                    {link.text}
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Navbar;
