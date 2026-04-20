import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { Modal, Pressable, View } from "react-native";
import RegisterClientDTO from "../modules/clients/model/dto/RegisterClientDTO";
import { styleGlobal } from "../styles/styles";
import FormClient from "./FormClient";
import HeaderItem from "./HeaderItem";
import HorizontalLine from "./HorizontalLine";

type ClientItemProps = {
  id: number;
  name: string;
  email: string;
  remove: () => void;
  newClient: RegisterClientDTO;
  setNewClient: (dto: RegisterClientDTO) => void;
  updateClient: (id: number, dto: RegisterClientDTO) => void;
};

export default function ClientItem({
  id,
  name,
  email,
  remove,
  newClient,
  setNewClient,
  updateClient,
}: ClientItemProps) {
  const [modal, setModal] = useState(false);

  return (
    <View style={styleGlobal.containerItem}>
      <HeaderItem name={name} id={id} email={email} />
      <HorizontalLine />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          columnGap: 10,
          alignSelf: "flex-start",
        }}
      >
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
          saveClient={() =>
            updateClient(id, { name: newClient.name, email: newClient.email })
          }
        />
      </Modal>
    </View>
  );
}
