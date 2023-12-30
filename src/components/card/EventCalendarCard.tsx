import type { CalendarHandler, EventTitle } from '@/type';
import { FC } from 'react';
import CalendarEventHandlerDropdown from '@/components/dropdown/CalendarEventHandlerDropdown';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from '@/redux/store';
import { monthIndexData } from '@/redux/selector/monthIndex.selector';
import dayjs from 'dayjs';

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
  const navigate = useNavigate();
  const getCurrentCalerdarData = () => {
    onGetCurrentCalerdarData(calendarIndex, data);
  }

  const calendarNavigateHandler = () => {
    const currentMonth = dayjs().format('MMM').toLowerCase();
    const title = data.title.split(' ').map((word) => word[0] + word.slice(1)).join('-');
    navigate(`/calendar-event/${calendarIndex}/${title}/month/${currentMonth}`);
  }

  return (
    <div
      className="flex flex-col border-2 border-calendar-main-theme shadow-lg h-60 rounded-lg p-2 gap-2 font-bold"
      onClick={getCurrentCalerdarData}
    >
      <img
        src="https://images.unsplash.com/photo-1703209935484-34f5c826f1da?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="rounded-md w-full h-40 cursor-pointer"
        onClick={calendarNavigateHandler}
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