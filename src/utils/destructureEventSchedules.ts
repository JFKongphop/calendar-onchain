import { EventSchedule } from "@/type";

export const destructureEventSchedules = async (data: any): Promise<EventSchedule[]> => {
  const eventSchedules: EventSchedule[] = await data[2].map((event: any) => ({
    id: Number(event[0]),
    start_event: Number(event[1]),
    end_event: Number(event[2]),
    title: event[3],
  }));

  return eventSchedules;
}