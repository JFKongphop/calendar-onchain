import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import { addDaySelected } from "@/redux/slice/daySelected.slice";

import ShortEventList from "@/components/card/ShortEventList";

import { compareSameDay } from "@/utils/compareDayjs";

import { useState, type FC, useEffect, useRef, useLayoutEffect } from "react";
import type { Dayjs } from "dayjs";
import type { EventSchedule, EventParams } from "@/type";


interface IDay {
  day: Dayjs;
  eventSchedule: EventSchedule[];
}

const Day:FC<IDay> = ({ 
  day, 
  eventSchedule,
}) => {
  const [atParticipationPage, setAtParticipationPage] = useState<boolean>(false);
  const [scheduleInnerHeight, setScheduleInnerHeight] = useState<number>(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { calendarIndex, calendarTitle } = useParams<EventParams>()

  const dayEvents: EventSchedule[] = eventSchedule.filter(
    (evt) => compareSameDay(evt.start_event, day)
  )

  const scheduleInnerRef = useRef<any>();
  useLayoutEffect(() => {
    if (scheduleInnerRef.current) {
      const divHeight = scheduleInnerRef.current.offsetHeight;
      setScheduleInnerHeight(divHeight / 5.5);
    }
  }, []);

  useEffect(() => {
    const location = pathname.split('/')[2];
    const atParticipationPage = location === 'participation';
    setAtParticipationPage(atParticipationPage);
  }, [pathname])

  
  const dateEventHandler = () => {
    dispatch(addDaySelected(day))
    const datePage = dayjs(day).format('MMM-DD-YYYY').toLowerCase()

    let terminalURL = '';
    if (atParticipationPage) {
      terminalURL = `/calendar-event/participation/${calendarIndex}/${calendarTitle}/date/${datePage}`;
    }
    else {
      terminalURL = `/calendar-event/${calendarIndex}/${calendarTitle}/date/${datePage}`
    }

    navigate(terminalURL);
  }

  const getCurrentDayClass = () => {
    return day.startOf('day').valueOf() === dayjs().startOf('day').valueOf()
      ? 'bg-calendar-main-theme text-white rounded-full w-7 font-bold'
      : '';
  }

  return (
    <div 
      className="border border-t-0 border-l-0 border-r-2 border-b-2 border-calendar-main-theme flex flex-col"
      ref={scheduleInnerRef}
    >
      <header className="flex flex-col items-center" >
        <p
          className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 flex flex-col gap-[2px] cursor-pointer relative"
        onClick={dateEventHandler}
      >
        {dayEvents.slice(0, 3).map((event, index) => (
          <ShortEventList 
            key={index}
            title={event.title} 
            height={scheduleInnerHeight}          
          />
        ))}
        {dayEvents && dayEvents.length > 3 && 
          <p 
            className="absolute bottom-0.5 left-1 text-xs font-bold text-calendar-main-theme"
          >
            ...more
          </p>
        }
      </div>
    </div>
  );
}

export default Day;