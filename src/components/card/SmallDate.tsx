import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import { useSelector } from '@/redux/store';
import { daySelectedData } from '@/redux/selector/daySelected.selector';
import { addDaySelected } from '@/redux/slice/daySelected.slice';

import type { FC } from 'react';
import type { Dayjs } from 'dayjs';

interface ISmallDate {
  day: Dayjs;
  currentMonthIdx: number;
  type: 'navigate' | 'selector';
  daySelectedEvent?: Dayjs;
  onDaySelected: (day: Dayjs) => void;
}

const SmallDate: FC<ISmallDate> = ({
  day,
  type,
  daySelectedEvent,
  onDaySelected
}) => {
  const navigate = useNavigate();
  const { day_date } = useParams();
  const dispatch = useDispatch();
  const daySelected = useSelector(daySelectedData)

  const dateEventHandler = (day: Dayjs) => {
    dispatch(addDaySelected(day))
    const datePage = dayjs(day).format('MMM-DD-YYYY').toLocaleLowerCase()

    navigate(`/calendar/date/${datePage}`);
  }

  const getDayClass = (day: Dayjs) => {
    const format = 'DD-MM-YY';
    const currentDayInCalendar = day.format(format);
    const selectDay = daySelected.format(format);
    const today = dayjs().format(format);
    const dayParamUrl = dayjs(day_date).format(format).toLowerCase();
  
    let scheduleDay: string = '';
    if (daySelectedEvent) {
      scheduleDay = daySelectedEvent.format(format);
    }

    if (type === 'navigate') {
      if (today === currentDayInCalendar) {
        return 'bg-calendar-main-theme rounded-full text-white font-bold';
      }
  
      if (
        selectDay === currentDayInCalendar 
        || dayParamUrl === currentDayInCalendar
      ) {
        return 'bg-calendar-minor-theme rounded-full text-calendar-main-theme font-bold';
      }
    }
    if (type === 'selector') {
      if (scheduleDay === currentDayInCalendar) {
        return 'bg-calendar-minor-theme rounded-full text-calendar-main-theme font-bold'
      }
    } 

    return '';
  }
  
  switch (type) {
    case 'navigate':
      return (
        <button
          onClick={() => dateEventHandler(day as Dayjs)}
          className={`py-1 w-full ${getDayClass(day as Dayjs)}`}
        >
          <span className="text-sm">{(day as Dayjs).format("D")}</span>
        </button>
      )
    case 'selector':
      return (
        <button
          onClick={() => onDaySelected(day as Dayjs)}
          className={`py-1 w-full ${getDayClass(day as Dayjs)}`}
        >
          <span className="text-sm">{(day as Dayjs).format("D")}</span>
        </button>
      )
  }
}

export default SmallDate;