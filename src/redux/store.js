import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import { apiSlice } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    user: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
