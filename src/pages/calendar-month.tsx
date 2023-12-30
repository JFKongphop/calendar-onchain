import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import type{ AxiosResponse } from 'axios';

import { useSelector } from '@/redux/store';
import { addRangeTime } from '@/redux/slice/rangeTime.slice';
import { addAllEventState } from '@/redux/slice/event.slice';
import { rangeTimeData } from '@/redux/selector/rangeTime.selector';
import { monthIndexData } from '@/redux/selector/monthIndex.selector';
import { showCreateEventModalData } from '@/redux/selector/showCreateEventModal.selector';
import { allEventData } from '@/redux/selector/event.selector';

import { getMonth } from '@/utils/getMonth';
import EventRequest from '@/lib/event-request';

import Month from '@/components/calendar/Month';
import CreateMeet from '@/components/modal/CreateEventScheduleCalendarModal';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import Sidebar from '@/components/calendar/Sidebar';

import type { Dayjs } from 'dayjs';
import type { CalendarEvent } from '@/components/calendar/type/type';
import { useContractCalendar, useEthersSigner } from '@/wagmi';
import { EventSchedule } from '@/type';
import dayjs from 'dayjs';
import { monthArrayToRangeTime } from '@/utils/rangeTimeStamp';

const CalendarMonth = () => {
  const [currenMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch();

  const monthIndex = useSelector(monthIndexData)
  const rangeTime = useSelector(rangeTimeData)
  const showCreateEventModal = useSelector(showCreateEventModalData);
  const signer = useEthersSigner()
  const calendarContract = useContractCalendar();
  const [eventSchedule, setEventSchedule] = useState<EventSchedule[]>([]);

  // useEffect(() => {
  //   setCurrentMonth(getMonth(monthIndex));
  // }, [monthIndex]);

  // useEffect(() => {
  //   dispatch(addRangeTime([
  //     currenMonth[0][0].startOf('day').valueOf(), 
  //     currenMonth[4][6].endOf('day').valueOf()
  //   ]))
  // }, [currenMonth]);

  useEffect(() => {
    const rangeTimeArray = monthArrayToRangeTime(monthIndex)
    dispatch(addRangeTime(rangeTimeArray))
  }, [monthIndex])

  useEffect(() => {
    (async () => {
      if (rangeTime) {
        // console.log(rangeTime)
        const data =  await calendarContract.getEventSchedule(0, rangeTime);
        console.log(data[2])
        const destructureEventSchedules: EventSchedule[] = data[2].map((event: any) => ({
          id: Number(event[0]),
          start_event: Number(event[1]),
          end_event: Number(event[2]),
          title: event[3],
        }));


        setEventSchedule(destructureEventSchedules)
      }
    })();
  }, [rangeTime, signer])

  return (
    <>
      <CreateMeet 
        showModal={showCreateEventModal}
      />
      <div className="h-screen flex flex-col w-full">
        <CalendarHeader />
        {
          !loading &&
          (
            <div className="flex flex-1">
              <Sidebar/>
              <Month month={currenMonth} eventSchedule={eventSchedule} />
            </div>
          )
        }
      </div>
    </>
  )
}

export default CalendarMonth;