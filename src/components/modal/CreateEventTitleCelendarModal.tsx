import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { useContractWrite, Address, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'


import { CgClose } from "react-icons/cg";
import CreateEventButton from '@/components/button/CreateEventButton';
import { defaultValues } from "@/components/calendar/type/initialState";


import type { FC } from 'react';
import type { IMeetEvent, TimeRatio } from "@/components/calendar/type/type";

import { VITE_API_ENDPOINT, CALENDAR_ADDRESS } from '@/configs/enviroment';
import { calendarABI } from '@/abi/calendar';
import useDebounce from '@/hook/useDebounce';


interface ICreateEventTitleCelendarModal { 
  showModal: boolean;
  onCloseModal: () => void;
}

const CreateEventTitleCelendarModal: FC<ICreateEventTitleCelendarModal> = ({ 
  showModal,
  onCloseModal
}) => {
  const { 
    register,
    reset,
    watch,
  } = useForm<IMeetEvent>({defaultValues});
  
  const title: string = watch('title');
  const { config } = usePrepareContractWrite({
    address: CALENDAR_ADDRESS,
    abi: calendarABI,
    chainId: 5,
    functionName: 'createEventStore',
    args: [title],
    enabled: Boolean(title)
  });

  const { isSuccess, write } = useContractWrite(config);
  
  const closeModalHandler = () => {
    reset(defaultValues);
    onCloseModal();
  }

  const submitCreateTitleEvent = () =>  write?.();

  useEffect(() => {
    if (isSuccess) closeModalHandler();
  }, [isSuccess]);

    
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
                    <CreateEventButton
                      disabled={false}
                      title={'Create Title Calendar'}
                      onSubmitEvent={submitCreateTitleEvent}
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

export default CreateEventTitleCelendarModal;
