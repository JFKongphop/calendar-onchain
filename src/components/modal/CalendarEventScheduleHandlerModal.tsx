import { DayEventParams, ErrorInput, EventSchedule, MonthEventParams, TimeDurationHandler } from '@/type';
import { Dialog, Transition } from '@headlessui/react';
import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import CreateEventButton from '../button/CreateEventButton';
import { useForm } from 'react-hook-form';
import { defaultValues } from '../calendar/type/initialState';
import { IMeetEvent, TimeRatio } from '../calendar/type/type';
import { useContractCalendar } from '@/wagmi';
import { useParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { getMonth } from '@/utils/getMonth';
import { addRangeTime } from '@/redux/slice/rangeTime.slice';
import { rangeTimeData } from '@/redux/selector/rangeTime.selector';
import { useSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { convertDateToUnix } from '@/utils/convertDateToUnix';
import TimeEventInput from '../input/TimeEventInput';

interface ICalendarEventScheduleHandlerModal {
  eventScheduleData: EventSchedule;
  type: TimeDurationHandler;
  showModal: boolean;
  onCloseModal: () => void;
  onHandlerSuccess: (hash: string) => void;
}

const CalendarEventScheduleHandlerModal: FC<ICalendarEventScheduleHandlerModal> = ({
  eventScheduleData,
  type,
  showModal,
  onCloseModal,
  onHandlerSuccess
}) => {
  const [messageReturn, setMessageReturn] = useState<string>('');
  const [changeLoading, setChangeLoading] = useState<boolean>(false);
  const [errorInput, setErrorInput] = useState<ErrorInput>({ status: false, message: '' });
  const [timeRatioStart, setTimeRatioStart] = useState<TimeRatio>('00');
  const [timeRatioEnd, setTimeRatioEnd] = useState<TimeRatio>('00');
  
  const calendarContract = useContractCalendar();
  const { calendarIndex, calendarTitle, date } = useParams<DayEventParams>();
  const [currenMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());
  const rangeTime = useSelector(rangeTimeData);
  const dispatch = useDispatch();
  const daySelectorEdit = dayjs(date);


  const monthIndex = dayjs(date).month()

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    const startTimeMonthArray = currenMonth[0][0].startOf('day').valueOf();
    const endTimeMonthArray = currenMonth[4][6].endOf('day').valueOf();

    dispatch(addRangeTime([startTimeMonthArray, endTimeMonthArray]))
  }, [monthIndex]);



  // uint256 store_index,
  // uint256 event_id,
  // string memory month_range



  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
  } = useForm<IMeetEvent>({defaultValues});

  const closeModalHandler = () => {
    setErrorInput({ status: false, message: '' });
    setChangeLoading(false);
    reset(defaultValues);
    setTimeRatioStart('00');
    setTimeRatioEnd('00');
    setMessageReturn('');
    onCloseModal();
  }



  const editEventScheduleHandler = async (title: string, startEvent: number, endEvent: number) => {
    setMessageReturn('editing in process');
    setErrorInput({ status: false, message: '' });
    setChangeLoading((loading) => !loading);

    const {
      id,
      title: oldTitle,
      start_event: oldStartEvent,
      end_event: oldEndEvent
    } = eventScheduleData;
    const daySelectorStartDay = dayjs(daySelectorEdit.startOf('day').valueOf());

    const newTitle = title === oldTitle ? oldTitle : title;
    const newStartEvent = (
      dayjs(startEvent).isSame(oldStartEvent)
      || daySelectorStartDay.isSame(startEvent)
    ) 
      ? oldStartEvent 
      : startEvent;
    const newEndEvent = (
      dayjs(endEvent).isSame(oldEndEvent)
      || daySelectorStartDay.isSame(endEvent)
    )
      ? oldEndEvent 
      : endEvent; 

    const data = await calendarContract.editEventSchedule(
      calendarIndex,
      id,
      newStartEvent,
      newEndEvent,
      rangeTime,
      newTitle
    );
    setMessageReturn('edited successfully and waiting for set data...');

    await data.wait()
    closeModalHandler();
    setChangeLoading((loading) => !loading);
    onHandlerSuccess(data.hash);
  }


  const deleteEventScheduleHandler = async () => {
    setMessageReturn('removing in process');
    setErrorInput({ status: false, message: '' });
    setChangeLoading((loading) => !loading);

    const data = await calendarContract.deleteEventSchedule(
      Number(calendarIndex),
      eventScheduleData.id,
      rangeTime
    );

    setMessageReturn('removed account successfully and waiting for set data...');
    await data.wait();

    closeModalHandler();
    setChangeLoading((loading) => !loading);
    onHandlerSuccess(data.hash);
  }

  const timeRatioStartSelectorHandler = useCallback((time: TimeRatio) => {
    setTimeRatioStart(time);
  }, [])


  const timeRatioEndSelectorHandler = useCallback((time: TimeRatio) => {
    setTimeRatioEnd(time);
  }, [])



  const onSubmit = async (data: IMeetEvent) => {
    const {
      title,
      startHour,
      endHour
    } = data;

    
    const startEvent = convertDateToUnix(
      startHour, 
      timeRatioStart, 
      daySelectorEdit
    );
    const endEvent = convertDateToUnix(
      endHour, 
      timeRatioEnd, 
      daySelectorEdit
    );

    try {
      if (type === 'edit') return await editEventScheduleHandler(title, startEvent, endEvent);
      if (type === 'remove') return await deleteEventScheduleHandler();
    }
    catch (e) {
      console.log(e);
      setErrorInput({ status: true, message: 'something went wrong!' });
      setChangeLoading((loading) => !loading);
      setTimeout(() => {
        closeModalHandler();
      }, 1500)
    }
  }

  useEffect(() => {
    setValue('title', eventScheduleData.title)
  }, []);


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
                    className="flex flex-row justify-between items-center w-full border-b-2 border-calendar-main-theme pb-2"
                  >
                    <p className="font-semibold text-xl capitalize">{type}</p>
                    <button
                      type="button"
                      onClick={closeModalHandler}
                    >
                      <CgClose className="h-6 w-6 font-bold" />
                    </button>
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
                  <div className="w-full gap-2 flex flex-col">
                    <label 
                      className="flex justify-start items-center text-md"
                    >
                      Title
                    </label>
                    <input
                      type="text" 
                      className="w-full p-2 focus:outline-none border-2 border-calendar-main-theme rounded-md"
                      {...register('title')}
                    />
                  </div>
                  {
                    type === 'remove' 
                    &&
                    (
                      <div 
                        className="flex flex-col justify-center text-lg font-bold text-center gap-1"
                      >
                        <p>Do you want to remove</p>
                        <p 
                          className="text-xl border-b-2 text-red-500 border-red-500"
                        >
                          {eventScheduleData.title}
                        </p>
                      </div>
                    )
                  }
                  {
                    changeLoading
                    &&
                    (
                      <div 
                        className="flex flex-row items-center absolute bottom-16 text-calendar-main-theme font-semibold text-xs gap-1"
                      >
                        <LoadingOutlined
                          style={{
                            fontSize: 10,
                            color: '#1e293b',
                          }}
                          spin
                          rev={undefined}
                        />
                        <p>{messageReturn}</p>
                      </div>
                    )
                  }
                  {
                    errorInput.status
                    &&
                    (
                      <div 
                        className="absolute bottom-16 text-red-500 font-semibold text-xs"
                      >
                        {errorInput.message}
                      </div>
                    )
                  }
                  {/* {
                    eventScheduleData
                    &&
                    (
                      <EventHandlerCard 
                        type={type}
                        changeLoading={changeLoading}
                        errorInput={errorInput}
                        messageReturn={messageReturn}
                        addresses={calendarEventData.parctitipationAccount}
                        register={registerProps}
                        setValue={setValueProps}
                      />
                    )
                  } */}
                  <div className="w-full">
                    <CreateEventButton 
                      title={'Confirm'}
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
  )
}

export default CalendarEventScheduleHandlerModal