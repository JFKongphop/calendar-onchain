import { createSelector } from '@reduxjs/toolkit';
import type { IAllEventState, IRootState } from "../root-type";

export const allEventSelector: (state: IRootState) => IAllEventState = (
  state: IRootState
) => state.events;

export const allEventData = createSelector(allEventSelector, (events) => {
  return events.events;
})