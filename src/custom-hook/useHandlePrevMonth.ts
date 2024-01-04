import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import { addMonthIndexState } from "@/redux/slice/monthIndex.slice";
import { useSelector } from "@/redux/store";
import { monthIndexData } from "@/redux/selector/monthIndex.selector";
import { shortMonthToNumber } from "@/utils/shortMonthToNumber";

import type { EventParams } from "@/type";

type HandleMonth = 'next' | 'prev'

export const useHandleSlideMonth = (handleMonth: HandleMonth) => {
  const dispatch = useDispatch();
  const monthIndex = useSelector(monthIndexData);
  const { calendarIndex, calendarTitle, date, month } = useParams<EventParams>();
  const navigate = useNavigate();

  let signMonth = '';
  if (handleMonth === 'next') signMonth = '+';
  if (handleMonth === 'prev') signMonth = '-';

  const handleSlideMonth = () => {
    let monthSlideIndex = dayjs().month();

    if (month) {
      monthSlideIndex =  eval(`${shortMonthToNumber(month)} ${signMonth} 1`);
    }
    if (date) {
      monthSlideIndex = dayjs(date).month() - 1;
    }

    const prevMonth = dayjs().month(monthSlideIndex).format("MMM").toLowerCase();
    const terminalURL = `/calendar-event/${calendarIndex}/${calendarTitle}/month/${prevMonth}`;
    navigate(terminalURL);
    dispatch(addMonthIndexState(eval(`${monthIndex} ${signMonth} 1`)));
  };

  return handleSlideMonth;
};
