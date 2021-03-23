import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import businessReducer from "../features/businessSlice/businessSlice";

export const store = configureStore({
  reducer: {
    business: businessReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
