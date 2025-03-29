import { Home, PawPrint, Cross, Car } from "lucide-react";

export const navLinks = [
  { text: "Home", href: "/", icon: Home },
  { text: "House Blessings", href: "/services/house-blessings", icon: Home },
  {
    text: "Religious Items Blessings",
    href: "/services/relics-blessings",
    icon: Cross,
  },
  { text: "Pets Blessings", href: "/services/pets-blessings", icon: PawPrint },
  { text: "Vehicle Blessings", href: "/services/vehicle-blessings", icon: Car },
];
