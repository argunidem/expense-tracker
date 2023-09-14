import { endOfMonth, format, getTime } from "date-fns";
import { enUS } from "date-fns/locale";

//! Get month and year strings from a date
const getMonthAndYear = (date: Date) => {
   //- Create name and month strings
   const name = format(date, "MMMM, yyyy", { locale: enUS });
   const month = format(date, "yyyy-MM");

   return { name, month };
};

//! Get timestamp of the last day of the month
const getEndOfMonth = (date: Date = new Date()) => {
   return getTime(endOfMonth(date));
};

export { getMonthAndYear, getEndOfMonth };
