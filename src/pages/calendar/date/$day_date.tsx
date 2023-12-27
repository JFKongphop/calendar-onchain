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
import CreateMeet from '@/components/modal/CreateMeet';
import Sidebar from '@/components/calendar/Sidebar';
import CalendarEventCard from '@/components/card/CalendarEventCard';

import type { CalendarEvent } from '@/components/calendar/type/type';

const day_timestamp = () => {
  const [scheduleInnerHeight, setScheduleInnerHeight] = useState<number>(0);
  const { day_date } = useParams();
  const dispatch = useDispatch();
  const events = useSelector(allEventData);
  const rangeTime = useSelector(rangeTimeData);
  const showCreateEventModal = useSelector(showCreateEventModalData)

  useEffect(() => {
    dispatch(addRangeTime(dayjsToTimestamp(day_date as string, 'day')))
  }, [day_date]);

  useEffect(() => {
    (async() => {
      const { data }: AxiosResponse<{ events: CalendarEvent[] }> = await EventRequest.get(`/calendar?start-event=${rangeTime[0]}&end-event=${rangeTime[1]}`)
      dispatch(addAllEventState(data.events))
    })()
  }, [rangeTime]);

  const scheduleInnerRef = useRef<any>();
  useLayoutEffect(() => {
    if (scheduleInnerRef.current) {
      const divHeight = scheduleInnerRef.current.clientHeight;
      setScheduleInnerHeight(divHeight * .925);
    }
  }, []);
  
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
            events.map((data) => (
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

export default day_timestamp;