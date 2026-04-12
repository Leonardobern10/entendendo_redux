import RegisterClientDTO from "./RegisterClientDTO";

export default class UpdateClientDTO {
  public readonly id: string;
  public readonly newData: RegisterClientDTO;

  constructor(id: string, newData: RegisterClientDTO) {
    this.id = id;
    this.newData = newData;
  }
}
