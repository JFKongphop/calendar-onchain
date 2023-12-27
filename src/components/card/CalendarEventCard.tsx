import type { FC, ReactNode } from 'react';

interface ICalendarEventCard {
  children: ReactNode;
  innerHeight: number;
}

const CalendarEventCard: FC<ICalendarEventCard> = ({ 
  children, 
  innerHeight 
}) => {
  return (
    <main
      className="flex w-full flex-col gap-2 relative border overflow-y-auto"
    >
      <div 
        className="flex flex-col"
        style={{ height: innerHeight }}
      >
        <div 
          className="w-full h-auto flex items-center flex-col justify-start"
        >
          <div className="flex flex-row w-full relative mt-3">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}

export default CalendarEventCard;