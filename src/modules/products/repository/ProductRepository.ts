import { database } from "@/src";
import { Product } from "../model/entity/Product";

export const createProduct = async (
  name: string,
  quantity: number,
  price: number,
): Promise<Product> => {
  const db = await database();
  const created = await db?.runAsync(
    `
        INSERT INTO products (name, quantity, price)
        VALUES (?, ?, ?)`,
    [name, quantity, price],
  );

  if (!created) throw Error("Error on save product.");

  const search = await db?.getFirstAsync<Product>(
    `SELECT * FROM products WHERE id = ?`,
    [created?.lastInsertRowId!],
  );

  if (!search) throw new Error("Error on get last product created.");

  return search;
};

export const removeProduct = async (id: number): Promise<void> => {
  const db = await database();
  db?.runAsync(
    `
        DELETE FROM products
        WHERE id = ?
        `,
    [id],
  );
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const db = await database();
  const product = await db?.getFirstAsync<Product>(
    `SELECT * FROM products
        WHERE id = ?`,
    [id],
  );
  if (!product) return null;
  return product;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const db = await database();
  const products = await db?.getAllAsync<Product>(`SELECT * FROM products`);
  if (!products) return [];
  else return products;
};
