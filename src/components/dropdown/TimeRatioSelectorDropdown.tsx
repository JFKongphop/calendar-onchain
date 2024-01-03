import { Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import { Menu, Transition } from '@headlessui/react';
import { timeRatioSelector } from '@/components/calendar/type/initialState';

import type { FC } from 'react';
import type { EventParams } from '@/type';
import type { RangeDay, TimeRatio } from '@/components/calendar/type/type';


const timeSelector: RangeDay[] =  ['Today', 'Month'];

interface ITimeRatioSelectorDropdown {
  timeRatioSelected: TimeRatio;
  onRatioSelector: (time: TimeRatio) => void;
}

const TimeRatioSelectorDropdown: FC<ITimeRatioSelectorDropdown> = ({
  timeRatioSelected,
  onRatioSelector
}) => {
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