import { object, string } from "yup";

export const registerClinetSchema = object({
  id: string().required("O campo [ID] é obrigatório"),
  name: string().required("O campo [NAME] é obrigatório"),
  email: string()
    .email("Formato inválido")
    .required("O campo [EMAIL] é obrigatório"),
});
