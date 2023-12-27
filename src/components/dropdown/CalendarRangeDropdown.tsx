import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

import { addMonthIndexState } from '@/redux/slice/monthIndex.slice';
import { addDaySelected } from '@/redux/slice/daySelected.slice';

import { Menu, Transition } from '@headlessui/react';
import { RangeDay } from '@/components/calendar/type/type';

const timeSelector: RangeDay[] =  ['Today', 'Month'];

const CalendarRangeDropdown = () => {
  const [rangeDay, setRangeDay] = useState<RangeDay>('Month');
  const dispatch = useDispatch()
  
  const nagvigate = useNavigate();
  
  const rangeDaySelectorHandler = (range: RangeDay) => {
    let terminalUrl: string = '';

    if (range === 'Today') {
      terminalUrl = `/calendar/${dayjs().format('MMM-DD-YYYY').toLowerCase()}`;
    }

    if (range === 'Month') {
      terminalUrl = '/calendar';
    }

    dispatch(addDaySelected(dayjs()))
    dispatch(addMonthIndexState(dayjs().month()))


    nagvigate(terminalUrl);
    setRangeDay(range);
  }
  
  return (
    <Menu 
      as="div" 
      className="relative inline-block text-left"
    >
      <div>
        <Menu.Button 
          className="inline-flex w-24 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-md font-semibold border-2 border-calendar-main-theme"
        >
          <p>{rangeDay}</p>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items 
          className="absolute right-0 z-10 mt-1 w-24 origin-top-right rounded-md bg-white border-2 border-calendar-main-theme"
        >
          <div className="h-auto p-2 gap-2 flex flex-col">
            {
              timeSelector.map((data) => (
                <Menu.Item key={data}>
                  {({ active }) => (
                    <button
                      onClick={() => rangeDaySelectorHandler(data)}
                      className={`${active && 'bg-calendar-minor-theme'} border-2 border-calendar-main-theme flex flex-row justify-center items-center text-md w-full font-medium text-calendar-main-theme h-10 rounded-sm`}
                    >
                      <p>{data}</p>
                    </button>
                  )}
                </Menu.Item>
              ))
            }
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default CalendarRangeDropdown;