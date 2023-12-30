import { Address } from "wagmi";
import type { 
  FieldValues, 
  UseFormRegister, 
  UseFormSetValue
} from "react-hook-form";
import { ShortMonth } from "./utils/shortMonthToNumber";

export type EventTitle = {
  title: string;
  parctitipationAmount: number;
  parctitipationAccount: Address[];
}

export type EventParticipationTitle = {
  title: string;
  calendarIndex: number;
  createdBy: Address;
}

export type CalendarHandler = 'edit name' | 'invite' | 'delete account';

export type TimeDurationHandler = 'edit' | 'remove';

export type RegisterProps<T extends FieldValues> = unknown & UseFormRegister<T>;

export type SetValueProps<T extends FieldValues> = unknown & UseFormSetValue<T>;

export type ErrorInput = { 
  status: boolean; 
  message: string 
};

export type EventParams = { 
  calendarIndex: string; 
  calendarTitle: string; 
  month: ShortMonth;
  date: string 
};

export type EventSchedule = {
  id: number;
  start_event: number;
  end_event: number;
  title: string;
}

export type EventStoreRetrived = {
  title: string;
  accounts: Address[];
  eventSchedules: EventSchedule[];
}