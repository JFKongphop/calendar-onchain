import dayjs from 'dayjs';

import { useState, type FC } from 'react';
import CalendarEventHandlerDropdown from '../dropdown/CalendarEventHandlerDropdown';
import TimeDurationHandlerDropdown from '../dropdown/TimeDurationHandlerDropdown';
import { EventSchedule, TimeDurationHandler } from '@/type';
import CalendarEventScheduleHandlerModal from '../modal/CalendarEventScheduleHandlerModal';

interface IEventList {
  eventSchedule: EventSchedule;
  onHandlerSuccess: (hash: string) => void;
}

const EventList: FC<IEventList> = ({
  eventSchedule,
  onHandlerSuccess,
}) => {
  const [showConsoleTimeDuration, setShowConsoleTimeDuration] = useState<boolean>(false);
  const [timeDurationHandlerType, settimeDurationHandlerType] = useState<TimeDurationHandler>('edit');

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

  const openConsoleTimeDuration = () => {
    setShowConsoleTimeDuration(true);
  }

  const closeConsoleTimeDuration = () => {
    setShowConsoleTimeDuration(false);
  }

  const getTimeDurationHandlerType = (type: TimeDurationHandler) => {
    settimeDurationHandlerType(type);
  }  

  return (
    <div 
      style={{
        top: `${convertTimeToRatio(eventSchedule.start_event) * 60}px`,
        height: `${calculateTimeDuration(
          eventSchedule.start_event, 
          eventSchedule.end_event
        ) * 60}px`
      }}
      className={`absolute w-full flex justify-end`}
    >
      <CalendarEventScheduleHandlerModal
        eventScheduleData={eventSchedule}
        type={timeDurationHandlerType}
        showModal={showConsoleTimeDuration}
        onCloseModal={closeConsoleTimeDuration}
        onHandlerSuccess={onHandlerSuccess}
      />
      <div 
        className="w-[95%] bg-calendar-minor-theme flex justify-start items-center"
      >
        <div className=" absolute top-2 right-0 flex flex-row items-center gap-2">
          <TimeDurationHandlerDropdown 
            onGetTimeDurationHandlerType={getTimeDurationHandlerType}
            onToggleConsoleTimeDuration={openConsoleTimeDuration}
          />
        </div>
        <p
          className="font-medium px-2 py-1 text-calendar-main-theme"
        >
          {eventSchedule.title} ({convertUnixToHour(eventSchedule.start_event)} - {convertUnixToHour(eventSchedule.end_event)})
        </p>                        
      </div>
    </div>
  )
}

export default EventList