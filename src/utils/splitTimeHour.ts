import dayjs from "dayjs"
import { TimeRatio } from "@/components/calendar/type/type"
import { removePrefixHourZero } from "./removePrefixHourZero";

export const splitTimeHour = (time: number): [string, TimeRatio] => {
  const [hour, minute] = dayjs(time).format('HH:mm').split(':') as [string, TimeRatio];
  
  return [removePrefixHourZero(hour), minute];
}