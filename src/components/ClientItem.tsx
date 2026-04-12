import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { Modal, Pressable, View } from "react-native";
import { useClients } from "../hooks/useClient";
import { styleGlobal } from "../styles/styles";
import FormClient from "./FormClient";
import HeaderItem from "./HeaderItem";
import HorizontalLine from "./HorizontalLine";
import TextContent from "./TextContent";

type ClientItemProps = {
  id: string;
  name: string;
  email: string;
  remove: () => void;
};

export default function ClientItem({
  id,
  name,
  email,
  remove,
}: ClientItemProps) {
  const [modal, setModal] = useState(false);
  const { newClient, setNewClient, updateClient } = useClients();

  return (
    <View style={styleGlobal.containerItem}>
      <HeaderItem name={name} id={id} />
      <HorizontalLine />
      <View style={{ alignSelf: "flex-end" }}>
        <TextContent label="Email:" value={email} />
      </View>
      <View>
        <Pressable onPress={remove}>
          <FontAwesome name="trash-o" size={24} color="#555" />
        </Pressable>
        <Pressable onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={24} color="#555" />
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        visible={modal}
        onRequestClose={() => setModal(!modal)}
        backdropColor="#212121d5"
        style={{}}
      >
        <FormClient
          newClient={newClient}
          setNewClient={setNewClient}
          saveClient={() => updateClient(id, { name, email })}
        />
      </Modal>
    </View>
  );
}
