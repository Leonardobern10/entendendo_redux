import { Text } from "react-native";

export default function MainId({ id }: { id: string | number }) {
  return <Text style={{ fontSize: 35, color: "#bbbbbb" }}>#{id}</Text>;
}
