import dayjs from 'dayjs';

import type { FC } from 'react';

interface IEventList {
  title: string;
  startTimestamp: number;
  endTimestamp: number;
}

const EventList: FC<IEventList> = ({
  title,
  startTimestamp,
  endTimestamp,
}) => {
  const convertUnixToHour = (time: number) => {
    return dayjs.unix(time / 1000).format('HH:mm');
  }

  const calculateTimeDuration = (
    start: number, 
    end: number,
  ) => {
    const startTimeStr = convertUnixToHour(start)
    const endTimeStr = convertUnixToHour(end)

    const startTimeParts = startTimeStr.split(":");
    const endTimeParts = endTimeStr.split(":");
  
    const startHours = parseInt(startTimeParts[0]);
    const startMinutes = parseInt(startTimeParts[1]);
    const endHours = parseInt(endTimeParts[0]);
    const endMinutes = parseInt(endTimeParts[1]);
  
    const startTimeMinutes = startHours * 60 + startMinutes;
    const endTimeMinutes = endHours * 60 + endMinutes;
  
    const timeDifferenceMinutes = endTimeMinutes - startTimeMinutes;
    const ratio = timeDifferenceMinutes / 60;
  
    return ratio;
  }

  const convertTimeToRatio = (time: number) => {
    const timeStr = convertUnixToHour(time)
    const timeParts = timeStr.split(":");
    
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    const timeMinutes = hours * 60 + minutes;
    const ratio = timeMinutes / 60;
  
    return ratio;
  }

  return (
    <div 
      style={{
        top: `${convertTimeToRatio(startTimestamp) * 60}px`,
        height: `${calculateTimeDuration(
          startTimestamp, 
          endTimestamp
        ) * 60}px`
      }}
      key={title}
      className={`absolute w-full flex justify-end`}
    >
      <div 
        className="w-[95%] bg-calendar-minor-theme flex justify-start items-center"
      >
        <p
          className="font-medium px-2 py-1 text-calendar-main-theme"
        >
          {title} ({convertUnixToHour(startTimestamp)} - {convertUnixToHour(endTimestamp)})
        </p>                        
      </div>
    </div>
  )
}

export default EventList