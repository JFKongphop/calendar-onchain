import type { CalendarHandler, EventTitle } from '@/type';
import { FC } from 'react';
import CalendarEventHandlerDropdown from '@/components/dropdown/CalendarEventHandlerDropdown';

interface IEventCalendarCard {
  data: EventTitle;
  calendarIndex: number;
  onGetCurrentCalerdarData: (calendarIndex: number, data: EventTitle) => void;
  onGetCalendarHandlerType: (type: CalendarHandler) => void;
  onToggleCalendarHandler: () => void;
}

const EventCalendarCard: FC<IEventCalendarCard> = ({
  data,
  calendarIndex,
  onGetCalendarHandlerType,
  onGetCurrentCalerdarData,
  onToggleCalendarHandler,
}) => {
  const getCurrentCalerdarData = () => {
    onGetCurrentCalerdarData(calendarIndex, data);
  }

  return (
    <div
      className="flex flex-col border-2 border-calendar-main-theme shadow-lg h-60 rounded-lg p-2 gap-2 font-bold"
      onClick={getCurrentCalerdarData}
    >
      <img
        src="https://images.unsplash.com/photo-1703209935484-34f5c826f1da?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="rounded-md w-full h-40"
      />
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between items-center">
          <p>{data.title}</p>
          <CalendarEventHandlerDropdown 
            onGetCalendarHandlerType={onGetCalendarHandlerType}
            onToggleCalendarHandlerModal={onToggleCalendarHandler}
          />
        </div>
        <div className="flex flex-row justify-between items-center">
          <p>Participations</p>
          <p className='pr-1.5'>{data.parctitipationAmount.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default EventCalendarCard;