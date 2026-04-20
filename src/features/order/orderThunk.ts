import { OrderItemDTO } from "@/src/modules/orders/model/dto/OrderItemDTO";
import { Order } from "@/src/modules/orders/model/entity/Order";
import {
  addProductsToOrderService,
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  removeOrderService,
} from "@/src/modules/orders/service/OrderService";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Criar pedido
export const createOrderThunk = createAsyncThunk(
  "order/create",
  async (clientId: number): Promise<Order> => {
    return await createOrderService(clientId);
  },
);

// Buscar todos pedidos
export const getAllOrdersThunk = createAsyncThunk(
  "order/getAll",
  async (): Promise<Order[]> => {
    return await getAllOrdersService();
  },
);

// Buscar pedido por ID
export const getOrderByIdThunk = createAsyncThunk(
  "order/getById",
  async (id: number): Promise<Order> => {
    return await getOrderByIdService(id);
  },
);

// Remover pedido
export const removeOrderThunk = createAsyncThunk(
  "order/remove",
  async (id: number): Promise<number> => {
    await removeOrderService(id);
    return id; // importante pra atualizar o state
  },
);

// Adicionar produtos ao pedido (ou atualizar)
export const addProductsToOrderThunk = createAsyncThunk(
  "order/addProducts",
  async (data: { orderId: number; items: OrderItemDTO[] }): Promise<Order> => {
    return await addProductsToOrderService(data.orderId, data.items);
  },
);
