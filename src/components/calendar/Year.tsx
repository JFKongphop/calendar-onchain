import  { useEffect, useState, Fragment } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";

import { useSelector } from "@/redux/store";
import { monthIndexData } from "@/redux/selector/monthIndex.selector";
import { addMonthIndexState } from "@/redux/slice/monthIndex.slice";

import SmallDate from "@/components/card/SmallDate";

import { getYear } from "@/utils/getAllYear";
import { getMonth } from "@/utils/getMonth";

import type { FC } from "react";
import type { Dayjs } from "dayjs";

interface IYear {
  month: Dayjs[][]
}

const Year: FC<IYear> = ({ month }) => {
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


  const allYear = Array.from({ length: 12 }).map((_, month) => getYear(month))

  console.log(dayjs(month[0][0]).format('MMMM'))

  const fullMonth = Array.from({ length: 12 }).map((_, month) => dayjs().month(month).format('MMMM'))
  
  
  return (
    <div className="mt-9 flex flex-col gap-3 text-calendar-main-theme border">
      {
        fullMonth.map((month) => (
          <p>{month}</p>
        ))
      }
      <div className="grid grid-cols-7 grid-rows-6">
        {month[0].map((day: Dayjs, i) => (
          <span key={i} className="text-sm py-1 text-center">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {month.map((row, index) => (
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

export default Year;