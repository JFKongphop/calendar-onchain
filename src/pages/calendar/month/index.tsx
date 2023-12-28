// import { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux';
// import type{ AxiosResponse } from 'axios';

// import { useSelector } from '@/redux/store';
// import { addRangeTime } from '@/redux/slice/rangeTime.slice';
// import { addAllEventState } from '@/redux/slice/event.slice';
// import { rangeTimeData } from '@/redux/selector/rangeTime.selector';
// import { monthIndexData } from '@/redux/selector/monthIndex.selector';
// import { showCreateEventModalData } from '@/redux/selector/showCreateEventModal.selector';
// import { allEventData } from '@/redux/selector/event.selector';

// import { getMonth } from '@/utils/getMonth';
// import EventRequest from '@/lib/event-request';

// import Month from '@/components/calendar/Month';
// import CreateMeet from '@/components/modal/CreateMeet';
// import CalendarHeader from '@/components/calendar/CalendarHeader';
// import Sidebar from '@/components/calendar/Sidebar';

// import type { Dayjs } from 'dayjs';
// import type { CalendarEvent } from '@/components/calendar/type/type';

// const month = () => {
//   const [currenMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());
//   const [loading, setLoading] = useState<boolean>(false)
//   const dispatch = useDispatch();

//   const monthIndex = useSelector(monthIndexData);
//   const rangeTime = useSelector(rangeTimeData);
//   const showCreateEventModal = useSelector(showCreateEventModalData);
//   const events = useSelector(allEventData);

//   useEffect(() => {
//     setCurrentMonth(getMonth(monthIndex));
//   }, [monthIndex]);

//   useEffect(() => {
//     dispatch(addRangeTime([
//       currenMonth[0][0].startOf('day').valueOf(), 
//       currenMonth[4][6].endOf('day').valueOf()
//     ]))
//   }, [currenMonth]);

//   // useEffect(() => {
//   //   (async() => {
//   //     setLoading(true)
//   //     const { data }: AxiosResponse<{ events: CalendarEvent[] }> = await EventRequest.get(`/calendar?start-event=${rangeTime[0]}&end-event=${rangeTime[1]}`)
//   //     dispatch(addAllEventState(data.events))
//   //     setLoading(false)
//   //   })()
//   // }, [rangeTime, loading, currenMonth]);

//   return (
//     <>
//       <CreateMeet 
//         showModal={showCreateEventModal}
//       />
//       <div className="h-screen flex flex-col w-full">
//         <CalendarHeader />
//         {
//           !loading &&
//           (
//             <div className="flex flex-1">
//               <Sidebar/>
//               <Month month={currenMonth}/>
//             </div>
//           )
//         }
//       </div>
//     </>
//   )
// }

// export default month;

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import type{ AxiosResponse } from 'axios';
import dayjs from 'dayjs';

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
import { useNavigate } from 'react-router-dom';

const month = () => {
  const [currenMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const monthIndex = useSelector(monthIndexData)
  const rangeTime = useSelector(rangeTimeData)
  const showCreateEventModal = useSelector(showCreateEventModalData);
  const events = useSelector(allEventData)

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
    
    const shortCurrentMonth = dayjs().format('MMM').toLowerCase();
    navigate(`/calendar/month/${shortCurrentMonth}`) 
    console.log()
    
  

  }, [monthIndex]);

  useEffect(() => {
    dispatch(addRangeTime([
      currenMonth[0][0].startOf('day').valueOf(), 
      currenMonth[4][6].endOf('day').valueOf()
    ]))
  }, [currenMonth]);



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
              <Month month={currenMonth} />
            </div>
          )
        }
      </div>
    </>
  )
}

export default month;