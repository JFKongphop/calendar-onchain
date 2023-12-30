import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import { useSelector } from "@/redux/store";
import { addDaySelected } from "@/redux/slice/daySelected.slice";
import { allEventData } from "@/redux/selector/event.selector";

import ShortEventList from "@/components/card/ShortEventList";

import type { FC } from "react";
import type { Dayjs } from "dayjs";
import type{ CalendarEvent } from "./type/type";
import { rangeTimeData } from "@/redux/selector/rangeTime.selector";
import { useContractCalendar, useEthersSigner } from "@/wagmi";
import { EventSchedule, MonthEventParams } from "@/type";

interface IDay {
  day: Dayjs;
  rowIdx: number;
  eventSchedule: EventSchedule[];
}

const Day:FC<IDay> = ({ 
  day, 
  rowIdx,
  eventSchedule,
}) => {
  // const [dayEvents, setDayEvents] = useState<EventSchedule[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rangeTime = useSelector(rangeTimeData)
  const signer = useEthersSigner()
  const calendarContract = useContractCalendar();
  const { calendarIndex, calendarTitle } = useParams<MonthEventParams>()

  // useEffect(() => {
  //   (async () => {
  //     if (rangeTime) {
  //       console.log(rangeTime)
  //       const data =  await calendarContract.getEventSchedule(0, rangeTime);
  //       console.log(data[2])
  //       const destructureEventSchedules: EventSchedule[] = data[2].map((event: any) => ({
  //         id: Number(event[0]),
  //         start_event: Number(event[1]),
  //         end_event: Number(event[2]),
  //         title: event[3],
  //       }));
  
        // const eventEachDay = destructureEventSchedules.filter(
        //   (evt) => 
        //     dayjs(evt.start_event).startOf('day').valueOf() 
        //     === dayjs(day).startOf('day').valueOf()
        // );
  //       setDayEvents(eventEachDay);
  //     }
  //   })();
  // }, [signer, rangeTime])

  const dayEvents: EventSchedule[] = eventSchedule.filter(
    (evt) =>
      dayjs(evt.start_event).isSame(day, 'day')
  )

  console.log(eventSchedule)



  
  const dateEventHandler = () => {
    dispatch(addDaySelected(day))
    const datePage = dayjs(day).format('MMM-DD-YYYY').toLowerCase()
  
    navigate(`/calendar-event/${calendarIndex}/${calendarTitle}/date/${datePage}`);
  }

  const getCurrentDayClass = () => {
    return day.startOf('day').valueOf() === dayjs().startOf('day').valueOf()
      ? 'bg-calendar-main-theme text-white rounded-full w-7 font-bold'
      : '';
  }

  return (
    <div 
      className="border border-t-0 border-l-0 border-r-2 border-b-2 border-calendar-main-theme flex flex-col"
    >
      <header className="flex flex-col items-center" >
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {(day as any).format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}
        >
          {(day as any).format("DD")}
        </p>
      </header>
      <div
        className="flex-1 flex flex-col gap-[2px] cursor-pointer"
        onClick={dateEventHandler}
      >
        {dayEvents.slice(0, 3).map((
          event, 
          index
        ) => (
          <ShortEventList 
            key={index} 
            title={event.title} 
          />
        ))}
        {dayEvents && dayEvents.length > 3 && 
          <p 
            className="text-calendar-main-theme px-1 text-[14px]"
          >
            ...เพิ่มเติม
          </p>
        }
      </div>
    </div>
  );
}

export default Day;