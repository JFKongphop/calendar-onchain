import { createSelector } from "@reduxjs/toolkit";
import type { IMonthIndexState, IRootState } from "../root-type";

export const monthIndexSelector: (state: IRootState) => IMonthIndexState = (
  state: IRootState
) => state.monthIndex;

export const monthIndexData = createSelector(monthIndexSelector, (monthIndex) =>{ return monthIndex.monthIndex; 
});