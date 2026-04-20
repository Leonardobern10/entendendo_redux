import { database } from "@/src";
import { Product } from "../../products/model/entity/Product";
import { OrderItemDTO } from "../model/dto/OrderItemDTO";
import { Order } from "../model/entity/Order";
import {
  getAllOrders,
  getOrderById,
  removeOrder,
  saveOrder,
} from "../repository/OrderRepository";

export const createOrderService = async (clientId: number): Promise<Order> => {
  if (!clientId) throw new Error("ClientId é obrigatório");

  // Pedido começa com valor 0
  return await saveOrder(0, clientId);
};

export const getAllOrdersService = async (): Promise<Order[]> => {
  return await getAllOrders();
};

export const getOrderByIdService = async (id: number): Promise<Order> => {
  const order = await getOrderById(id);

  if (!order) throw new Error("Pedido não encontrado");

  return order;
};

export const removeOrderService = async (id: number): Promise<void> => {
  const order = await getOrderById(id);

  if (!order) throw new Error("Pedido não existe");

  await removeOrder(id);
};

export const addProductsToOrderService = async (
  orderId: number,
  items: OrderItemDTO[],
): Promise<Order> => {
  const db = await database();
  if (!db) throw new Error("Erro no DB");

  const order = await getOrderById(orderId);
  if (!order) throw new Error("Pedido não encontrado");

  if (!items || items.length === 0)
    throw new Error("Itens do pedido são obrigatórios");

  // Remove itens antigos (regra simples)
  await db.runAsync(`DELETE FROM products_orders WHERE order_id = ?`, [
    orderId,
  ]);

  for (const item of items) {
    if (item.quantity <= 0) throw new Error("Quantidade inválida");

    const product = await db.getFirstAsync<Product>(
      `SELECT * FROM products WHERE id = ?`,
      [item.productId],
    );

    if (!product) throw new Error("Produto não encontrado");

    await db.runAsync(
      `INSERT INTO products_orders 
      (product_id, order_id, quantity, price_at_moment)
      VALUES (?, ?, ?, ?)`,
      [product.id, orderId, item.quantity, product.price],
    );
  }

  // Recalcula total
  await db.runAsync(
    `UPDATE orders SET value = (
      SELECT SUM(quantity * price_at_moment)
      FROM products_orders
      WHERE order_id = ?
    ) WHERE id = ?`,
    [orderId, orderId],
  );

  const updated = await getOrderById(orderId);
  if (!updated) throw new Error("Erro ao atualizar pedido");

  return updated;
};

export const updateOrderService = async (
  id: number,
  items: OrderItemDTO[],
): Promise<Order> => {
  return await addProductsToOrderService(id, items);
};
