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
import { EventSchedule } from '@/type';
import { monthArrayToRangeTime } from '@/utils/rangeTimeStamp';
import { LoadingOutlined } from '@ant-design/icons';
import { useAccount } from 'wagmi';
import EmptyCalendarCard from '@/components/card/EmptyCalendarCard';

const CalendarMonth = () => {
  const [currenMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());
  const [loading, setLoading] = useState<boolean>(false)

  const { isConnected } = useAccount();
  const dispatch = useDispatch();
  const monthIndex = useSelector(monthIndexData)
  const rangeTime = useSelector(rangeTimeData)
  const showCreateEventModal = useSelector(showCreateEventModalData);
  const signer = useEthersSigner()
  const calendarContract = useContractCalendar();
  const [eventSchedule, setEventSchedule] = useState<EventSchedule[]>([]);

  useEffect(() => {
    const rangeTimeArray = monthArrayToRangeTime(monthIndex);
    setCurrentMonth(getMonth(monthIndex))
    dispatch(addRangeTime(rangeTimeArray));
  }, [monthIndex])

  useEffect(() => {
    (async () => {
      if (rangeTime) {
        setLoading(true)
        const data =  await calendarContract.getEventSchedule(0, rangeTime);
        const destructureEventSchedules: EventSchedule[] = data[2].map((event: any) => ({
          id: Number(event[0]),
          start_event: Number(event[1]),
          end_event: Number(event[2]),
          title: event[3],
        }));

        setEventSchedule(destructureEventSchedules);
        setLoading(false)
      }
    })();
  }, [rangeTime, signer])

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
                    <Month month={currenMonth} eventSchedule={eventSchedule} />
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