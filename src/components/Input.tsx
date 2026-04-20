import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#555",
    paddingHorizontal: 10,
    color: "#6d6b6b",
    width: "80%",
  },
});

type InputProps = {
  keyboardType?: KeyboardTypeOptions;
  value: string;
  label?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export default function Input({
  value,
  label,
  onChangeText,
  keyboardType = "default",
  placeholder,
}: InputProps) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        columnGap: 20,
      }}
    >
      {label && (
        <Text style={{ fontWeight: 400, fontSize: 15 }}>{label}: </Text>
      )}
      <TextInput
        placeholderTextColor="#4d4d4d5e"
        style={styles.input}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
}
