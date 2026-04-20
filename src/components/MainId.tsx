import { Text } from "react-native";

export default function MainId({ id }: { id: string | number }) {
  return <Text style={{ fontSize: 15, color: "#959595" }}>#{id}</Text>;
}
