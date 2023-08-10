import { configureStore, combineReducers } from "@reduxjs/toolkit";
import locationMapViewSlice from '../Features/locationFeature/locationMapViewSlice'

const rootReducers = combineReducers({
  LocationMapView: locationMapViewSlice,
});

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;