import { StyleSheet, View } from "react-native";
import MainId from "./MainId";
import MainText from "./MainText";
import TextContent from "./TextContent";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});

type HeaderItemProps = {
  name: string;
  id: string | number;
  email?: string;
};

export default function HeaderItem({ name, id, email }: HeaderItemProps) {
  return (
    <View style={styles.container}>
      <MainId id={id} />
      <MainText name={name} />
      {email && <TextContent label="Email:" value={email} />}
    </View>
  );
}
