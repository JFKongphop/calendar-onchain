import { useCallback, useState } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { LoadingOutlined } from '@ant-design/icons';

import { IEditTile } from '@/components/modal/CalendarEventHandlerModal';
import CreateEventButton from '@/components/button/CreateEventButton';
import AddressCard from '@/components/card/AddressCard';

import type { FC } from 'react';
import type { Address } from 'viem';
import type { CalendarHandler, ErrorInput } from '@/type';


interface IEventHandlerCard {
  type: CalendarHandler;
  changeLoading: boolean;
  errorInput: ErrorInput;
  messageReturn: string;
  addresses: Address[];
  register: UseFormRegister<IEditTile>;
  setValue: UseFormSetValue<IEditTile>;
}

const EventHandlerCard: FC<IEventHandlerCard> = ({
  type,
  changeLoading,
  errorInput,
  messageReturn,
  addresses,
  register,
  setValue
}) => {
  const [prepareAddress, setPrepareAddress] = useState<string>('');

  const prepareRemoveAddressHandler = useCallback((selectedAddress: string) => {
    setPrepareAddress(selectedAddress);
    setValue('input', selectedAddress);
  }, [])

  return (
    <div className="w-full gap-2 flex flex-col">
      {
        type === 'delete account'
        &&
        (
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between items-center w-full">
              <p className='text-md font-semibold'>All Addresses</p>
              <div className="w-20">
                <CreateEventButton
                  title={'All'} 
                  disabled={false}
                  onSubmitEvent={() => prepareRemoveAddressHandler('all')}
                />
              </div>
            </div>
            <div 
              className="flex flex-col gap-1 overflow-y-auto max-h-[180px] border-2 p-1 rounded-md border-calendar-main-theme"
            >
              {
                addresses.map((address) => (
                  <AddressCard
                    key={address}
                    address={address}
                    onPrepareAddress={prepareRemoveAddressHandler}
                  />
                ))
              }
            </div>
          </div>
        )
      }
      <label 
        className="flex justify-start items-center text-md font-semibold"
      >
        {type === 'edit title' && 'Title'}
        {(type === 'invite' || type === 'delete account') && 'Address'}
      </label>
      {
        (type === 'edit title' || type === 'invite')
        &&
        (
          <input
            type="text" 
            className={`w-full p-2 focus:outline-none border-2 border-calendar-main-theme rounded-md h-10 ${type === 'invite' && 'text-xs'}`}
            {...register('input')}
          />
        )
      }
      {
        type === 'delete account'
        &&
        (
          <div 
            className="w-full p-2 border-2 border-calendar-main-theme rounded-md h-10 text-xs flex items-center justify-center font-medium capitalize"
          >
            {prepareAddress}
          </div>
        )
      }
      {
        changeLoading
        &&
        (
          <div 
            className="absolute inset-x-0 flex flex-row bottom-[44px] items-center justify-center p-4 text-xs gap-1"
          >
            <LoadingOutlined
              style={{
                fontSize: 10,
                color: '#1e293b',
              }}
              spin
              rev={undefined}
            />
            <p className="text-center">{messageReturn}</p>
          </div>
        )
      }
      {
        errorInput.status
        &&
        (
          <div 
            className="absolute w-full text-center bottom-[60px] text-red-500 font-semibold text-xs"
          >
            {errorInput.message}
          </div>
        )
      }
    </div>
  )
}

export default EventHandlerCard;