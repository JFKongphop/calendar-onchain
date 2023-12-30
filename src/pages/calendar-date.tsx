import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useSelector } from '@/redux/store';
import { rangeTimeData } from '@/redux/selector/rangeTime.selector';
import { addRangeTime } from '@/redux/slice/rangeTime.slice';
import { showCreateEventModalData } from '@/redux/selector/showCreateEventModal.selector';

import CalendarHeader from '@/components/calendar/CalendarHeader';
import EventList from '@/components/card/EventList';
import LineList from '@/components/card/LineList';
import TimeLabelList from '@/components/card/TimeLabelList';
import CreateMeet from '@/components/modal/CreateEventScheduleCalendarModal';
import Sidebar from '@/components/calendar/Sidebar';
import CalendarEventCard from '@/components/card/CalendarEventCard';

import { DayEventParams, EventSchedule } from '@/type';
import dayjs, { Dayjs } from 'dayjs';
import { useContractCalendar, useEthersSigner } from '@/wagmi';
import { getMonth } from '@/utils/getMonth';
import { LoadingOutlined } from '@ant-design/icons';

const CalendarDate = () => {
  const [scheduleInnerHeight, setScheduleInnerHeight] = useState<number>(0);
  const showCreateEventModal = useSelector(showCreateEventModalData)
  const { calendarIndex, calendarTitle, date } = useParams<DayEventParams>()
  const [dayEvents, setDayEvents] = useState<EventSchedule[]>([]);
  const [currenMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());
  const [loading, setLoading] = useState<boolean>(false);
  const [eventSchedule, setEventSchedule] = useState<EventSchedule>();
  const [eventHandlerSuccess, setEventHandlerSuccess] = useState<string>('');


  const dispatch = useDispatch();
  const rangeTime = useSelector(rangeTimeData);
  const signer = useEthersSigner();
  const calendarContract = useContractCalendar();
  const monthIndex = dayjs(date).month()

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    const startTimeMonthArray = currenMonth[0][0].startOf('day').valueOf();
    const endTimeMonthArray = currenMonth[4][6].endOf('day').valueOf();

    dispatch(addRangeTime([startTimeMonthArray, endTimeMonthArray]))
  }, [monthIndex]);

  const scheduleInnerRef = useRef<any>();
  useLayoutEffect(() => {
    if (scheduleInnerRef.current) {
      const divHeight = scheduleInnerRef.current.clientHeight;
      setScheduleInnerHeight(divHeight * .9125);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      console.log(rangeTime)
      const data =  await calendarContract.getEventSchedule(0, rangeTime);
      console.log(data)
      const destructureEventSchedules: EventSchedule[] = data[2].map((event: any) => ({
        id: Number(event[0]),
        start_event: Number(event[1]),
        end_event: Number(event[2]),
        title: event[3],
      }));

      const eventEachDay = destructureEventSchedules.filter(
        (evt) => 
          dayjs(evt.start_event).isSame(date, 'day')
      );

      setDayEvents(eventEachDay);
      setLoading(false);
    })();
  }, [signer, rangeTime, eventHandlerSuccess])

  const getEventSchedule = useCallback((eventSchedule: EventSchedule) => {
    setEventSchedule(eventSchedule)
  }, []);


  const getHandlerSuccess = (hash: string) => {
    setEventHandlerSuccess(hash);
  }
  
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
        {
          loading
          ?
          (
            <div className="flex w-full h-full justify-center items-center">
              <LoadingOutlined
                style={{
                  fontSize: 100,
                  color: '#1e293b',
                }}
                spin
                rev={undefined}
              />
            </div>
          )
          :
          (
            <CalendarEventCard innerHeight={scheduleInnerHeight}>        
              {
                dayEvents.map((data) => (
                  <EventList 
                    key={data.id}
                    eventSchedule={data} 
                    onGetEventSchedule={getEventSchedule}
                    onHandlerSuccess={getHandlerSuccess}             
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
          )
        }
      </div>
    </div>
  )
}

export default CalendarDate;