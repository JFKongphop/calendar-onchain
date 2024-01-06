import { Fragment } from "react";

import Day from "@/components/calendar/Day";

import type { FC } from "react";
import type { Dayjs } from "dayjs";
import type { EventSchedule } from "@/type";


interface IMonth {
  month: Dayjs[][];
  eventSchedule: EventSchedule[];
}

const Month: FC<IMonth> = ({ 
  month,
  eventSchedule
}) => {
  return (
    <div className="border-none flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} eventSchedule={eventSchedule} />
          ))}
        </Fragment>
      ))}
    </div>
  );
}

export default Month;