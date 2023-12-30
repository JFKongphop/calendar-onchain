import dayjs, { Dayjs } from "dayjs"

export const compareSameTime = (firstTime: number, secondTime: number): boolean => {
  return dayjs(firstTime).isSame(secondTime);
}

export const compareSameDay = (firstTime: number, secondTime: number | string | Dayjs): boolean => {
  return dayjs(firstTime).isSame(secondTime, 'day')
}