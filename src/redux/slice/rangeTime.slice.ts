import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface RangeTimeState {
  rangeTime: string
}

const startTime = dayjs().startOf('month').valueOf();
const endTime = dayjs().endOf('month').valueOf()
const initialRangeTimeState: RangeTimeState = {
  rangeTime: ''
}

const rangeTimeSlice = createSlice({
  name: 'range-time',
  initialState: initialRangeTimeState,
  reducers: {
    addRangeTime: (state, { payload }: PayloadAction<[number, number]>) => {
      state.rangeTime = `${payload[0]}-${payload[1]}`;
    }
  }
})

export const { addRangeTime } = rangeTimeSlice.actions;
export default rangeTimeSlice.reducer;