//todo: refactor to fully dynamic schedule where admins can set the schedule in admin panel
//todo: admin panel

import { useState, useEffect } from "react";
import { addHours, setHours, setMinutes, isSunday} from "date-fns";

const useMassSchedule = () => {
  interface MassSchedule {
    start: Date;
    end: Date;
  }

  const [massSchedule, setMassSchedule] = useState<MassSchedule[]>([]);

  useEffect(() => {
    const now = new Date();
    const schedules = [];

    // Everyday mass at 7am
    const dailyMass = setMinutes(setHours(new Date(), 7), 0);
    schedules.push({
      start: dailyMass,
      end: addHours(dailyMass, 1),
    });

    // Sunday masses
    if (isSunday(now)) {
      const sundayMasses = [
        { hour: 7, minute: 0 },
        { hour: 9, minute: 30 },
        { hour: 11, minute: 0 },
        { hour: 17, minute: 0 },
        { hour: 18, minute: 30 },
      ];

      sundayMasses.forEach(({ hour, minute }) => {
        const massStart = setMinutes(setHours(new Date(), hour), minute);
        schedules.push({
          start: massStart,
          end: addHours(massStart, 1),
        });
      });
    }

    // Sort schedules by start time
    schedules.sort((a, b) => a.start.getTime() - b.start.getTime());
    setMassSchedule(schedules);
  }, []);

  return massSchedule;
};

export default useMassSchedule;
