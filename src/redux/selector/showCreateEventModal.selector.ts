import { createSelector } from '@reduxjs/toolkit';
import type { IShowCreateEventModal, IRootState } from "../root-type";

export const showCreateEventModalSelector: (state: IRootState) => IShowCreateEventModal = (
  state: IRootState
) => state.showCreateEventModal;

export const showCreateEventModalData = createSelector(showCreateEventModalSelector, (showCreateEventModal) => {
  return showCreateEventModal.showCreateEventModal;
})

