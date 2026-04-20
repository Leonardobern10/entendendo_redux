import { Pressable, StyleSheet, Text, View } from "react-native";
import RegisterClientDTO from "../modules/clients/model/dto/RegisterClientDTO";
import { styleGlobal } from "../styles/styles";
import Input from "./Input";

type FormClientProps = {
  newClient: RegisterClientDTO;
  saveClient: () => void;
  setNewClient: (dto: RegisterClientDTO) => void;
};

const styles = StyleSheet.create({
  labelForm: {
    fontSize: 25,
    fontWeight: 700,
  },
});

export default function FormClient({
  newClient,
  saveClient,
  setNewClient,
}: FormClientProps) {
  return (
    <View style={styleGlobal.containerInputs}>
      <Text style={styles.labelForm}>Cadastro</Text>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          rowGap: 10,
        }}
      >
        <Input
          label="Nome"
          value={newClient.name}
          onChangeText={(value) => setNewClient({ ...newClient, name: value })}
          placeholder="Digite o nome do cliente..."
        />
        <Input
          label="E-mail"
          value={newClient.email}
          onChangeText={(value) => setNewClient({ ...newClient, email: value })}
          placeholder="Digite o email do cliente..."
        />
      </View>
      <Pressable
        style={({ pressed }) => [
          {
            paddingHorizontal: 14,
            paddingVertical: 10,
            backgroundColor: pressed ? "#7a7979" : "#2e2d2d",
            borderRadius: 10,
          },
        ]}
        onPress={saveClient}
      >
        <Text
          style={{
            color: "#d9d9d9",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          Cadastrar
        </Text>
      </Pressable>
    </View>
  );
}
