import { useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductsToOrderThunk,
  createOrderThunk,
  getAllOrdersThunk,
  removeOrderThunk,
} from "../features/order/orderThunk";
import { AppDispatch, RootState } from "../store/store";

type OrderItemDTO = {
  productId: number;
  quantity: number;
};

export const useOrder = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { orders, loading, error } = useSelector(
    (state: RootState) => state.order,
  );

  // 🔹 Criar pedido
  const createOrder = async (clientId: number) => {
    try {
      const order = await dispatch(createOrderThunk(clientId)).unwrap();
      return order; // 👈 ESSENCIAL
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Buscar todos pedidos
  const fetchOrders = useCallback(async () => {
    try {
      await dispatch(getAllOrdersThunk()).unwrap();
    } catch (err) {
      console.error(err);
      Alert.alert("ERRO", "Erro ao buscar pedidos");
    }
  }, [dispatch]);

  // 🔹 Remover pedido
  const removeOrder = async (id: number) => {
    try {
      await dispatch(removeOrderThunk(id)).unwrap();
      Alert.alert("SUCESSO", "Pedido removido!");
    } catch (err) {
      console.error(err);
      Alert.alert("ERRO", "Erro ao remover pedido");
    }
  };

  // 🔹 Adicionar/atualizar produtos no pedido
  const addProducts = async (orderId: number, items: OrderItemDTO[]) => {
    try {
      await dispatch(addProductsToOrderThunk({ orderId, items })).unwrap();

      Alert.alert("SUCESSO", "Produtos atualizados no pedido!");
    } catch (err) {
      console.error(err);
      Alert.alert("ERRO", "Erro ao atualizar produtos do pedido");
    }
  };

  // 🔹 Carregar ao iniciar
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    createOrder,
    fetchOrders,
    removeOrder,
    addProducts,
  };
};
