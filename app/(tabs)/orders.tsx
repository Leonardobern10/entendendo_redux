import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import HorizontalLine from "@/src/components/HorizontalLine";
import SectionClientsOrderPage from "@/src/components/SectionClientsOrderPage";
import SectionOrderPage from "@/src/components/SectionOrderPage";
import { useClients } from "@/src/hooks/useClient";
import { useOrder } from "@/src/hooks/useOrder";
import { useProducts } from "@/src/hooks/useProducts";
import { useState } from "react";

export default function OrderScreen() {
  const { orders, loading, createOrder, addProducts } = useOrder();

  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  // 🔥 CARRINHO LOCAL (ESSENCIAL)
  const [cart, setCart] = useState<
    { productId: number; quantity: number; name: string }[]
  >([]);

  const { clients } = useClients();
  const { products } = useProducts();

  // ✅ ADD PRODUTO
  const addToCart = (product: any) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.productId === product.id);

      if (exists) {
        return prev.map((p) =>
          p.productId === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          quantity: 1,
          name: product.name,
        },
      ];
    });
  };

  // ✅ REMOVE PRODUTO
  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((p) => p.productId !== productId));
  };

  // ✅ CRIAR PEDIDO (CORRETO)
  const handleCreateOrder = async () => {
    if (!selectedClientId || cart.length === 0) return;

    const order = await createOrder(selectedClientId);

    if (!order) return;

    await addProducts(order.id, cart);

    setCart([]);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* CLIENTES */}
      <SectionOrderPage title="Selecione o cliente">
        <SectionClientsOrderPage
          clients={clients}
          selectedClientId={selectedClientId!}
          setSelectedClientId={setSelectedClientId}
        />
      </SectionOrderPage>

      <SectionOrderPage title="Selecione os produtos">
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => addToCart(item)}>
              <Text>
                {item.name} | x{item.quantity}
              </Text>
            </Pressable>
          )}
        />
      </SectionOrderPage>

      <HorizontalLine />

      <SectionOrderPage title="Carrinho">
        {cart.length === 0 ? (
          <View>
            <Text>Não há itens no carrinho.</Text>
          </View>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.productId.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>
                  {item.name} x{item.quantity}
                </Text>

                <Pressable onPress={() => removeFromCart(item.productId)}>
                  <Text>Remover</Text>
                </Pressable>
              </View>
            )}
          />
        )}
      </SectionOrderPage>

      {/* BOTÃO */}
      <Button
        onPress={handleCreateOrder}
        title="Criar pedido"
        disabled={cart.length === 0 || clients.length === 0}
      />

      {/* PEDIDOS */}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text>
              Pedido #{item.id} - R$ {item.value}
            </Text>
          )}
        />
      )}
    </View>
  );
}
