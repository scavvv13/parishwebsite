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
  { text: "News", href: "/news" },
  {
    text: "Appointment",
    href: "/contact",
    subNav: [
      { text: "Book Appointment", href: "/contact/book" },
      { text: "Manage Appointment", href: "/contact/manage" },
    ],
  },
];
