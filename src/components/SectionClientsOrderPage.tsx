import { Text, View } from "react-native";
import { Client } from "../modules/clients/model/entity/Client";
import SelectClient from "./SelectClient";

type SectionClientsOrderPageProps = {
  clients: Client[];
  selectedClientId: number;
  setSelectedClientId: (value: number) => void;
};

export default function SectionClientsOrderPage({
  clients,
  selectedClientId,
  setSelectedClientId,
}: SectionClientsOrderPageProps) {
  return (
    <>
      {clients.length === 0 ? (
        <View>
          <Text>Não há clientes cadastrados</Text>
        </View>
      ) : (
        <SelectClient
          clients={clients}
          selectedValue={selectedClientId!}
          setSelectedValue={setSelectedClientId}
        />
      )}
    </>
  );
}
