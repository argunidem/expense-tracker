import { format } from "date-fns";

export const formatDate = (date: string, dateFormat: string) => {
   return format(new Date(date), dateFormat);
};
