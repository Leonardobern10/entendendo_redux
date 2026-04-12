import { Client } from "@/src/modules/clients/model/entity/Client";
import { createSlice, SerializedError } from "@reduxjs/toolkit";
import {
  getAllClientThunk,
  getClientByIdThunk,
  removeClientThunk,
  saveClientThunk,
  updateClientThunk,
} from "./clientThunk";

type ClientInitialState = {
  loading: boolean;
  clients: Client[];
  error?: SerializedError;
};

const initialState: ClientInitialState = {
  loading: false,
  clients: [],
  error: undefined,
};

const clientSlice = createSlice({
  name: "client",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // SaveClient
      .addCase(saveClientThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveClientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(saveClientThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.clients.push(action.payload);
      })

      // GetAllClients
      .addCase(getAllClientThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllClientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getAllClientThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = [...action.payload];
      })

      // GetClientsById
      .addCase(getClientByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClientByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getClientByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = state.clients.filter(
          (el) => el.id === action.payload.id,
        );
      })

      //RemoverClients
      .addCase(removeClientThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeClientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(removeClientThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = state.clients.filter((el) => el.id !== action.meta.arg);
      })

      // UpdateClient
      .addCase(updateClientThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateClientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(updateClientThunk.fulfilled, (state, action) => {
        state.loading = false;
        const targetIndex = state.clients.findIndex(
          (el) => el.id === action.meta.arg.id,
        );
        state.clients = [
          ...state.clients,
          (state.clients[targetIndex] = action.payload),
        ];
      });
  },
});

export const ClientReducer = clientSlice.reducer;
