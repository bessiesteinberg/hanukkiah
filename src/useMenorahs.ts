import { useState } from "react";
import { hanukkahDates } from "./hanukkahDates.ts";
import type { DateTime } from "luxon";

// TODO: move to different file?
export interface Day {
  date: DateTime<true>;
  candlesPerMenorah: number;
  numberOfMenorahs: number;
  numberOfCandles: number;
  addMenorah: null | (() => void);
  removeMenorah: null | (() => void);
}

export const useMenorahs = () => {
  const [menorahsPerDay, setMenorahsPerDay] = useState(
    [...Array(8)].map((_) => 1),
  );
  const [totalCandles, setTotalCandles] = useState(44);

  const candlesPerDay = menorahsPerDay.map((menorahCount, index) => {
    return (index + 2) * menorahCount;
  });
  const availableCandles =
    totalCandles - candlesPerDay.reduce((total, candles) => total + candles, 0);

  const days = menorahsPerDay.map((menorahCount, index) => {
    const candlesPerMenorah = index + 2;
    const addMenorah =
      availableCandles < candlesPerMenorah
        ? null
        : () => {
            setMenorahsPerDay(
              menorahsPerDay.map((innerMenorahCount, innerIndex) => {
                if (innerIndex === index) {
                  return innerMenorahCount + 1;
                } else {
                  return innerMenorahCount;
                }
              }),
            );
          };

    const removeMenorah =
      menorahCount === 0
        ? null
        : () => {
            setMenorahsPerDay(
              menorahsPerDay.map((innerMenorahCount, innerIndex) => {
                if (innerIndex === index) {
                  return innerMenorahCount - 1;
                } else {
                  return innerMenorahCount;
                }
              }),
            );
          };

    return {
      date: hanukkahDates[index].date,
      candlesPerMenorah,
      numberOfMenorahs: menorahsPerDay[index],
      numberOfCandles: candlesPerDay[index],
      addMenorah,
      removeMenorah,
    };
  });

  return {
    totalCandles,
    setTotalCandles,
    days,
    availableCandles,
  };
};
