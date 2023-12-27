import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface MonthIndexState {
  monthIndex: number;
}

const initialMonthIndexState: MonthIndexState = {
  monthIndex: dayjs().month()
}

const monthIndexSlice = createSlice({
  name: 'month-index',
  initialState: initialMonthIndexState,
  reducers: {
    addMonthIndexState: (state, { payload }: PayloadAction<number>) => {
      state.monthIndex = payload;
    }
  }
})

export const { addMonthIndexState } = monthIndexSlice.actions;
export default monthIndexSlice.reducer;