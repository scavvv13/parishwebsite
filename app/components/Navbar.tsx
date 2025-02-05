import Link from "next/link";
import { useState } from "react";

export const navLinks = [
  { text: "Home", href: "/" },
  {
    text: "Services",
    href: "/services",
    subNav: [
      { text: "House Blessings", href: "/services/house-blessings" },
      { text: "Religous Items Blessings", href: "/services/relics-blessings" },
      { text: "Pets Blessings", href: "/services/pets-blessings" },
      { text: "Vehicle Blessings", href: "/services/vehicle-blessings" },
    ],
  },
  {
    text: "Events",
    href: "/events",
    subNav: [
      { text: "Event 1", href: "/events/event1" },
      { text: "Event 2", href: "/events/event2" },
    ],
  },
  {
    text: "Appointment",
    href: "/contact",
    subNav: [
      { text: "Book Appointment", href: "/contact/book" },
      { text: "Manage Appointment", href: "/contact/manage" },
    ],
  },
  { text: "About", href: "/about" },
  { text: "Gallery", href: "/gallery" },
  { text: "News", href: "/news" },
];

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleDropdown = (parentNav: string) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [parentNav]: !prev[parentNav],
    }));
  };

  return (
    <nav className="flex space-x-8 text-lg font-medium">
      {navLinks.map((link) => (
        <div key={link.href} className="relative flex items-center space-x-1">
          {/* Parent Nav Text */}
          <Link href={link.href} className="hover:text-gray-700">
            {link.text}
          </Link>

          {/* Dropdown Arrow (if subNav exists) */}
          {link.subNav && (
            <button
              onClick={() => toggleDropdown(link.text)}
              className="flex items-center"
              title={`Toggle ${link.text} dropdown`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="size-5" // Adjust vertical positioning
              >
                <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          )}

          {/* Dropdown Menu */}
          {link.subNav && dropdownOpen[link.text] && (
            <div className="absolute -top-[120px] left-0 mt-40 w-max bg-white border border-gray-200 rounded shadow-lg">
              {link.subNav.map((subLink) => (
                <Link
                  key={subLink.href}
                  href={subLink.href}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 place-self-center w-full"
                  onClick={() => toggleDropdown(link.text)}
                >
                  {subLink.text}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
