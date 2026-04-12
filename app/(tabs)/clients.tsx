import ClientItem from "@/src/components/ClientItem";
import FormClient from "@/src/components/FormClient";
import { useClients } from "@/src/hooks/useClient";
import { styleGlobal } from "@/src/styles/styles";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function ClientScreen() {
  const {
    newClient,
    setNewClient,
    clients,
    loading,
    error,
    saveClient,
    removeClient,
    updateClient,
  } = useClients();
  return (
    <View>
      <FormClient
        newClient={newClient}
        saveClient={saveClient}
        setNewClient={setNewClient}
      />
      <View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            contentContainerStyle={styleGlobal.listItems}
            data={clients}
            renderItem={({ item }) => (
              <ClientItem
                remove={() => removeClient(item.id)}
                id={item.id}
                name={item.name}
                email={item.email}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
}
