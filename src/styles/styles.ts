import { StyleSheet } from "react-native";

export const styleGlobal = StyleSheet.create({
  containerItem: {
    width: "100%",
    minWidth: 300,
    backgroundColor: "#D9D9D9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 10,
    minHeight: 200,
    rowGap: 20,
  },
  containerInputs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: 30,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#d9d9d9",
    padding: 20,
  },
  listItems: {
    rowGap: 20,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
