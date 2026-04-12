import { RegisterProductDTO } from "@/src/modules/products/model/dto/RegisterProductDTO";
import { Product } from "@/src/modules/products/model/entity/Product";
import {
  allProductsService,
  createProductService,
  getProductsByIdService,
  removerProductService,
} from "@/src/modules/products/service/ProductService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createProductThunk = createAsyncThunk(
  "product/create",
  async (dto: RegisterProductDTO): Promise<Product> => {
    return await createProductService(dto);
  },
);

export const removeProductThunk = createAsyncThunk(
  "product/remove",
  async (id: number) => {
    await removerProductService(id);
  },
);

export const getAllProductsThunk = createAsyncThunk(
  "products/getAll",
  async () => {
    return await allProductsService();
  },
);

export const getProductsByIdThunk = createAsyncThunk(
  "product/getById",
  async (id: number) => {
    return await getProductsByIdService(id);
  },
);
