import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart-slice";
import authApi from "./features/auth-api-slice";
import authReducer from "./features/auth-slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
