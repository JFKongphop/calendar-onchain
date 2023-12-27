import { LoadingOutlined } from '@ant-design/icons'
import React, { FC, useCallback, useState } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { IEditTile } from '../modal/CalendarEventHandlerModal'
import { CalendarHandler, ErrorInput } from '@/type'
import CreateEventButton from '@/components/button/CreateEventButton'
import { Address } from 'viem'
import AddressCard from './AddressCard'

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
        {type === 'edit name' && 'Edit name'}
        {(type === 'invite' || type === 'delete account') && 'Address'}
      </label>
      {
        (type === 'edit name' || type === 'invite')
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
    </div>
  )
}

export default EventHandlerCard;