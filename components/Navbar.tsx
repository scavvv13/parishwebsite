import Link from "next/link";
import { useState } from "react";
import { navLinks } from "../app/hooks/useNavItems";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>(
    {}
  );
  const pathname = usePathname();
  const toggleDropdown = (parentNav: string) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [parentNav]: !prev[parentNav],
    }));
  };

  return (
    <nav className="w-[256px] bg-white border-black border-l absolute h-screen top-0 right-0 z-10 pt-[64px]">
      <div className="flex flex-col w-full">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <div key={link.href} className="w-full">
              {/* Parent Nav Item */}
              <div
                className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                  isActive ? "bg-amber-500" : ""
                }`}
              >
                <Link
                  href={link.href}
                  className="text-gray-800 font-medium text-lg hover:text-gray-600 flex-grow"
                >
                  {link.text}
                </Link>

                {/* Dropdown Arrow */}
                {link.subNav && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown(link.text);
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full"
                    title={`Toggle ${link.text} dropdown`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className={`size-5 transition-transform duration-200 ${
                        dropdownOpen[link.text] ? "rotate-180" : ""
                      }`}
                    >
                      <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Dropdown Menu */}
              {link.subNav && (
                <div
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    dropdownOpen[link.text] ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="bg-gray-50 border-l-4 border-gray-200">
                    {link.subNav.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className={`block px-8 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 ${
                          pathname === subLink.href ? "bg-amber-400" : ""
                        }`}
                      >
                        {subLink.text}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
