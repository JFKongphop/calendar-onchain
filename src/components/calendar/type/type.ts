import { StateEvents } from '@/context/ContextWrapper';
import { useForm } from 'react-hook-form';

export type DaySelected = {
  format(arg0: string): unknown;
  $D: number;
  $H: number;
  $L: string;
  $M: number;
  $W: number;
  $d: string;
  $m: number;
  $ms: number;
  $s: number; 
  $u: undefined | number | string;
  $x: undefined | number | string;
  $y: number;
}

export type Label = {
  label: string, 
  checked: boolean
}

export type DayTime = 'AM' | 'PM';

export type TimeRatio = '00' | '15' | '30' | '45';

export type HourTime = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';


export type AllowSelector = DayTime | TimeRatio | HourTime;

export interface IMeetEvent {
  title: string;
  startHour: string;
  endHour: string;
}

export type TimeInputValue = 'startHour' | 'endHour';

export type CalendarDetail = {
  monthIndex: number,
  daySelected: DaySelected,
  showEventModal: boolean,
  savedEvents: StateEvents[],
  filteredEvents: StateEvents[],
  showCreateMeet: boolean,
}

export type RangeDay = 'Today' | 'Month';

export type CalendarEvent = {
  title: string;
  id: number;
  start_event: number;
  end_event: number;
} 