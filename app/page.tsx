import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Schedule from "@/components/Schedule";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default async function Home() {
  // Fetch announcements server-side
  let announcements: Schema["announcements"]["type"][] = [];

  try {
    const { data: items } = await client.models.announcements.list();
    announcements = items ?? [];
  } catch (error) {
    console.error("Error fetching announcements:", error);
  }

  return (
    <>
      <Hero />
      <Marquee announcements={announcements} />
      <Schedule />
    </>
  );
}
