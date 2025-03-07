import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Schedule from "@/components/Schedule";
import { getAnnouncements } from "@/lib/api"; // Import function

export const dynamic = "force-dynamic"; // Ensures fresh fetch on each request
export default async function Home() {
  const announcements = await getAnnouncements(); // Fetch on the server

  return (
    <>
      <Hero />
      <Marquee announcements={announcements} />
      <Schedule />
    </>
  );
}
