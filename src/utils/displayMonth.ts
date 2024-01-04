import dayjs from "dayjs";

export const displayMonth = (currentMonthIdx: number) => {
  return dayjs(
    new Date(dayjs().year()
    , currentMonthIdx)
  ).format('MMMM YYYY');
}