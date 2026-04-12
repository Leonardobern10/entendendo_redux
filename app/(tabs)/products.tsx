import ProductItem from "@/src/components/ProductItem";
import { useProducts } from "@/src/hooks/useProducts";
import { Button, FlatList, StyleSheet, TextInput, View } from "react-native";

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#555",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000b2",
    paddingHorizontal: 10,
    color: "#FFF",
    width: "90%",
  },
  containerInputs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: 10,
    marginVertical: 20,
  },
});

export default function ProductsScreen() {
  const { products, newProduct, setNewProduct, createProduct, error } =
    useProducts();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerInputs}>
        <TextInput
          placeholderTextColor="#ffffff5e"
          style={styles.input}
          value={newProduct.name}
          onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
          placeholder="Insira o nome do produto..."
        />

        <TextInput
          placeholderTextColor="#ffffff5e"
          style={styles.input}
          keyboardType="numeric"
          value={newProduct.quantity}
          onChangeText={(value) =>
            setNewProduct({ ...newProduct, quantity: value })
          }
          placeholder="Insira a quantidade do produto..."
        />

        <TextInput
          placeholderTextColor="#ffffff5e"
          style={styles.input}
          keyboardType="decimal-pad"
          value={newProduct.price}
          onChangeText={(value) =>
            setNewProduct({
              ...newProduct,
              price: value,
            })
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
          <ProductItem
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
