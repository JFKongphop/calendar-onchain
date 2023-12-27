import dayjs from 'dayjs'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useSelector } from '@/redux/store';

import { addMonthIndexState } from '@/redux/slice/monthIndex.slice';
import { monthIndexData } from '@/redux/selector/monthIndex.selector';

import SmallDate from '@/components/card/SmallDate';

import { ShortMonth, shortMonthToNumber } from '@/utils/shortMonthToNumber';

import type { FC  } from 'react'
import type { Dayjs } from 'dayjs'

interface ISmallMonth {
  month: Dayjs[][];
  fullnameMonth: string;
}


const SmallMonth: FC<ISmallMonth> = ({
  month,
  fullnameMonth
}) => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState<number>(
    dayjs().month()
  );
  const monthIndex = useSelector(monthIndexData)

  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  const monthNavigate = () => {
    const monthIndex = shortMonthToNumber(fullnameMonth.slice(0, 3).toLocaleLowerCase() as ShortMonth)
    dispatch(addMonthIndexState(monthIndex))
    navigate(`/calendar/month`)
  }

  return (
    <div className="flex flex-col gap-1 justify-center items-center border">
      <p 
        className="w-full text-center border-b cursor-pointer" 
        onClick={monthNavigate}
      > 
        {fullnameMonth}
      </p>
      <div className="grid grid-cols-7 grid-rows-6 w-full h-40">
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
  )
}

export default SmallMonth