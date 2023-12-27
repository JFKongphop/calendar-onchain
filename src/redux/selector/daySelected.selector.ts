import { createSelector } from '@reduxjs/toolkit';
import type { IDaySelectedState, IRootState } from "../root-type";

export const daySelectedSelector: (state: IRootState) => IDaySelectedState = (
  state: IRootState
) => state.daySelected;

export const daySelectedData = createSelector(daySelectedSelector, (daySelected) => {
  return daySelected.daySelected;
})