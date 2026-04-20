import { database } from "@/src";
import { Product } from "../../products/model/entity/Product";
import { Order } from "../model/entity/Order";

export const saveOrder = async (
  value: number,
  clientId: number,
): Promise<Order> => {
  const db = await database();
  if (!db) throw new Error("Erro on get Database");

  const generatedId = await db.runAsync(
    `INSERT INTO orders (value, client_id) VALUES (?, ?)`,
    [value, clientId],
  );

  const response = await db.getFirstAsync<Order>(
    `SELECT * FROM orders WHERE id = ?`,
    [generatedId.lastInsertRowId],
  );

  if (!response) throw new Error("Erro ao buscar pedido criado");

  return response;
};

export const getAllOrders = async (): Promise<Order[]> => {
  const db = await database();
  if (!db) throw new Error("Erro no DB");

  const orders = await db.getAllAsync<Order>(`SELECT * FROM orders`);
  return orders ?? [];
};

export const getOrderById = async (id: number): Promise<Order | null> => {
  const db = await database();
  if (!db) throw new Error("Erro no DB");

  const order = await db.getFirstAsync<Order>(
    `SELECT * FROM orders WHERE id = ?`,
    [id],
  );

  return order ?? null;
};

export const removeOrder = async (id: number): Promise<void> => {
  const db = await database();
  if (!db) throw new Error("Erro no DB");

  await db.runAsync(`DELETE FROM orders WHERE id = ?`, [id]);
};

export const updateOrder = async (
  id: number,
  value: number,
  products?: Product[],
): Promise<Order> => {
  const db = await database();
  if (!db) throw new Error("Erro no DB");

  const existing = await db.getFirstAsync<Order>(
    `SELECT * FROM orders WHERE id = ?`,
    [id],
  );

  if (!existing) throw new Error("Pedido não encontrado");

  // Atualiza valor inicial
  await db.runAsync(`UPDATE orders SET value = ? WHERE id = ?`, [value, id]);

  // Se vier produtos → atualiza relação
  if (products && products.length > 0) {
    // Remove antigos
    await db.runAsync(`DELETE FROM products_orders WHERE order_id = ?`, [id]);

    // Insere novos
    for (const product of products) {
      await db.runAsync(
        `INSERT INTO products_orders 
        (product_id, order_id, quantity, price_at_moment)
        VALUES (?, ?, ?, ?)`,
        [product.id, id, product.quantity, product.price],
      );
    }

    // Recalcula total
    await db.runAsync(
      `UPDATE orders SET value = (
        SELECT SUM(quantity * price_at_moment)
        FROM products_orders
        WHERE order_id = ?
      ) WHERE id = ?`,
      [id, id],
    );
  }

  const updated = await db.getFirstAsync<Order>(
    `SELECT * FROM orders WHERE id = ?`,
    [id],
  );

  if (!updated) throw new Error("Erro ao buscar pedido atualizado");

  return updated;
};
