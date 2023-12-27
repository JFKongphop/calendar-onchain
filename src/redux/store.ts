import { configureStore } from '@reduxjs/toolkit'
import { useSelector as initialUseSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import rootReducer from './combineReducer'

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.NODE_ENV != 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = initialUseSelector;
export default store;