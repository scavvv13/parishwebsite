import React, { useState, useEffect } from "react";
import useMassSchedule from "../app/hooks/useMassSchedule";
import { formatDistanceToNow, differenceInMinutes } from "date-fns";
import Link from "next/link";

const MassIndicator = () => {
  const massSchedule = useMassSchedule();
  const [currentStatus, setCurrentStatus] = useState("");
  const [statusColor, setStatusColor] = useState(
    "bg-[#93f995] text-[#1d8518] border-[#1d8518]"
  );

  useEffect(() => {
    const checkMassStatus = () => {
      const now = new Date();
      const ongoingMass = massSchedule.find(
        (mass) => now >= mass.start && now <= mass.end
      );

      if (ongoingMass) {
        setCurrentStatus("Mass Ongoing");
        setStatusColor("bg-[#93f995] text-[#1d8518] border-[#1d8518]"); // Default color for ongoing mass
      } else {
        const nextMass = massSchedule.find((mass) => now < mass.start);
        if (nextMass) {
          const timeUntilNextMass = formatDistanceToNow(nextMass.start, {
            includeSeconds: true,
          });
          setCurrentStatus(`Mass in ${timeUntilNextMass}`);

          const minutesUntilNextMass = differenceInMinutes(nextMass.start, now);
          if (minutesUntilNextMass <= 5) {
            setStatusColor(
              "bg-[#fda14b8a] text-[#994a00] border-[#fda14b] border-[2px]"
            );
          } else if (minutesUntilNextMass <= 15) {
            setStatusColor(
              "bg-[#f7ff5883] text-[#5b5b10] border-[#949c00ff] border-[2px]"
            );
          } else {
            setStatusColor("bg-[#93f995] text-[#1d8518]"); // Default color
          }
        } else {
          setCurrentStatus("No upcoming Masses");
          setStatusColor("bg-[#7c9dff4e] text-[#2b2b54] border-[#2b2b54]"); // Default color
        }
      }
    };

    checkMassStatus();
    const interval = setInterval(checkMassStatus, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [massSchedule]);
  //useeffect to check mass status

  return (
    <Link
      href={"/mass-schedule"}
      className={`flex flex-row border  ${statusColor} rounded-full px-6 py-2 font-medium text-[18px] mb-3 min-w-[243px]`}
    >
      <div className="w-[5px] h-[5px] rounded-full bg-[#0a5b06] place-self-center mr-3 "></div>
      {currentStatus}
    </Link>
  );
};

export default MassIndicator;
