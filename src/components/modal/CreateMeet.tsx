import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import { CgClose } from "react-icons/cg";
import TimeEventInput from '@/components/input/TimeEventInput';
import SmallCalendarSelector from '@/components/calendar/SmallCalendarSelector';
import CreateEventButton from '@/components/button/CreateEventButton';
import { defaultValues } from "@/components/calendar/type/initialState";

import EventRequest from '@/lib/event-request';
import { convertDateToUnix } from '@/utils/convertDateToUnix';

import type { FC } from 'react'
import type { UseFormRegister } from "react-hook-form";
import type { Dayjs } from 'dayjs';
import type { IMeetEvent, TimeRatio } from "@/components/calendar/type/type";

import { toggleCreateEventModal } from '@/redux/slice/showCreateEventModal.slice';


interface ICreateMeet { showModal: boolean; }

const CreateMeet: FC<ICreateMeet> = ({ showModal }) => {
  const [timeRatioStart, setTimeRatioStart] = useState<TimeRatio>('00');
  const [timeRatioEnd, setTimeRatioEnd] = useState<TimeRatio>('00');
  const [openTimeRatioStart, setOpenTimeRatioStart] = useState<boolean>(false);
  const [openTimeRatioEnd, setOpenTimeRatioEnd] = useState<boolean>(false);
  const [daySelectorEvent, setDaySelectorEvent] = useState<Dayjs>(dayjs());

  const { day_date } = useParams();
  

  const dispatch = useDispatch()


  const { 
    register,
    handleSubmit,
    reset,
    watch,
    control,
  } = useForm<IMeetEvent>({defaultValues});

  const onSubmit = async (data: IMeetEvent) => {
    const {
      title,
      startHour,
      endHour
    } = data;

    const calendarEvent = {
      title,
      id: Date.now(),
      start_event: convertDateToUnix(
        startHour, 
        timeRatioStart, 
        daySelectorEvent
      ),
      end_event: convertDateToUnix(
        endHour, 
        timeRatioEnd, 
        daySelectorEvent
      ),
    };

    const response = await EventRequest.post('/calendar', calendarEvent)
    console.log(response.data)

    console.log(calendarEvent)
    
    // if (selectedEvent) {
    //   dispatchCalEvent({ type: "update", payload: calendarEvent });
    // } else {
    //   dispatchCalEvent({ type: "push", payload: calendarEvent });
    // }

    // setShowEventModal(false);
    dispatch(toggleCreateEventModal(false))

    reset(defaultValues);
    setTimeRatioStart('00');
    setTimeRatioEnd('00');
  }

  const toggleTimeRatioStart = () => {
    setOpenTimeRatioStart(!openTimeRatioStart);
  }

  const timeRatioStartSelectorHandler = (time: TimeRatio) => {
    toggleTimeRatioStart();
    setTimeRatioStart(time);
  }

  const toggleTimeRatioEnd = () => {
    setOpenTimeRatioEnd(!openTimeRatioEnd);
  }

  const timeRatioEndSelectorHandler = (time: TimeRatio) => {
    toggleTimeRatioEnd();
    setTimeRatioEnd(time);
  }

  const closeModalHandler = () => {
    // setShowEventModal(false)
    dispatch(toggleCreateEventModal(false))
  }

  const getDaySelectedHandler = (day: Dayjs) => {
    setDaySelectorEvent(day);
  }

  useEffect(() => {
    setDaySelectorEvent(dayjs(day_date))
  }, [day_date]);
  
  const registerProps = register as unknown as UseFormRegister<IMeetEvent>;
  
  return (
    <Transition.Root 
      show={showModal} 
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-10 text-calendar-main-theme"
        onClose={closeModalHandler}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div 
            className="fixed inset-0 hidden bg-calendar-main-theme bg-opacity-75 transition-opacity md:block" 
          />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div 
            className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel 
                className="flex w-[400px] h-auto transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl"
              >
                <div 
                  className="relative flex flex-col w-full items-center overflow-hidden bg-white p-4 rounded-xl gap-6"
                >
                  <div 
                    className="flex flex-row justify-between items-center w-full border-b-2 border-calendar-minor-theme pb-2"
                  >
                    <p className="font-semibold text-xl">Create Event Schedule</p>
                    <button
                      type="button"
                      onClick={closeModalHandler}
                    >
                      <CgClose className="h-6 w-6 font-bold" />
                    </button>

                  </div>
                  <div
                    className="w-full text-md flex flex-row justify-between relative"
                  >
                    <p>Date</p>
                    <p>{(daySelectorEvent as any).format("dddd, DD MMMM YYYY")}</p>
                  </div>
                  
                  <div className="w-full gap-2 flex flex-col">
                    <label 
                      className="flex justify-start items-center text-md"
                    >
                      Title
                    </label>
                    <input
                      type="text" 
                      className="w-full p-2 focus:outline-none border-2 border-calendar-minor-theme rounded-md"
                      {...register('title')}
                    />
                  </div>
                  <div className="w-full">
                    <TimeEventInput
                      title={"From"}
                      control={control}
                      name={"startHour"}
                      openTimeRatio={openTimeRatioStart}
                      timeRatioSelected={timeRatioStart}
                      onRatioSelector={timeRatioStartSelectorHandler}
                      ontoggleTimeSelector={toggleTimeRatioStart}
                    />
                  </div>
                  <div className="w-full">
                    <TimeEventInput
                      title={"To"}
                      control={control}
                      name={"endHour"}
                      openTimeRatio={openTimeRatioEnd}
                      timeRatioSelected={timeRatioEnd}
                      onRatioSelector={timeRatioEndSelectorHandler}
                      ontoggleTimeSelector={toggleTimeRatioEnd}
                    />
                  </div>
                  <SmallCalendarSelector
                    onDaySelected={getDaySelectedHandler}
                    daySelectedEvent={daySelectorEvent}
                  />
                  <div className="w-full">
                    <CreateEventButton 
                      title={'Create Event'}
                      onSubmitEvent={handleSubmit(onSubmit)}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateMeet;

