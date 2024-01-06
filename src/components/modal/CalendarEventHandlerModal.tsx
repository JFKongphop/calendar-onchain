import { Fragment, useEffect, useState } from "react";
import { useContractCalendar } from "@/wagmi";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import { utils } from "ethers";

import CreateEventButton from "@/components/button/CreateEventButton";
import EventHandlerCard from "@/components/card/EventHandlerCard";

import type { FC } from 'react';
import type { CalendarHandler, ErrorInput, EventTitle, RegisterProps, SetValueProps } from "@/type";

interface ICalendarEventHandlerModal {
  calendarEventData: EventTitle;
  calendarIndex: number;
  type: CalendarHandler;
  showModal: boolean;
  onCloseModal: () => void;
  onChangeTitleSuccess: (hash: string) => void;
}

export interface IEditTile {
  input: string;
}

const defaultValues: IEditTile = {
  input: ''
}

const CalendarEventHandlerModal: FC<ICalendarEventHandlerModal> = ({
  calendarEventData,
  calendarIndex,
  type,
  showModal,
  onCloseModal,
  onChangeTitleSuccess
}) => {
  const [messageReturn, setMessageReturn] = useState<string>('');
  const [changeLoading, setChangeLoading] = useState<boolean>(false);
  const [errorInput, setErrorInput] = useState<ErrorInput>({ status: false, message: '' });
  const calendarContract = useContractCalendar();

  const {
    register,
    reset,
    watch,
    handleSubmit,
    setValue,
  } = useForm<IEditTile>({defaultValues});

  const registerProps = register as RegisterProps<IEditTile>;
  const setValueProps = setValue as SetValueProps<IEditTile>;


  const closeModalHandler = () => {
    setErrorInput({ status: false, message: '' });
    reset(defaultValues);
    onCloseModal();
  }

  const changeTitleHandler = async (title: string) => {
    if (title === calendarEventData.title) {
      return setErrorInput({ 
        status: true, 
        message: 'please change another name!' 
      });
    }
    if (title.length === 0) {
      return setErrorInput({ 
        status: true, 
        message: 'please fill title name!' 
      });
    }

    setErrorInput({ status: false, message: '' });
    setChangeLoading((loading) => !loading);
    setMessageReturn('editing in process');
    const data = await calendarContract.editEventStoreTitle(calendarIndex, title);
    setMessageReturn('editing name successfully and waiting for set data...');
    await data.wait();

    closeModalHandler();
    setChangeLoading((loading) => !loading);
    onChangeTitleSuccess(data.hash);
  }

  const inviteAccountHandler = async (address: string) => {
    if (!utils.isAddress(address) || address.length === 0) {
      return  setErrorInput({
        status: true,
        message: 'please fill address'
      });
    }

    setErrorInput({ status: false, message: '' });
    setChangeLoading((loading) => !loading);
    setMessageReturn('inviting in process');
    const data = await calendarContract.inviteParticipation(
      calendarIndex, 
      calendarEventData.title, 
      address
    );
    setMessageReturn('invited account successfully and waiting for set data...');
    await data.wait();

    closeModalHandler();
    setChangeLoading((loading) => !loading);
    onChangeTitleSuccess(data.hash);
  }

  const removeAccountHandlder = async (address: string) => {
    setErrorInput({ status: false, message: '' });
    setChangeLoading((loading) => !loading);
    setMessageReturn('deleting in process');

    let data: any;
    if (address === 'all') {
      data = await calendarContract.removeAllAccountParticipations(calendarIndex);
    }
    else {
      data = await calendarContract.removeAccountParticipation(calendarIndex, address);
    }

    setMessageReturn('deleted account successfully and waiting for set data...');
    await data.wait();

    closeModalHandler();
    setChangeLoading((loading) => !loading);
    onChangeTitleSuccess(data.hash);
  }

  const onSubmit = async ({ input }: IEditTile) => {
    try {
      if (type === 'edit title') return await changeTitleHandler(input);
      else if (type === 'invite') return await inviteAccountHandler(input);
      else if (type === 'delete account') return await removeAccountHandlder(input);
    }
    catch (e) {
      console.log(e);
      setErrorInput({ status: true, message: 'something went wrong!' });
      setChangeLoading((loading) => !loading);
      setTimeout(() => {
        closeModalHandler();
      }, 1500);
    }
  }

  const input = watch('input');
  useEffect(() => {
    if (calendarEventData && type === 'edit title') {
      setErrorInput({ 
        status: input === calendarEventData.title, 
        message: 'please change another name!' 
      });
    }
    else if (!utils.isAddress(input) && type === 'invite' && input.length > 1) {
      setErrorInput({
        status: true,
        message: 'please fill address'
      });
    }
  }, [input]);

  useEffect(() => {
    if (input.length === 0) {
      setErrorInput({ status: false, message: '' });
    }
  }, [input]);

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
                  {
                    calendarEventData
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
                  }
                  <div className="w-full">
                    <CreateEventButton 
                      title={'Confirm'}
                      disabled={errorInput.status}
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

export default CalendarEventHandlerModal;