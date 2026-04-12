import { KeyboardTypeOptions, StyleSheet, TextInput } from "react-native";

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
});

type InputProps = {
  keyboardType?: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export default function Input({
  value,
  onChangeText,
  keyboardType = "default",
  placeholder,
}: InputProps) {
  return (
    <TextInput
      placeholderTextColor="#ffffff5e"
      style={styles.input}
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
}
