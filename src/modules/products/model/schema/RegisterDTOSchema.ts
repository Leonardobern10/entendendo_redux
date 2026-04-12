import { number, object, string } from "yup";
export const registerDTOSchema = object({
  name: string().required("Name is required.").nonNullable(),
  quantity: number().required("Quantity is required.").min(0).default(0),
  price: number().required("Quantity is required.").min(0.0).default(0.0),
});
