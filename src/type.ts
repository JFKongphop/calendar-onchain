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

export type CalendarHandler = 'edit title' | 'invite' | 'delete account';

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

export type ContractCalendarType = {
  addEventSchedule: (
    id: number, 
    start_event: number, 
    end_event: number, 
    store_index: number, 
    store_title: string, 
    title_event: string, 
    month_range: string
  ) => any;
  createEventStore: (title: string) => any
  deleteEventSchedule: (
    store_index: number, 
    event_id: number, 
    month_range: string
  ) => any;
  deleteEventScheduleMonth: (
    store_index: number, 
    month_range: string
  ) => any;
  editEventSchedule: (
    store_index: number, 
    event_id: number, 
    start_event: number, 
    end_event: number, 
    month_range: string, 
    title: string
  ) => any;
  editEventStoreTitle: (
    store_index: number, 
    new_store_title: string
  ) => any;
  getEventSchedule: (
    store_index: number, 
    month_range: string
  ) => any;
  getEventTitle: () => any
  getParticipationStore: (
    store_index: number, 
    store_title: string, 
    month_range: string
  ) => any;
  getParticipationTitle: () => any
  inviteParticipation: (
    store_index: number, 
    title: string, 
    invitation_account: string
  ) => any;
  leaveParticipationEvent: (
    store_index: number, 
    store_title: string
  ) => any;
  removeAccountParticipation: (
    store_index: number, 
    participationAccount: string
  ) => any;
  removeAllAccountParticipations: (store_index: number) => any
};