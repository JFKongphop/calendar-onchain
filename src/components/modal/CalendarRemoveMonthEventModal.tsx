import { monthIndexData } from '@/redux/selector/monthIndex.selector';
import { useSelector } from '@/redux/store';
import { ErrorInput, EventParams } from '@/type';
import { useContractCalendar } from '@/wagmi';
import { LoadingOutlined } from '@ant-design/icons';
import { Dialog, Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { useParams } from 'react-router-dom';
import CreateEventButton from '../button/CreateEventButton';

interface ICalendarRemoveMonthEventModal {
  rangeTime: string;
  showModal: boolean;
  onCloseModal: () => void;
  onLeaveParticipationSuccess: (hash: string) => void;
}

const CalendarRemoveMonthEventModal: FC<ICalendarRemoveMonthEventModal> = ({
  rangeTime,
  showModal,
  onCloseModal,
  onLeaveParticipationSuccess
}) => {
  const [rangeTimestamp, setRangeTimestamp] = useState<[number, number]>([0, 0]);
  const [messageReturn, setMessageReturn] = useState<string>('');
  const [changeLoading, setChangeLoading] = useState<boolean>(false);
  const [errorInput, setErrorInput] = useState<ErrorInput>({ status: false, message: '' });

  const { calendarIndex } = useParams<EventParams>()
  const calendarContract = useContractCalendar();

  useEffect(() => {
    const [start, end] = rangeTime.split('-').map((time) => Number(time));
    setRangeTimestamp([start, end]);
  }, [rangeTime]);

  const convertTimestampToDate = (timestamp: number) => {
    return dayjs(timestamp).format('MMMM, DD YYYY');
  }
  

  const removeEventScheduleMonthHandler = async () => {
    try {
      setErrorInput({ status: false, message: '' });
      setChangeLoading((loading) => !loading);
      setMessageReturn('removing in process');
      const data = await calendarContract.deleteEventScheduleMonth(calendarIndex, rangeTime);

      setMessageReturn('removed successfully and waiting for set data...');
      await data.wait();
  
      onCloseModal();
      setChangeLoading((loading) => !loading);
      onLeaveParticipationSuccess(data.hash);
    }
    catch (e) {
      console.log(e);
      setErrorInput({ status: true, message: 'something went wrong!' });
      setChangeLoading((loading) => !loading);
      setTimeout(() => {
        onCloseModal();
        setErrorInput({ status: false, message: '' });
      }, 1500);
    }
  }


  return (
    <Transition.Root 
      show={showModal} 
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-10 text-calendar-main-theme"
        onClose={onCloseModal}
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
                    <p className="font-semibold text-xl capitalize">Leave</p>
                    <button
                      type="button"
                      onClick={onCloseModal}
                    >
                      <CgClose className="h-6 w-6 font-bold" />
                    </button>
                  </div>
                  <div 
                    className="flex flex-col justify-center text-lg font-bold text-center gap-1"
                  >
                    <p>Do you want to remove event between</p>
                    <div 
                      className="text-xl border-b-2 text-red-500 border-red-500 flex flex-col justify-center"
                    >
                      <p>{convertTimestampToDate(rangeTimestamp[0])}</p>
                      <p>to</p>
                      <p>{convertTimestampToDate(rangeTimestamp[1])}</p>
                      
                    </div>
                  </div>
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
                  <div className="w-full">
                    <CreateEventButton 
                      title={'Confirm'}
                      disabled={false}
                      onSubmitEvent={removeEventScheduleMonthHandler}
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

export default CalendarRemoveMonthEventModal;