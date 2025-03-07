export const quickLinks = [
  { label: "Events", iconPath: "/events-icon.png", href: "/events" },
  {
    label: "Mass Schedule",
    iconPath: "/clock-icon.png",
    href: "/mass-schedule",
  },
  {
    label: "Appointment",
    iconPath: "/calendar-icon.png",
    href: "/appointment",
  },
  { label: "Donations", iconPath: "/donation-icon.png", href: "/donation" },
];
export default function useQuickLinks() {
  return quickLinks;
}
