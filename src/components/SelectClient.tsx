import { Picker } from "@react-native-picker/picker";
import { Client } from "../modules/clients/model/entity/Client";

type SelectClientProps = {
  clients: Client[];
  selectedValue: number;
  setSelectedValue: (value: number) => void;
};

export default function SelectClient({
  clients,
  selectedValue,
  setSelectedValue,
}: SelectClientProps) {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={(itemValue) => setSelectedValue(itemValue)}
    >
      {clients.map((el) => (
        <Picker.Item label={el.name} value={el.id} key={el.id} />
      ))}
    </Picker>
  );
}
