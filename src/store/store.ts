import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { ClientReducer } from "../features/client/clientSlice";
import { ProductReducer } from "../features/product/productSlice";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    client: ClientReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
