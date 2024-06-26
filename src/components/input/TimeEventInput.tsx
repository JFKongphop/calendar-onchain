import { Controller } from 'react-hook-form';
import { RxDotFilled } from 'react-icons/rx';

import TimeRatioSelectorDropdown from '@/components/dropdown/TimeRatioSelectorDropdown';

import type { ChangeEvent, FC } from 'react';
import type { Control } from 'react-hook-form';
import type { IMeetEvent, TimeInputValue, TimeRatio } from '@/components/calendar/type/type';


interface ITimeEventInput {
  title: string;
  control: Control<IMeetEvent>
  name: TimeInputValue;
  timeRatioSelected: TimeRatio;
  onRatioSelector: (time: TimeRatio) => void;
}

const TimeEventInput: FC<ITimeEventInput> = ({
  title,
  control,
  name,
  timeRatioSelected,
  onRatioSelector,
}) => {

  const timeEventChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (!/^[0-9]*$/.test(inputValue) || inputValue.length > 2) {      
      event.target.value = inputValue.slice(0, 2);
    }

    if (Number(inputValue) > 23 || Number(inputValue) < 0) {
      event.target.value = '0';
    }

    if (!/^[0-9]*$/.test(inputValue)) {
      event.target.value = '0';
    }
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <p className="font-bold">{title}</p>
      <div className="flex flex-row gap-2 relative">
        <div className="flex flex-row">
          <div 
            className="w-12 h-8 border-2 border-calendar-main-theme rounded-md flex justify-center items-center cursor-pointer font-semibold"
          >
            <Controller
              name={name}
              control={control}
              rules={{
                required: 'This field is required',
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  onChange={(event) => {
                    timeEventChange(event);
                    field.onChange(event);
                  }}
                  className="w-12 bg-transparent h-7 rounded-md border-none focus:border-none ring-0 focus:ring-0 text-center focus:outline-none"
                />
              )}
            />
          </div>
          <div 
            className="flex flex-col text-calendar-main-theme"
          >
            <RxDotFilled/>
            <RxDotFilled/>
          </div>
          <TimeRatioSelectorDropdown 
            timeRatioSelected={timeRatioSelected}
            onRatioSelector={onRatioSelector}
          />
        </div>
      </div>
    </div>
  )
}

export default TimeEventInput;