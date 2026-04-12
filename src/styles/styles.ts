import { StyleSheet } from "react-native";

export const styleGlobal = StyleSheet.create({
  containerItem: {
    width: "90%",
    backgroundColor: "#D9D9D9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    borderRadius: 10,
    minHeight: 200,
    rowGap: 20,
  },
  containerInputs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: 10,
    marginVertical: 20,
  },
  listItems: {
    rowGap: 20,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
