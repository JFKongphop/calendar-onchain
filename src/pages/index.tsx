import React, { Fragment, useContext } from 'react'
import dayjs from 'dayjs';
import { getMonth } from '@/utils/getMonth';
import { 
  Menu, 
  Dialog, 
  Transition 
} from '@headlessui/react';
import CalendarHeader from '@/components/calendar/CalendarHeader';

const Index = () => {
  console.log(dayjs());

  console.log(getMonth())

  
  return (
    <div className="text-red-500">
<CalendarHeader />
    </div>
  )
}

export default Index;