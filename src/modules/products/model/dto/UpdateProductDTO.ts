import { RegisterProductDTO } from "./RegisterProductDTO";

export type UpdateProductDTO = {
  id: number;
  newData: RegisterProductDTO;
};
