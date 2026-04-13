import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ValidationError } from "yup";
import {
  getAllClientThunk,
  removeClientThunk,
  saveClientThunk,
  updateClientThunk,
} from "../features/client/clientThunk";
import RegisterClientDTO from "../modules/clients/model/dto/RegisterClientDTO";
import UpdateClientDTO from "../modules/clients/model/dto/UpdateClientDTO";
import { clientSchema } from "../modules/clients/model/schema/clientSchema";
import { registerClinetSchema } from "../modules/clients/model/schema/registerClientSchema";
import { AppDispatch, RootState } from "../store/store";

export const useClients = () => {
  const [newClient, setNewClient] = useState<RegisterClientDTO>({
    name: "",
    email: "",
  });

  const { error, loading, clients } = useSelector(
    (state: RootState) => state.client,
  );
  const dispatch = useDispatch<AppDispatch>();

  const saveClient = async () => {
    try {
      const clientValidated = await clientSchema.validate(newClient);
      await dispatch(saveClientThunk(clientValidated));
      Alert.alert("SUCESSO", "Cliente cadastrado com sucesso!");
      setNewClient({ name: "", email: "" });
    } catch (error) {
      console.error(error);
      if (error instanceof ValidationError) {
        Alert.alert("ERROR", error.message);
      } else {
        Alert.alert("ERROR", "Erro ao cadastrar cliente.");
      }
    }
  };

  const removeClient = async (id: string) => {
    try {
      await dispatch(removeClientThunk(id));
      Alert.alert("SUCESSO", "Cliente removido com sucesso!");
    } catch (error) {
      console.error(error);
      Alert.alert("ERRO", "Erro ao remover cliente.");
    }
  };

  const updateClient = async (id: string, dto: RegisterClientDTO) => {
    try {
      const updateDto = new UpdateClientDTO(id, dto.name, dto.email);
      await registerClinetSchema.validate(updateDto);
      await dispatch(updateClientThunk(updateDto));
      setNewClient({ name: "", email: "" });
      Alert.alert("SUCESSO", "Cliente atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      if (error instanceof ValidationError) {
        Alert.alert("ERROR", error.message);
      } else {
        Alert.alert("ERROR", "Erro ao atualizar cliente.");
      }
    }
  };

  useEffect(() => {
    async function get() {
      await dispatch(getAllClientThunk());
    }
    get();
  }, []);

  return {
    newClient,
    setNewClient,
    error,
    loading,
    clients,
    saveClient,
    removeClient,
    updateClient,
  };
};
