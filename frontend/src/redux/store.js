import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart-slice";
import authApi from "./features/auth-api-slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
