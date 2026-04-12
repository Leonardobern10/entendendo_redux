import { StyleSheet, View } from "react-native";
import MainId from "./MainId";
import MainText from "./MainText";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});

type HeaderItemProps = {
  name: string;
  id: string | number;
};

export default function HeaderItem({ name, id }: HeaderItemProps) {
  return (
    <View style={styles.container}>
      <MainText name={name} />
      <MainId id={id} />
    </View>
  );
}
