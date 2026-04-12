import { object, string } from "yup";

export const clientSchema = object({
  name: string().required("Nome é obrigatório."),
  email: string()
    .email("Formato do email é inválido.")
    .required("Email é obrigatório"),
});
