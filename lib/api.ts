///[environment detection]
const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000" // Use localhost in dev
    : process.env.NEXT_PUBLIC_API_URL; // Use env-provided URL in production

///[fetching announcements]

export async function getAnnouncements() {
  //used in main page.tsx
  try {
    const res = await fetch(`${API_URL}/api/announcements`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch announcements");

    const data = await res.json();
    return data.announcements || [];
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
}
