import dayjs, { Dayjs } from "dayjs";
import { getMonth } from "./getMonth";

type Time = 'day' | 'month';

type RetrunMonthRange = [number, number];

export const dayjsToTimestamp = (
  time: number | string, 
  rangeTime: Time
): RetrunMonthRange => {
  const startTime: number = dayjs(time).startOf(rangeTime).valueOf();
  const endTime: number = dayjs(time).endOf(rangeTime).valueOf();

  return [startTime, endTime];
}



export const monthToRangeTime = (month: number): RetrunMonthRange => {
  const startTime: number = dayjs().month(month).startOf('month').valueOf();
  const endTime: number = dayjs().month(month).endOf('month').valueOf();

  return [startTime, endTime];
}

export const monthArrayToRangeTime = (monthIndex: number): RetrunMonthRange => {
  const monthSelectArray: Dayjs[][] = getMonth(monthIndex);
  const startTimeMonthArray = monthSelectArray[0][0].startOf('day').valueOf();
  const endTimeMonthArray = monthSelectArray[4][6].endOf('day').valueOf();

  return [startTimeMonthArray, endTimeMonthArray];
}     