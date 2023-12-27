import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ShowCreateEventModalState {
  showCreateEventModal: boolean;
}

const initialShowCreateEventModalState: ShowCreateEventModalState = {
  showCreateEventModal: false
}

const showCreateEventModalSlice = createSlice({
  name: 'show-create-event-modal',
  initialState: initialShowCreateEventModalState,
  reducers: {
    toggleCreateEventModal: (state, { payload }: PayloadAction<boolean>) => {
      state.showCreateEventModal = payload;
    }
  }
})

export const { toggleCreateEventModal } = showCreateEventModalSlice.actions;
export default showCreateEventModalSlice.reducer;