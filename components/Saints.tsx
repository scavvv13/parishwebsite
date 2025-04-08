"use client";

import React from "react";
import { motion } from "framer-motion";

const SaintsAndSchedule = () => {
  // Mass schedule data from the image
  const massSchedule = [
    {
      day: "Sunday",
      time: "8:00 AM, 10:30 AM, 5:00 PM",
      location: "Main Church",
    },
    { day: "Monday", time: "7:00 AM", location: "Chapel" },
    { day: "Tuesday", time: "7:00 AM", location: "Chapel" },
    { day: "Wednesday", time: "7:00 AM, 6:00 PM", location: "Main Church" },
    { day: "Thursday", time: "7:00 AM", location: "Chapel" },
    { day: "Friday", time: "7:00 AM", location: "Chapel" },
  ];

  // Create image layout matching the reference
  // Using placeholder images instead of actual paths
  const placeholders = Array(7).fill("/api/placeholder/200/400");

  return (
    <div className="w-full bg-white p-4 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column: Saints images */}
        <div className="w-full lg:w-2/5">
          <div className="grid grid-cols-3 gap-1">
            {/* Top row - 3 images */}
            <motion.div
              className="aspect-[1/2] overflow-hidden rounded-md"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className="w-full h-full relative">
                <img
                  src="/api/placeholder/200/400"
                  alt="Saint figure"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              className="aspect-[1/2] overflow-hidden rounded-md"
              animate={{ y: [0, -5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full relative">
                <img
                  src="/api/placeholder/200/400"
                  alt="Saint figure"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              className="aspect-[1/2] overflow-hidden rounded-md"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <div className="w-full h-full relative">
                <img
                  src="/api/placeholder/200/400"
                  alt="Saint figure"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Middle row - 3 images */}
            <motion.div
              className="aspect-[1/2] overflow-hidden rounded-md"
              animate={{ y: [0, -5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4.3,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full relative">
                <img
                  src="/api/placeholder/200/400"
                  alt="Saint figure"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              className="aspect-[1/2] overflow-hidden rounded-md"
              animate={{ y: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5.2,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full relative">
                <img
                  src="/api/placeholder/200/400"
                  alt="Saint figure"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              className="aspect-[1/2] overflow-hidden rounded-md"
              animate={{ y: [0, -5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4.8,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full relative">
                <img
                  src="/api/placeholder/200/400"
                  alt="Saint figure"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Bottom row - 1 image centered in the grid */}
            <div className="col-span-3 flex justify-center">
              <motion.div
                className="aspect-[1/1] w-1/3 overflow-hidden rounded-md"
                animate={{ y: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5.5,
                  ease: "easeInOut",
                }}
              >
                <div className="w-full h-full relative">
                  <img
                    src="/api/placeholder/200/200"
                    alt="Saint figure"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Column: Mass Schedule */}
        <div className="w-full lg:w-3/5">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Mass Schedule
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {massSchedule.map((mass) => (
              <div key={mass.day} className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">{mass.day}</h3>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex">
                    <span className="text-gray-600 w-16">Time:</span>
                    <span>{mass.time}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-16">Location:</span>
                    <span>{mass.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaintsAndSchedule;
