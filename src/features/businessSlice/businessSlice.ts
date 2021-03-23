import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getBusinesses } from "../../api/businessAPIs";
import { AppThunk, RootState } from "../../app/store";
import { BusinessInterface } from "../../types/types";
import { getErrorMessage } from "../../utils/errors";

interface BusinessState {
  businesses: BusinessInterface[] | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: BusinessState = {
  businesses: [],
  loading: false,
  error: null,
};

export const businessSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    getBusinessesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getBusinessesSuccess(state, action: PayloadAction<BusinessInterface[] | undefined>) {
      state.businesses = action.payload;
      state.loading = false;
      state.error = null;
    },
    getBusinessesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getBusinessesFailure, getBusinessesStart, getBusinessesSuccess } = businessSlice.actions;

// Async functions
export const fetchBusinesses = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getBusinessesStart());
    const localStorageBusinesses = localStorage.getItem("localStorageBusinesses");
    if (localStorageBusinesses) {
      dispatch(getBusinessesSuccess(JSON.parse(localStorageBusinesses) as BusinessInterface[]));
    }
    const businesses = await getBusinesses();
    dispatch(getBusinessesSuccess(businesses));
    localStorage.setItem("localStorageBusinesses", JSON.stringify(businesses));
  } catch (err) {
    dispatch(getBusinessesFailure(getErrorMessage(err)));
  }
};

// Selectors
export const businesses = (state: RootState) => state.business.businesses;
export const loading = (state: RootState) => state.business.loading;
export const error = (state: RootState) => state.business.error;

export default businessSlice.reducer;
