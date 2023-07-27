import { format, isToday } from "date-fns";

export const getTime = (createdAt: string) => {
  const createdAtDate = new Date(createdAt);
  if (isToday(createdAtDate)) {
    return format(createdAtDate, "HH:mm");
  } else {
    return format(createdAtDate, "dd.MM.yyyy");
  }
};
