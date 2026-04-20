import { Text } from "react-native";

export default function MainText({ name }: { name: string }) {
  return (
    <Text style={{ fontSize: 25, fontWeight: 600, color: "#3B3939" }}>
      {name}
    </Text>
  );
}
