import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    fontSize: 20,
    alignSelf: "flex-end",
    color: "rgba(91, 88, 88, 0.73)",
  },
});

type TextContent = {
  label: string;
  value: string | number;
};

export default function TextContent({ label, value }: TextContent) {
  return (
    <Text style={styles.container}>
      {label} {value}
    </Text>
  );
}
