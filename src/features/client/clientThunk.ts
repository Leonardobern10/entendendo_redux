import RegisterClientDTO from "@/src/modules/clients/model/dto/RegisterClientDTO";
import UpdateClientDTO from "@/src/modules/clients/model/dto/UpdateClientDTO";
import {
  getAllClientsService,
  getClientByIdService,
  removeClientService,
  saveClientService,
  updateClientService,
} from "@/src/modules/clients/service/ClientService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveClientThunk = createAsyncThunk(
  "client/save",
  async (dto: RegisterClientDTO) => {
    return await saveClientService(dto);
  },
);

export const getAllClientThunk = createAsyncThunk("client/getAll", async () => {
  return await getAllClientsService();
});

export const getClientByIdThunk = createAsyncThunk(
  "client/getClientById",
  async (id: number) => {
    return await getClientByIdService(id);
  },
);

export const removeClientThunk = createAsyncThunk(
  "client/removeClient",
  async (id: number) => {
    return await removeClientService(id);
  },
);

export const updateClientThunk = createAsyncThunk(
  "client/update",
  async (dto: UpdateClientDTO) => {
    return await updateClientService(dto);
  },
);
