import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';

import { useSelector } from '@/redux/store';
import { rangeTimeData } from '@/redux/selector/rangeTime.selector';
import { addRangeTime } from '@/redux/slice/rangeTime.slice';
import { addAllEventState } from '@/redux/slice/event.slice';
import { allEventData } from '@/redux/selector/event.selector';
import { showCreateEventModalData } from '@/redux/selector/showCreateEventModal.selector';

import EventRequest from '@/lib/event-request';
import { dayjsToTimestamp } from '@/utils/rangeTimeStamp';

import CalendarHeader from '@/components/calendar/CalendarHeader';
import EventList from '@/components/card/EventList';
import LineList from '@/components/card/LineList';
import TimeLabelList from '@/components/card/TimeLabelList';
import CreateMeet from '@/components/modal/CreateEventScheduleCalendarModal';
import Sidebar from '@/components/calendar/Sidebar';
import CalendarEventCard from '@/components/card/CalendarEventCard';

import type { CalendarEvent } from '@/components/calendar/type/type';
import { DayEventParams, EventSchedule } from '@/type';
import dayjs, { Dayjs } from 'dayjs';
import { useContractCalendar, useEthersSigner } from '@/wagmi';
import { getMonth } from '@/utils/getMonth';

const CalendarDate = () => {
  const [scheduleInnerHeight, setScheduleInnerHeight] = useState<number>(0);
  const { day_date } = useParams();
  const dispatch = useDispatch();
  const events = useSelector(allEventData);
  const rangeTime = useSelector(rangeTimeData);
  const showCreateEventModal = useSelector(showCreateEventModalData)
  const { calendarIndex, calendarTitle, date } = useParams<DayEventParams>()
  const [dayEvents, setDayEvents] = useState<EventSchedule[]>([]);
  const [currenMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());
  const [monthRange, setMonthRange] = useState<string>('');

  const monthIndex = dayjs(date).month()

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    const startTimeMonthArray = currenMonth[0][0].startOf('day').valueOf();
    const endTimeMonthArray = currenMonth[4][6].endOf('day').valueOf();

    const monthRange = `${startTimeMonthArray}-${endTimeMonthArray}`;
    setMonthRange(monthRange);
  }, [currenMonth]);



  const signer = useEthersSigner()
  const calendarContract = useContractCalendar();

  useEffect(() => {
    dispatch(addRangeTime(dayjsToTimestamp(day_date as string, 'day')))
  }, [day_date]);

  const scheduleInnerRef = useRef<any>();
  useLayoutEffect(() => {
    if (scheduleInnerRef.current) {
      const divHeight = scheduleInnerRef.current.clientHeight;
      setScheduleInnerHeight(divHeight * .9125);
    }
  }, []);

  useEffect(() => {
    (async () => {
      console.log(rangeTime)
      const data =  await calendarContract.getEventSchedule(0, monthRange);
      console.log(data)
      const destructureEventSchedules: EventSchedule[] = data[2].map((event: any) => ({
        id: Number(event[0]),
        start_event: Number(event[1]),
        end_event: Number(event[2]),
        title: event[3],
      }));

      const eventEachDay = destructureEventSchedules.filter(
        (evt) => 
          evt.id >= dayjs(date).startOf('day').valueOf()
          && evt.id <= dayjs(date).endOf('day').valueOf()
      );

      setDayEvents(eventEachDay);
    })();
  }, [signer, monthRange])

  // console.log(, );
  
  return (
    <div 
      className="h-screen"
      ref={scheduleInnerRef}
    >
      <CreateMeet 
        showModal={showCreateEventModal}
      />
      <CalendarHeader />
      <div 
        className="flex flex-row w-full"
        style={{ height: scheduleInnerHeight }}
      >
        <div style={{ height: scheduleInnerHeight }}>
          <Sidebar/>
        </div>
        <CalendarEventCard innerHeight={scheduleInnerHeight}>        
          {
            dayEvents.map((data) => (
              <EventList 
                key={data.id}
                title={data.title}
                startTimestamp={data.start_event}
                endTimestamp={data.end_event}
              />
            ))
          }
          <div className="w-[5%] flex flex-col">
            {Array.from({ length: 24 }).map((_, index) => (
              <TimeLabelList 
                key={index}
                index={index} 
              />
            ))}
          </div>
          <div className="w-[95%] border-l">
            {Array.from({ length: 24 }).map((_, index) => (
              <LineList key={index} />
            ))}
          </div>
        </CalendarEventCard>
      </div>
    </div>
  )
}

export default CalendarDate;