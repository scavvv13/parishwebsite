"use client";

import { motion } from "framer-motion";
import type { Schema } from "../amplify/data/resource";

export default function Marquee({
  announcements,
}: {
  announcements: Schema["announcements"]["type"][];
}) {
  const repeatedAnnouncements = [...announcements, ...announcements]; // Duplicate for smooth looping

  return (
    <div className="overflow-hidden border-y border-black bg-gray-100 dark:bg-black w-full lg:mt-5">
      <motion.div
        className="flex whitespace-nowrap space-x-12 lg:py-3 lg:text-2xl font-bold py-2"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {repeatedAnnouncements.map((announcement, index) => (
          <span key={index}>{announcement.content}</span> // Ensure correct property
        ))}
      </motion.div>
    </div>
  );
}
