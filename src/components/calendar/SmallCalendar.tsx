import  { useEffect, useState, Fragment } from "react";
import dayjs from "dayjs";

import { useHandleSlideMonth } from "@/custom-hook/useHandlePrevMonth";
import { useSelector } from "@/redux/store";
import { monthIndexData } from "@/redux/selector/monthIndex.selector";

import { getMonth } from "@/utils/getMonth";
import { displayMonth } from "@/utils/displayMonth";

import MonthSlideHandler from "@/components/button/MonthSlideHandler";
import SmallDate from "@/components/card/SmallDate";

import type { Dayjs } from "dayjs";

const SmallCalendar = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState<number>(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());  
  const monthIndex = useSelector(monthIndexData);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  const handleNextMonth = useHandleSlideMonth('next');
  const handlePrevMonth = useHandleSlideMonth('prev');

  const monthFormat = displayMonth(currentMonthIdx);

  return (
    <div className="mt-9 flex flex-col gap-4 text-calendar-main-theme">
      <header className="flex justify-between items-center">
        <MonthSlideHandler 
          type={'left'}
          onSlideMonth={handlePrevMonth}
        />
        <p className="font-bold">
          {monthFormat}
        </p>
        <MonthSlideHandler 
          type={'right'}
          onSlideMonth={handleNextMonth}
        />
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day: Dayjs, i) => (
          <span key={i} className="text-sm py-1 text-center">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, index) => (
          <Fragment key={index}>
            {row.map((
              day: Dayjs,
              index: number
            ) => (
              <div key={index}>
                <SmallDate 
                  day={day}
                  type={'navigate'}
                  onDaySelected={() =>{}}
                  currentMonthIdx={currentMonthIdx}
                />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default SmallCalendar;