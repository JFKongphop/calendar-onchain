import { createSelector } from "@reduxjs/toolkit";
import type { IRangeTimeState, IRootState } from "../root-type";

export const rangeTimeSelector: (state: IRootState) => IRangeTimeState = (
  state: IRootState
) => state.rangeTime;

export const rangeTimeData = createSelector(rangeTimeSelector, (rangeTime) => {
  return rangeTime.rangeTime;
})