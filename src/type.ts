import { Address } from "wagmi";
import type { 
  FieldValues, 
  UseFormRegister, 
  UseFormWatch,
  UseFormSetValue
} from "react-hook-form";

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

export type RegisterProps<T extends FieldValues> = unknown & UseFormRegister<T>;

export type SetValueProps<T extends FieldValues> = unknown & UseFormSetValue<T>;

export type ErrorInput = { 
  status: boolean; 
  message: string 
};

export type MonthEventParams = { 
  calendarIndex: string; 
  calendarTitle: string; 
  month: string 
};

export type DayEventParams = { 
  calendarIndex: string; 
  calendarTitle: string; 
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