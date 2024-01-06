import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HiDotsVertical } from "react-icons/hi";

import type { FC } from "react";
import type { CalendarHandler } from "@/type";

const functionHandlers: CalendarHandler[] = ['edit title', 'invite', 'delete account']

interface ICalendarEventHandlerDropdown {
  onGetCalendarHandlerType: (type: CalendarHandler) => void;
  onToggleCalendarHandlerModal: () => void;
}

const CalendarEventHandlerDropdown: FC<ICalendarEventHandlerDropdown> = ({
  onGetCalendarHandlerType,
  onToggleCalendarHandlerModal
}) => {

  const openCalendarModal = (type: CalendarHandler) => {
    onGetCalendarHandlerType(type);
    onToggleCalendarHandlerModal();
  }

  return (
    <Menu 
      as="div" 
      className="relative inline-block text-left"
    >
      <div>
        <Menu.Button 
          className="inline-flex w-24 justify-end rounded-md text-xl font-semibold"
        >
          <HiDotsVertical/>
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
          className="absolute right-0 z-10 mt-1 w-[156px] origin-top-right rounded-md bg-white border-2 border-calendar-main-theme"
        >
          <div className="h-auto p-2 flex flex-col gap-2">
            {
              functionHandlers.map((data) => (
                <Menu.Item key={data}>
                  {({ active }) => (
                    <button
                      onClick={() => openCalendarModal(data)}
                      className={`${active && 'bg-calendar-minor-theme'} flex flex-row justify-center items-center text-md w-full font-medium text-calendar-main-theme h-8 rounded-sm border-2 border-calendar-main-theme`}
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

export default CalendarEventHandlerDropdown;