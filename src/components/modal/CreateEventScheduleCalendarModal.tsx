import { Fragment, useState, useEffect, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
// import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
// import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import { CgClose } from "react-icons/cg";
import TimeEventInput from '@/components/input/TimeEventInput';
import SmallCalendarSelector from '@/components/calendar/SmallCalendarSelector';
import CreateEventButton from '@/components/button/CreateEventButton';
import { defaultValues } from "@/components/calendar/type/initialState";

import { convertDateToUnix } from '@/utils/convertDateToUnix';

import { toggleCreateEventModal } from '@/redux/slice/showCreateEventModal.slice';
import { EventParams, ErrorInput } from '@/type';
import { useContractCalendar } from '@/wagmi';
import { LoadingOutlined } from '@ant-design/icons';

import { monthArrayToRangeTime } from '@/utils/rangeTimeStamp';
import { addRangeTime } from '@/redux/slice/rangeTime.slice';
import { rangeTimeData } from '@/redux/selector/rangeTime.selector';
import { useSelector } from '@/redux/store';

import type { FC } from 'react'
import type { UseFormRegister } from "react-hook-form";
import type { Dayjs } from 'dayjs';
import type { IMeetEvent, TimeRatio } from "@/components/calendar/type/type";

interface ICreateEventScheduleCalendarModal { 
  showModal: boolean; 
}

const CreateEventScheduleCalendarModal: FC<ICreateEventScheduleCalendarModal> = ({ showModal }) => {
  const [timeRatioStart, setTimeRatioStart] = useState<TimeRatio>('00');
  const [timeRatioEnd, setTimeRatioEnd] = useState<TimeRatio>('00');
  const [daySelectorEvent, setDaySelectorEvent] = useState<Dayjs>(dayjs());
  const [messageReturn, setMessageReturn] = useState<string>('');
  const [changeLoading, setChangeLoading] = useState<boolean>(false);
  const [errorInput, setErrorInput] = useState<ErrorInput>({ status: false, message: '' });

  const dispatch = useDispatch()
  const { calendarTitle, calendarIndex, date } = useParams<EventParams>();
  const calendarContract = useContractCalendar();
  const rangeTime = useSelector(rangeTimeData);
  const monthIndex = daySelectorEvent.month()

  useEffect(() => {
    if (date && showModal) {
      setDaySelectorEvent(dayjs(date))
    }
  }, [showModal])

  useEffect(() => {
    const rangeTimeArray = monthArrayToRangeTime(monthIndex);
    dispatch(addRangeTime(rangeTimeArray));
  }, [monthIndex])

  const { 
    register,
    handleSubmit,
    reset,
    control,
  } = useForm<IMeetEvent>({defaultValues});
  
  const closeModalHandler = () => {
    setErrorInput({ status: false, message: '' });
    setChangeLoading(false);
    reset(defaultValues);
    setTimeRatioStart('00');
    setTimeRatioEnd('00');
    setDaySelectorEvent(dayjs())
    dispatch(toggleCreateEventModal(false));
  }

  const onSubmit = async (data: IMeetEvent) => {
    const {
      title,
      startHour,
      endHour
    } = data;

    if (title.length === 0) {
      return setErrorInput({ 
        status: true, 
        message: 'please fill title!' 
      });
    }

    try {
      const id = Date.now();
      const startEvent = convertDateToUnix(
        startHour, 
        timeRatioStart, 
        daySelectorEvent
      );
      const endEvent = convertDateToUnix(
        endHour, 
        timeRatioEnd, 
        daySelectorEvent
      );
      const calendarEventTitle = calendarTitle?.replaceAll('-', ' ');

      if (startEvent >= endEvent) {
        return setErrorInput({ 
          status: true, 
          message: 'please change event time!' 
        });
      }
  
      setErrorInput({ status: false, message: '' });
      setChangeLoading((loading) => !loading);
      setMessageReturn('creating event in process');
      const responseData = await calendarContract.addEventSchedule(
        id,
        startEvent,
        endEvent,
        Number(calendarIndex),
        calendarEventTitle!,
        title,
        rangeTime,
      );

      setMessageReturn('created event successfully and waiting for set data...');
      await responseData.wait();
      
      closeModalHandler();
    }
    catch (e) {
      console.log(e);
      setChangeLoading(false);
      setErrorInput({ status: true, message: 'something went wrong!' });
      setTimeout(() => {
        setErrorInput({ status: false, message: '' });
        closeModalHandler();
      }, 1500);
    }
  }

  const timeRatioStartSelectorHandler = useCallback((time: TimeRatio) => {
    setTimeRatioStart(time);
  }, [])


  const timeRatioEndSelectorHandler = useCallback((time: TimeRatio) => {
    setTimeRatioEnd(time);
  }, [])

  const getDaySelectedHandler = (day: Dayjs) => {
    setDaySelectorEvent(day);
  }
  
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
                  className="relative flex flex-col w-full items-center overflow-hidden bg-white p-4 rounded-xl gap-2"
                >
                  <div 
                    className="flex flex-row justify-between items-center w-full border-b-2 border-calendar-main-theme pb-2"
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
                    <p className="font-bold">Date</p>
                    <p>{daySelectorEvent.format("dddd, DD MMMM YYYY")}</p>
                  </div>
                  
                  <div className="w-full gap-2 flex flex-col">
                    <label 
                      className="flex justify-start items-center text-md font-bold"
                    >
                      Title
                    </label>
                    <input
                      type="text" 
                      className="w-full p-2 focus:outline-none border-2 border-calendar-main-theme rounded-md"
                      {...register('title')}
                    />
                  </div>
                  <div className="w-full">
                    <TimeEventInput
                      title={"From"}
                      control={control}
                      name={"startHour"}
                      timeRatioSelected={timeRatioStart}
                      onRatioSelector={timeRatioStartSelectorHandler}
                    />
                  </div>
                  <div className="w-full">
                    <TimeEventInput
                      title={"To"}
                      control={control}
                      name={"endHour"}
                      timeRatioSelected={timeRatioEnd}
                      onRatioSelector={timeRatioEndSelectorHandler}
                    />
                  </div>
                  <SmallCalendarSelector
                    onDaySelected={getDaySelectedHandler}
                    daySelectedEvent={daySelectorEvent}
                  />
                  <div className="w-full flex justify-center py-1">
                    {
                      changeLoading
                      &&
                      (
                        <div 
                          className="absolute bottom-[60px] text-xs flex flex-row gap-1"
                        >
                          <div className="flex items-center">
                            <LoadingOutlined
                              style={{
                                fontSize: 10,
                                color: '#1e293b',
                              }}
                              spin
                              rev={undefined}
                            />
                          </div>
                          <p>{messageReturn}</p>
                        </div>                    
                      )
                    }
                    {
                      errorInput.status
                      &&
                      (
                        <div 
                          className="absolute bottom-[60px] text-red-500 font-semibold text-xs"
                        >
                          {errorInput.message}
                        </div>
                      )
                    }

                  </div>
                  <div className="w-full">
                    <CreateEventButton 
                      title={'Create Event'}
                      disabled={false}
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

export default CreateEventScheduleCalendarModal;

