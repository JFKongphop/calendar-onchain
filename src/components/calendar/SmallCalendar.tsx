import  { useEffect, useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import { useSelector } from "@/redux/store";
import { monthIndexData } from "@/redux/selector/monthIndex.selector";
import { addMonthIndexState } from "@/redux/slice/monthIndex.slice";

import { getMonth } from "@/utils/getMonth";

import MonthSlideHandler from "@/components/button/MonthSlideHandler";
import SmallDate from "@/components/card/SmallDate";

import type { Dayjs } from "dayjs";

const SmallCalendar = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState<number>(
    dayjs().month()
  );
  const [currentMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());  
  const dispatch = useDispatch()
  const monthIndex = useSelector(monthIndexData)

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  const handlePrevMonth = () => {
    dispatch(addMonthIndexState(monthIndex - 1))
  }

  const handleNextMonth = () => {
    dispatch(addMonthIndexState(monthIndex + 1))
  }

  const displayMonth = (format: string) => {
    return dayjs(
      new Date(dayjs().year()
      , currentMonthIdx)
    ).format(format);
  }
  
  
  return (
    <div className="mt-9 flex flex-col gap-4 text-calendar-main-theme">
      <header className="flex justify-between items-center">
        <MonthSlideHandler 
          type={'left'}
          onSlideMonth={handlePrevMonth}
        />
        <p className="font-bold">
          {displayMonth('MMMM YYYY')}
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