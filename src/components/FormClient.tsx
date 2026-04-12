import { Pressable, Text, View } from "react-native";
import RegisterClientDTO from "../modules/clients/model/dto/RegisterClientDTO";
import { styleGlobal } from "../styles/styles";
import Input from "./Input";

type FormClientProps = {
  newClient: RegisterClientDTO;
  saveClient: () => void;
  setNewClient: (dto: RegisterClientDTO) => void;
};

export default function FormClient({
  newClient,
  saveClient,
  setNewClient,
}: FormClientProps) {
  return (
    <View style={styleGlobal.containerInputs}>
      <Input
        value={newClient.name}
        onChangeText={(value) => setNewClient({ ...newClient, name: value })}
        placeholder="Digite o nome do cliente..."
      />
      <Input
        value={newClient.email}
        onChangeText={(value) => setNewClient({ ...newClient, email: value })}
        placeholder="Digite o email do cliente..."
      />
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
