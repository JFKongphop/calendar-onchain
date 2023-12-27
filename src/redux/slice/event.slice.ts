import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CalendarEvent } from "@/components/calendar/type/type";

interface AllEventState {
  events: CalendarEvent[],
}

const initialAllEventState: AllEventState = {
  events: [],
}

const eventSlice = createSlice({
  name: 'all-events',
  initialState: initialAllEventState,
  reducers: {
    addAllEventState: (state, { payload }: PayloadAction<CalendarEvent[]>) => {
      state.events = payload;
    }
  }
})

export const { addAllEventState } = eventSlice.actions;
export default eventSlice.reducer;