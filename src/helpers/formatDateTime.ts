import { format, formatDistance, isToday, isYesterday } from "date-fns";

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const timeFormatted = format(date, "h:mm a").toUpperCase();

  const dateFormatted = format(date, "MMM d").toUpperCase();

  const relativeTime = formatDistance(date, new Date(), { addSuffix: true });

  if (isToday(date)) {
    return `${timeFormatted} (Today)`;
  }

  if (isYesterday(date)) {
    return `${timeFormatted} (Yesterday)`;
  }

  return `${dateFormatted} - ${timeFormatted} (${relativeTime})`;
};
