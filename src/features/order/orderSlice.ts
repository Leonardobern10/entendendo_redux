import { Order } from "@/src/modules/orders/model/entity/Order";
import { createSlice, SerializedError } from "@reduxjs/toolkit";
import {
  addProductsToOrderThunk,
  createOrderThunk,
  getAllOrdersThunk,
  getOrderByIdThunk,
  removeOrderThunk,
} from "./orderThunk";

type OrderState = {
  orders: Order[];
  loading: boolean;
  error?: SerializedError;
};

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: undefined,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔹 CREATE
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })

      // 🔹 GET ALL
      .addCase(getAllOrdersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getAllOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      // 🔹 GET BY ID
      .addCase(getOrderByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.orders.findIndex((o) => o.id === action.payload.id);

        if (index !== -1) {
          state.orders[index] = action.payload;
        } else {
          state.orders.push(action.payload);
        }
      })

      // 🔹 REMOVE
      .addCase(removeOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(removeOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter((o) => o.id !== action.payload);
      })

      // 🔹 ADD / UPDATE PRODUCTS IN ORDER
      .addCase(addProductsToOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductsToOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(addProductsToOrderThunk.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.orders.findIndex((o) => o.id === action.payload.id);

        if (index !== -1) {
          state.orders[index] = action.payload;
        } else {
          state.orders.push(action.payload);
        }
      });
  },
});

export const OrderReducer = orderSlice.reducer;
