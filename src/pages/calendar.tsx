
// import GlobalContext from '@/context/GlobalContext';
// import { getMonth } from '@/utils/getMonth';
// import { useContext, useEffect, useState } from 'react'

// import EventRequest from '@/lib/event-request';
// import type{ AxiosResponse } from 'axios';
// import dayjs from 'dayjs';
// import { useSelector } from '@/redux/store';

// import { useDispatch } from 'react-redux';
// import { addRangeTime } from '@/redux/slice/rangeTime.slice';
// import { addAllEventState } from '@/redux/slice/event.slice';
// import { rangeTimeData } from '@/redux/selector/rangeTime.selector';
// import { monthIndexData } from '@/redux/selector/monthIndex.selector';

// import Month from '@/components/calendar/Month';
// import CreateMeet from '@/components/modal/CreateMeet';
// import CalendarHeader from '@/components/calendar/CalendarHeader';
// import Sidebar from '@/components/calendar/Sidebar';

// import type { CalendarEvent } from '@/components/calendar/type/type';
// import { showCreateEventModalData } from '@/redux/selector/showCreateEventModal.selector';
// import { allEventData } from '@/redux/selector/event.selector';

// import { LoadingOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';

// const calendar = () => {
//   const [currenMonth, setCurrentMonth] = useState<any>(getMonth());
//   const [loading, setLoading] = useState<boolean>(false)
//   const dispatch = useDispatch();
//   const navigate = useNavigate()

//   const monthIndex = useSelector(monthIndexData)
//   const rangeTime = useSelector(rangeTimeData)
//   const showCreateEventModal = useSelector(showCreateEventModalData);
//   const events = useSelector(allEventData)

//   useEffect(() => {
//     setCurrentMonth(getMonth(monthIndex));
//   }, [monthIndex]);

//   useEffect(() => {
//     const month = dayjs().month(monthIndex)
//     dispatch(addRangeTime([
//       month.startOf('month').valueOf(), 
//       month.endOf('month').valueOf()
//     ]))
//   }, [monthIndex]);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       const { data }: AxiosResponse<{ events: CalendarEvent[] }> = await EventRequest.get(`/calendar?start-event=${rangeTime[0]}&end-event=${rangeTime[1]}`)
//       // console.log(data.events)
//       dispatch(addAllEventState(data.events))
//     } 
//     // fetchEvent()
//     console.log(dayjs(rangeTime[0]).format('MMM-DD-YYYY') + ' - ' + dayjs(rangeTime[1]).format('MMM-DD-YYYY'))
//   }, [rangeTime]);

//   console.log()
//   console.log(monthIndex)

//   // useEffect(() => {
//   //   navigate(`/calendar/month/${dayjs().month(monthIndex).format('MMM').toLowerCase()}`)
//   // }, [])

//   return (
//     <>
//       <CreateMeet 
//         showModal={showCreateEventModal}
//       />
//       <div className="h-screen flex flex-col w-full">
//         <CalendarHeader />
//         {/* {
//           JSON.stringify(events)
//         } */}
//         {
//           loading ?
//           (
//             <div className="w-full h-screen flex justify-center items-center">
//               <LoadingOutlined
//                 style={{
//                   fontSize: 100,
//                   color: '#e0dfda'
//                 }}
//                 spin
//                 rev={undefined}
//               />
//             </div>
//           )
//           :
//           (
//             <div className="flex flex-1">
//               <Sidebar/>
//               <Month month={currenMonth} e={events}/>
//             </div>

//           )
//         }
//       </div>
//     </>
//   )
// }

// export default calendar

import dayjs from 'dayjs'
import { getYear } from '@/utils/getAllYear'
import SmallMonth from '@/components/calendar/SmallMonth'

const calendar = () => {
  const allYear = Array.from({ length: 12 }).map((_, month) => { return {
    fullnameMonth: dayjs().month(month).format('MMMM'),
    month: getYear(month)
  }
  })
  console.log(allYear)


  const fullMonth = Array.from({ length: 12 }).map((_, month) => dayjs().month(month).format('MMMM'))

  return (
    <div className="flex flex-col h-screen w-screen">
      <header 
      className="px-4 py-2 flex items-center border-b text-calendar-main-theme border-calendar-minor-theme relative"
    >
      <h2 className="mr-10 text-xl font-bold">
        Calendar
      </h2>
      <div className="flex flex-row gap-4 mx-4">
      </div>
      <h2 className="ml-4 text-xl font-bold">
        
      </h2>
    </header>

      <div className="h-full w-screen grid grid-cols-4 gap-2 p-2">
        {
          allYear.map((month) => (
            <SmallMonth 
              month={month.month} 
              fullnameMonth={month.fullnameMonth}
            />
          ))
        }
      </div>

    </div>
  )
}

export default calendar