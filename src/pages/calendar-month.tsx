import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import { useSelector } from '@/redux/store';
import { addRangeTime } from '@/redux/slice/rangeTime.slice';
import { rangeTimeData } from '@/redux/selector/rangeTime.selector';
import { monthIndexData } from '@/redux/selector/monthIndex.selector';
import { showCreateEventModalData } from '@/redux/selector/showCreateEventModal.selector';

import { getMonth } from '@/utils/getMonth';

import Month from '@/components/calendar/Month';
import CreateEventScheduleCalendarModal from '@/components/modal/CreateEventScheduleCalendarModal';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import Sidebar from '@/components/calendar/Sidebar';

import type { Dayjs } from 'dayjs';
import { useContractCalendar, useEthersSigner } from '@/wagmi';
import { EventParams, EventSchedule } from '@/type';
import { monthArrayToRangeTime } from '@/utils/rangeTimeStamp';
import { LoadingOutlined } from '@ant-design/icons';
import { useAccount } from 'wagmi';
import EmptyCalendarCard from '@/components/card/EmptyCalendarCard';
import dayjs from 'dayjs';
import { useLocation, useParams } from 'react-router-dom';
import { destructureEventSchedules } from '@/utils/destructureEventSchedules';

const CalendarMonth = () => {
  const [currenMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());
  const [loading, setLoading] = useState<boolean>(false);

  const { pathname } = useLocation();
  const { isConnected } = useAccount();
  const dispatch = useDispatch();
  const monthIndex = useSelector(monthIndexData)
  const rangeTime = useSelector(rangeTimeData)
  const showCreateEventModal = useSelector(showCreateEventModalData);
  const signer = useEthersSigner()
  const calendarContract = useContractCalendar();
  const [eventSchedule, setEventSchedule] = useState<EventSchedule[]>([]);
  const { calendarIndex, calendarTitle } = useParams<EventParams>()

  useEffect(() => {
    const rangeTimeArray = monthArrayToRangeTime(monthIndex);
    setCurrentMonth(getMonth(monthIndex))
    dispatch(addRangeTime(rangeTimeArray));
  }, [monthIndex])

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
            Number(calendarIndex), 
            calendarEventTitle!, 
            rangeTime
          );
          eventSchedules = await destructureEventSchedules(data);
        }
        else {
          const data =  await calendarContract.getEventSchedule(Number(calendarIndex), rangeTime);
          eventSchedules = await destructureEventSchedules(data);
        }

        setEventSchedule(eventSchedules);
        setLoading(false);
      }
    })();
  }, [rangeTime, signer, pathname]);

  return (
    <>
      <CreateEventScheduleCalendarModal 
        showModal={showCreateEventModal}
      />
      <div className="h-screen flex flex-col w-full">
        <CalendarHeader />
        <div 
          className="flex flex-row w-full h-full"
        >
          <div>
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
                    <div className="flex flex-col w-full h-full">
                      <div className=" grid grid-cols-7 border-b-2 border-calendar-main-theme ">
                        {
                          Array.from({ length: 7 }).map((_, dayIndex) => (
                            <p 
                              className="text-sm text-center border-calendar-main-theme bg-calendar-main-theme text-white font-bold"
                            >
                              {dayjs().day(dayIndex).format("ddd").toUpperCase()}
                            </p>
                          ))
                        }
                      </div>
                      <Month month={currenMonth} eventSchedule={eventSchedule} />
                    </div>
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
    </>
  )
}

export default CalendarMonth;