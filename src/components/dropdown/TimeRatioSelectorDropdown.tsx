import { FC, Fragment, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

import { addMonthIndexState } from '@/redux/slice/monthIndex.slice';
import { addDaySelected } from '@/redux/slice/daySelected.slice';

import { Menu, Transition } from '@headlessui/react';
import { IMeetEvent, RangeDay, TimeRatio } from '@/components/calendar/type/type';
import { EventParams } from '@/type';
import { timeRatioSelector } from '../calendar/type/initialState';
import { UseFormSetValue } from 'react-hook-form';

const timeSelector: RangeDay[] =  ['Today', 'Month'];

interface ITimeRatioSelectorDropdown {
  timeRatioSelected: TimeRatio;
  onRatioSelector: (time: TimeRatio) => void;
  // setValue: UseFormSetValue<IMeetEvent>;
}

const TimeRatioSelectorDropdown: FC<ITimeRatioSelectorDropdown> = ({
  timeRatioSelected,
  onRatioSelector
}) => {
  const [rangeDay, setRangeDay] = useState<RangeDay>('Month');

  const dispatch = useDispatch();
  const { calendarIndex } = useParams<EventParams>();
  
  const nagvigate = useNavigate();
  
  const rangeDaySelectorHandler = (range: TimeRatio) => {
    let terminalUrl: string = '';
    const today = dayjs().format('MMM-DD-YYYY').toLowerCase();
    const month = dayjs().format('MMM').toLowerCase();

    // if (range === 'Today') {
    //   terminalUrl = `/calendar-event/${calendarIndex}/date/${today}`;
    // }

    // if (range === 'Month') {
    //   terminalUrl = `/calendar-event/${calendarIndex}/month/${month}`;
    // }

    // dispatch(addDaySelected(dayjs()))
    // dispatch(addMonthIndexState(dayjs().month()))

    // nagvigate(terminalUrl);
    // setRangeDay(range);
  }
  
  return (
    <Menu 
      as="div" 
      className="relative inline-block text-left"
    >
      <div>
        <Menu.Button 
          className="inline-flex w-12 justify-center gap-x-1.5 rounded-md bg-white h-8 text-md font-semibold border-2 border-calendar-main-theme items-center"
        >
          <p>{timeRatioSelected}</p>
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
          className="absolute right-0 z-10 mt-1 w-12 origin-top-right rounded-md bg-white border-2 border-calendar-main-theme"
        >
          <div className="h-auto flex flex-col">
            {
              timeRatioSelector.map((data) => (
                <Menu.Item key={data}>
                  {({ active }) => (
                    <button
                      onClick={() => onRatioSelector(data)}
                      className={`flex flex-row justify-center items-center text-md w-full font-medium text-calendar-main-theme h-10 rounded-sm`}
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

export default TimeRatioSelectorDropdown;