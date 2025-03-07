import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";

// Mock data source (this could be a DB query)
const ANNOUNCEMENTS = [
  "📢 Baptismal certificates are now available for those baptized last March 25, 2024.",
  "📢 The parish office will not take appointment scheduling through the office starting next Sunday.",
];

// Wrap the API response with `unstable_cache` and assign it a tag
const getCachedAnnouncements = unstable_cache(
  async () => ANNOUNCEMENTS,
  ["announcements"], // Cache tag
  { revalidate: 20 } // Default refresh every 20s
);

export async function GET() {
  const announcements = await getCachedAnnouncements();
  return NextResponse.json({ announcements });
}

export async function POST() {
  revalidateTag("announcements"); // Manually refresh cache
  return NextResponse.json({ success: true });
}
