"use client";

import React from "react";
import Clock from "@/components/Clock";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const massSchedule = [
  {
    day: "Sunday",
    time: "9:00 AM",
    location: "Main Sanctuary",
  },
  {
    day: "Sunday",
    time: "11:00 AM",
    location: "Main Sanctuary",
  },
  {
    day: "Wednesday",
    time: "6:30 PM",
    location: "Chapel",
  },
  {
    day: "Friday",
    time: "12:00 PM",
    location: "Small Hall",
  },
];

const Schedule = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 px-4 lg:px-14 py-10 min-h-screen w-full overflow-x-hidden">
      {/* Left Column: Title and Clock */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="mb-6">
          <h1 className="playfair text-[30px] lg:text-[72px] font-normal">
            Mass Schedule
          </h1>
          <Clock />
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-4 font-semibold justify-center lg:justify-start pt-10">
          <Button
            variant="outline"
            className="relative px-6 lg:px-10 py-3 text-xs lg:text-sm border dark:border-white"
            title="Stream Online"
          >
            Stream Online
            <div className="absolute top-2 right-2 w-[6px] h-[6px] bg-red-600 rounded-full"></div>
          </Button>
          <Button
            className="bg-black text-white dark:text-black dark:bg-white px-6 lg:px-10 py-3 text-xs lg:text-sm"
            title="Mass Archive"
          >
            Mass Archive
          </Button>
        </div>
      </div>

      {/* Right Column: Mass Schedule Cards */}
      <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {massSchedule.map((mass, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <h3 className="text-lg font-semibold">{mass.day}</h3>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                <strong>Time:</strong> {mass.time}
              </p>
              <p>
                <strong>Location:</strong> {mass.location}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
