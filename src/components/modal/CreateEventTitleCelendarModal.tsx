import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from "react-hook-form";
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { CgClose } from "react-icons/cg";
import CreateEventButton from '@/components/button/CreateEventButton';
import { defaultValues } from "@/components/calendar/type/initialState";

import { CALENDAR_ADDRESS, VITE_PINATA_JWT } from '@/configs/enviroment';
import { calendarABI } from '@/abi/calendar';

import type { ChangeEvent, FC, FormEvent } from 'react';
import type { IMeetEvent } from "@/components/calendar/type/type";
import { useContractCalendar } from '@/wagmi';
import { ErrorInput } from '@/type';
import axios from 'axios';

interface ICreateEventTitleCelendarModal { 
  showModal: boolean;
  onCloseModal: () => void;
}

const CreateEventTitleCelendarModal: FC<ICreateEventTitleCelendarModal> = ({ 
  showModal,
  onCloseModal
}) => {
  const [messageReturn, setMessageReturn] = useState<string>('');
  const [changeLoading, setChangeLoading] = useState<boolean>(false);
  const [errorInput, setErrorInput] = useState<ErrorInput>({ status: false, message: '' });

  const [displayImage, setDisplayImage] = useState<File | null | undefined>(null);
  const [eventImage, setEventImage] = useState<string | ArrayBuffer | null>(null);
  
  const calendarContract = useContractCalendar();

  const { 
    register,
    reset,
    watch,
    handleSubmit
  } = useForm<IMeetEvent>({defaultValues});

  const closeModalHandler = () => {
    setErrorInput({ status: false, message: '' });
    setChangeLoading(false);
    setMessageReturn('');
    reset(defaultValues);
    onCloseModal();
  }
  
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

  const submitCreateTitleEvent = () =>  write?.();

  useEffect(() => {
    if (isSuccess) closeModalHandler();
  }, [isSuccess]);

  const getImageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setDisplayImage(files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(files?.[0] as File);
      reader.onloadend = () => {
        setEventImage(reader.result);
      }
    }
  }

  

  const onSubmit = async (data: IMeetEvent) => {

    const formData = new FormData();

    formData.append('file', displayImage!)

    try{
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS", 
        formData, 
        {
          headers: {
            'Content-Type': `multipart/form-data`,
            Authorization: `Bearer ${VITE_PINATA_JWT}`
          }
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    
    // if (!eventImage) {
    //   return setErrorInput({ 
    //     status: true, 
    //     message: 'please upload image!' 
    //   });
    // }

    // try {

    // }
    // catch (e) {
    //   console.log(e);
    //   setChangeLoading(false);
    //   setErrorInput({ status: true, message: 'something went wrong!' });
    //   return setTimeout(() => {
    //     setErrorInput({ status: false, message: '' });
    //     closeModalHandler();
    //   }, 1500);
    // }

    // const { title } = data;
    // if (!title) {
    //   return setErrorInput({ 
    //     status: true, 
    //     message: 'please fill title!' 
    //   });
    // }
     


    // try {
    //   setErrorInput({ status: false, message: '' });
    //   setChangeLoading((loading) => !loading);
    //   setMessageReturn('creating calendar event in process');
    //   const data = await calendarContract.createEventStore(title);
      
    //   setMessageReturn('created event successfully and waiting for set data...');
    //   await data.wait();

    //   closeModalHandler();
    // }
    // catch (e) {
    //   console.log(e);
    //   setChangeLoading(false);
    //   setErrorInput({ status: true, message: 'something went wrong!' });
    //   setTimeout(() => {
    //     setErrorInput({ status: false, message: '' });
    //     closeModalHandler();
    //   }, 1500);
    // }
  }

  console.log(VITE_PINATA_JWT)
    
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
                      className="flex justify-start items-center text-md font-bold"
                    >
                      Image
                    </label>
                    <div 
                      className="h-[200px] w-full rounded-md border-2 border-dotted	 border-calendar-main-theme relative flex justify-center items-center cursor-pointer"
                    >
                      <p>upload</p>
                      <input
                        type="file" 
                        className="w-full h-full p-2 focus:outline-none border border-red-500 absolute opacity-0"
                        onChange={getImageHandler}
                      />
                    </div>
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
                    <CreateEventButton
                      disabled={false}
                      title={'Create Title Calendar'}
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

export default CreateEventTitleCelendarModal;
