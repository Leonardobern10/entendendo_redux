import { database } from "@/src";
import { Client } from "../model/entity/Client";

export const saveClient = async (
  name: string,
  email: string,
): Promise<Client> => {
  const db = await database();
  if (!db) throw new Error("Database not initialized!");
  const registered = await db?.runAsync(
    `INSERT INTO clients (name, email) VALUES (?, ?);`,
    [name, email],
  );
  console.log("Criado");
  const client = await db?.getFirstAsync<Client>(
    `SELECT * FROM clients WHERE id = ?`,
    [registered.lastInsertRowId],
  );

  if (!client) throw new Error("Error on get Client.");
  console.log("Cliente cadastrado com sucesso! ", client);
  return client;
};

export const getAllClients = async (): Promise<Client[]> => {
  const db = await database();
  const allClients = await db?.getAllAsync<Client>(`SELECT * FROM clients`);
  if (!allClients) throw new Error("Erro on get all clients.");
  return allClients;
};

export const getClientByID = async (id: string): Promise<Client> => {
  const db = await database();
  const client = await db?.getFirstAsync<Client>(
    `SELECT * FROM clients WHERE id = ?`,
    [id],
  );
  if (!client) throw new Error("Error on get client.");
  return client;
};

export const removeClient = async (id: string): Promise<void> => {
  const db = await database();
  await db?.runAsync(`DELETE FROM clients WHERE id = ?`, [id]);
};

export const updateClient = async (
  id: string,
  newName: string,
  newEmail: string,
): Promise<Client> => {
  const db = await database();
  if (!db) throw new Error("Error on connect database");
  const client = await db?.getFirstAsync<Client>(
    `SELECT * FROM clients WHERE id = ?`,
    [id],
  );

  if (!client) throw new Error("This client doesn't exists");
  await db.runAsync(
    `UPDATE clients SET name = ?, email = ?
    WHERE id = ?`,
    [newName, newEmail, id],
  );
  const result = await db.getFirstAsync<Client>(
    `SELECT * FROM clients WHERE id = ?`,
    [id],
  );
  if (!result) throw new Error("Error on get updated client");
  return result;
};
