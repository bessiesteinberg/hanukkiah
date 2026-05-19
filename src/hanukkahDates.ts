import { HebrewCalendar } from "@hebcal/core";
import { DateTime } from "luxon";

export type HanukkahDate = {
  date: DateTime<true>;
  candles: number;
};

const getHanukkahDates = () => {
  const events = HebrewCalendar.calendar({
    year: DateTime.now().year,
    isHebrewYear: false,
  });
  const hebrewDateNight1 = events
    .find(({ desc }) => desc === "Chanukah: 1 Candle")
    ?.date.greg();

  if (hebrewDateNight1 === undefined) {
    throw new Error("Hanukkah is undefined! Oy Gevalt!");
  }

  const gregorianDateNight1 = DateTime.fromJSDate(hebrewDateNight1);

  if (!gregorianDateNight1.isValid) {
    throw new Error(
      `Luxon date conversion failed for date \`${hebrewDateNight1}\``,
    );
  }

  return [...Array(8).keys()].map((day) => {
    return {
      date: gregorianDateNight1.plus({ day }),
      candles: day + 2,
    };
  });
};

export const hanukkahDates: HanukkahDate[] = getHanukkahDates();
