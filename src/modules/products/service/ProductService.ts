import { RegisterProductDTO } from "../model/dto/RegisterProductDTO";
import { Product } from "../model/entity/Product";
import { registerDTOSchema } from "../model/schema/RegisterDTOSchema";
import {
  createProduct,
  getAllProducts,
  getProductById,
  removeProduct,
} from "../repository/ProductRepository";

export const createProductService = async (
  dto: RegisterProductDTO,
): Promise<Product> => {
  const validDto = await registerDTOSchema.validate(dto);
  return await createProduct(validDto.name, validDto.quantity, validDto.price);
};

export const removerProductService = async (id: number) => {
  const product = await getProductById(id);
  if (!product) throw new Error("Product not found.");
  await removeProduct(id);
};

export const allProductsService = async () => {
  return await getAllProducts();
};

export const getProductsByIdService = async (id: number) => {
  const product = await getProductById(id);
  if (!product) throw new Error("Product not found");
  return product;
};
