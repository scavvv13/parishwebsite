export async function getAnnouncements() {
  try {
    const res = await fetch("http://localhost:3000/api/announcements", {
      cache: "no-store", // Prevents Next.js from caching the request
    });

    if (!res.ok) throw new Error("Failed to fetch announcements");

    const data = await res.json();
    return data.announcements || [];
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
}
