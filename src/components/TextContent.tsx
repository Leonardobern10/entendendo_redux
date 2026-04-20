import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    fontSize: 15,
    alignSelf: "flex-end",
    color: "rgba(91, 88, 88, 0.73)",
  },
});

type TextContentProps = {
  label: string;
  value: string | number;
};

export default function TextContent({ label, value }: TextContentProps) {
  return (
    <Text style={styles.container}>
      {label} {value}
    </Text>
  );
}
