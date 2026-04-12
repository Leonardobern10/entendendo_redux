import { Product } from "@/src/modules/products/model/entity/Product";
import { createSlice, SerializedError } from "@reduxjs/toolkit";
import {
  createProductThunk,
  getAllProductsThunk,
  getProductsByIdThunk,
} from "./productThunk";

type InitialStateType = {
  products: Product[];
  loading: boolean;
  error?: SerializedError | undefined;
};

const initialState: InitialStateType = {
  products: [],
  loading: false,
  error: undefined,
};

const productSlice = createSlice({
  name: "product",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.loading = false;
        console.error(action.error);
        state.error = action.error;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })

      .addCase(getAllProductsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        console.error(action.error);
      })
      .addCase(getAllProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [...action.payload];
      })

      .addCase(getProductsByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        console.error(action.error);
      })
      .addCase(getProductsByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (el) => el.id === action.payload.id,
        );
      });
  },
});

export const ProductReducer = productSlice.reducer;
