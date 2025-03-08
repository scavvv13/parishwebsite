import { NextResponse } from "next/server";
import { unstable_cache, revalidateTag } from "next/cache";
import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";

// Initialize Amplify client
const client = generateClient<Schema>();

// Fetch announcements from Amplify and filter valid ones
const fetchAnnouncements = async () => {
  try {
    const { data: items, errors } = await client.models.announcements.list();

    if (errors) {
      console.error("Amplify errors:", errors);
      return [];
    }

    return items
      .map((item) => item.content)
      .filter((text): text is string => !!text); // Remove nulls
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
};

// Cache Amplify announcements for SSR with a revalidation strategy
const getCachedAnnouncements = unstable_cache(
  fetchAnnouncements,
  ["announcements"],
  {
    revalidate: 20, // Revalidate every 20s
  }
);

export async function GET() {
  const announcements = await getCachedAnnouncements();
  return NextResponse.json({ announcements });
}

// Manual cache revalidation when announcements are updated
export async function POST() {
  revalidateTag("announcements");
  return NextResponse.json({ success: true });
}
