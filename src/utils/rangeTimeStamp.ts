import dayjs from "dayjs";

type Time = 'day' | 'month';

export const dayjsToTimestamp = (
  time: number | string, 
  rangeTime: Time
): [number, number] => {
  const startTime: number = dayjs(time).startOf(rangeTime).valueOf();
  const endTime: number = dayjs(time).endOf(rangeTime).valueOf();

  return [startTime, endTime];
}



export const monthToRangeTime = (month: number): [number, number] => {
  const startTime: number = dayjs().month(month).startOf('month').valueOf();
  const endTime: number = dayjs().month(month).endOf('month').valueOf();

  return [startTime, endTime];
}