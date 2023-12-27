import type { CalendarEvent } from "@/components/calendar/type/type";
import { Dayjs } from "dayjs";

export interface IRootState {
  events: IAllEventState;
  monthIndex: IMonthIndexState;
  rangeTime: IRangeTimeState;
  daySelected: IDaySelectedState;
  showCreateEventModal: IShowCreateEventModal;
}

/* --- ADD EVENT --- */
export interface IAllEventState {
  events: CalendarEvent[];
}

/* --- ADD MONTH INDEX --- */
export interface IMonthIndexState {
  monthIndex: number;
}

/* --- ADD RANGE TIME --- */
export interface IRangeTimeState {
  rangeTime: [number, number];
}

/* --- ADD DAY SELECTED --- */
export interface IDaySelectedState {
  daySelected: Dayjs;
}

/* --- TOGGLE CREATE EVENT MODAL --- */
export interface IShowCreateEventModal {
  showCreateEventModal: boolean;
}