import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";

interface DaySelectedState {
  daySelected: Dayjs,
}

const initialDaySelectedState: DaySelectedState = {
  daySelected: dayjs(),
}

const daySelectedSlice = createSlice({
  name: 'day-selected',
  initialState: initialDaySelectedState,
  reducers: {
    addDaySelected: (state, { payload }: PayloadAction<Dayjs>) => {
      state.daySelected = payload;
    }
  }
})

export const { addDaySelected } = daySelectedSlice.actions;
export default daySelectedSlice.reducer;