import { View } from "react-native";
import { Product } from "../modules/products/model/entity/Product";
import { styleGlobal } from "../styles/styles";
import HeaderItem from "./HeaderItem";
import HorizontalLine from "./HorizontalLine";
import TextContent from "./TextContent";

export default function ProductItem({ id, name, quantity, price }: Product) {
  return (
    <View style={styleGlobal.containerItem}>
      <HeaderItem name={name} id={id} />
      <HorizontalLine />
      <View style={{ alignSelf: "flex-end" }}>
        <TextContent label="Quantidade:" value={quantity} />
        <TextContent label="Preço: R$" value={price.toFixed(2)} />
      </View>
    </View>
  );
}
