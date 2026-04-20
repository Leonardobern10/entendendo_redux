import Input from "@/src/components/Input";
import ProductItem from "@/src/components/ProductItem";
import { useProducts } from "@/src/hooks/useProducts";
import { styleGlobal } from "@/src/styles/styles";
import { useRouter } from "expo-router";
import { Button, FlatList, Pressable, View } from "react-native";

export default function ProductsScreen() {
  const { products, newProduct, setNewProduct, createProduct } = useProducts();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <View style={styleGlobal.containerInputs}>
        <Input
          label="Nome"
          value={newProduct.name}
          onChangeText={(value) =>
            setNewProduct({ ...newProduct, name: value })
          }
          placeholder="Insira o nome do produto..."
        />

        <Input
          label="Quantidade"
          value={newProduct.quantity}
          onChangeText={(value) =>
            setNewProduct({ ...newProduct, quantity: value })
          }
          placeholder="Insira a quantidade do produto..."
        />

        <Input
          label="Preço"
          value={newProduct.price}
          onChangeText={(value) =>
            setNewProduct({ ...newProduct, price: value })
          }
          placeholder="Insira o preço do produto..."
        />
        <Button title="Cadastrar" onPress={createProduct} />
      </View>
      <View
        style={{
          width: "100%",
          borderColor: "#c2c2c278",
          borderWidth: 2,
          marginVertical: 20,
        }}
      />
      <FlatList
        data={products}
        style={{ flex: 1, height: "100%", marginBottom: 10 }}
        contentContainerStyle={{
          rowGap: 20,
          paddingVertical: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/products/${item.id}`)}>
            <ProductItem
              id={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
            />
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
