import RegisterClientDTO from "../model/dto/RegisterClientDTO";
import UpdateClientDTO from "../model/dto/UpdateClientDTO";
import { Client } from "../model/entity/Client";
import {
  getAllClients,
  getClientByID,
  removeClient,
  saveClient,
  updateClient,
} from "../repository/ClientRepository";

export const saveClientService = async (
  dto: RegisterClientDTO,
): Promise<Client> => {
  if (typeof dto.name !== "string" || dto.name.trim().length === 0)
    throw new Error("Name is invalid");

  if (typeof dto.email !== "string" || dto.email.trim().length === 0)
    throw new Error("Email is invalid");

  return await saveClient(dto.name.trim(), dto.email.trim());
};

export const getAllClientsService = async (): Promise<Client[]> => {
  return await getAllClients();
};

export const getClientByIdService = async (id: number): Promise<Client> => {
  return await getClientByID(id);
};

export const removeClientService = async (id: number): Promise<void> => {
  return await removeClient(id);
};

export const updateClientService = async (
  dto: UpdateClientDTO,
): Promise<Client> => {
  return await updateClient(dto.id, dto.name, dto.email);
};
