"use client";

import { useEffect, useState } from "react";
import { format, toZonedTime } from "date-fns-tz";

export default function Clock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timezone = "Asia/Manila"; // Philippines Time
      const phtTime = toZonedTime(now, timezone);

      setTime(format(phtTime, "hh:mm a")); // 12-hour format with AM/PM
      setDate(format(phtTime, "MMMM dd, yyyy")); // February 12, 2025
    };

    updateClock(); // Update immediately
    const interval = setInterval(updateClock, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="w-full leading-none lg:mt-7">
      <div className="flex-shrink text-[20vw] lg:text-[10vw] helvetica font-bold">
        {time}
      </div>
      <div className="text-[30px] lg:text-4xl text-gray-600">{date}</div>
    </div>
  );
}
