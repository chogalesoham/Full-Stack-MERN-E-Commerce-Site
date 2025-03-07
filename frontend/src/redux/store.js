import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart-slice";
import authApi from "./features/auth-api-slice";
import authReducer from "./features/auth-slice";
import productApi from "./features/products-slice";
import reviewApi from "./features/reviews-slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      reviewApi.middleware
    ),
});
