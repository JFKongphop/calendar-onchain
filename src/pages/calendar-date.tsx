import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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

import { EventParams, EventSchedule } from '@/type';
import dayjs from 'dayjs';
import { useContractCalendar, useEthersSigner } from '@/wagmi';
import { LoadingOutlined } from '@ant-design/icons';
import { monthArrayToRangeTime } from '@/utils/rangeTimeStamp';
import { compareSameDay } from '@/utils/compareDayjs';
import { useAccount } from 'wagmi';
import EmptyCalendarCard from '@/components/card/EmptyCalendarCard';
import { destructureEventSchedules } from '@/utils/destructureEventSchedules';

const CalendarDate = () => {
  const [scheduleInnerHeight, setScheduleInnerHeight] = useState<number>(0);
  const showCreateEventModal = useSelector(showCreateEventModalData)
  const { date } = useParams<EventParams>()
  const [dayEvents, setDayEvents] = useState<EventSchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [eventHandlerSuccess, setEventHandlerSuccess] = useState<string>('');
  const { calendarIndex, calendarTitle } = useParams<EventParams>()

  const { pathname } = useLocation();
  const { isConnected } = useAccount();
  const dispatch = useDispatch();
  const rangeTime = useSelector(rangeTimeData);
  const signer = useEthersSigner();
  const calendarContract = useContractCalendar();
  const monthIndex = dayjs(date).month()

  useEffect(() => {
    const rangeTimeArray = monthArrayToRangeTime(monthIndex);
    dispatch(addRangeTime(rangeTimeArray))
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
      if (rangeTime) {
        const location = pathname.split('/')[2];
        const atParticipationPage = location === 'participation';
        let eventSchedules: EventSchedule[] = [];
        setLoading(true);

        if (atParticipationPage) {
          const calendarEventTitle = calendarTitle?.replaceAll('-', ' ');
          const data = await calendarContract.getParticipationStore(
            calendarIndex, 
            calendarEventTitle, 
            rangeTime
          );
          eventSchedules = await destructureEventSchedules(data);
        }
        else {
          const data =  await calendarContract.getEventSchedule(calendarIndex, rangeTime);
          eventSchedules = await destructureEventSchedules(data);
        }
  
        const eventEachDay = eventSchedules.filter(
          (evt) => compareSameDay(evt.start_event, date!)
        );
  
        setDayEvents(eventEachDay);
        setLoading(false);
      }
    })();
  }, [signer, rangeTime, eventHandlerSuccess, date, pathname])

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
          isConnected
          ?
          (
            <>
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
            </>
          )
          :
          (
            <EmptyCalendarCard />
          )
        }
      </div>
    </div>
  )
}

export default CalendarDate;