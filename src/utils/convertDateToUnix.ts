import type{ Dayjs } from "dayjs";
import type { TimeRatio } from "@/components/calendar/type/type";

export const convertDateToUnix = (
  time: string,
  ratio: TimeRatio,
  daySelectorEvent: Dayjs
): number => {
  const day = (daySelectorEvent as any)
    .format("MMM DD YYYY") + ` ${time}:${ratio}`;

  return new Date(day).getTime();
}