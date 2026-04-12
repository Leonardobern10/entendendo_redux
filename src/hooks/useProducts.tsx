import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductThunk,
  getAllProductsThunk,
} from "../features/product/productThunk";
import { RegisterProductDTO } from "../modules/products/model/dto/RegisterProductDTO";
import { UIProductDTO } from "../modules/products/model/dto/UIProductDTO";
import { registerDTOSchema } from "../modules/products/model/schema/RegisterDTOSchema";
import { AppDispatch, RootState } from "../store/store";

export const useProducts = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const error = useSelector((state: RootState) => state.product.error);
  const dispatch = useDispatch<AppDispatch>();
  const [newProduct, setNewProduct] = useState<UIProductDTO>({
    name: "",
    quantity: "",
    price: "",
  });

  const createProduct = async () => {
    const register = new RegisterProductDTO(
      newProduct.name,
      Number(newProduct.quantity),
      Number(newProduct.price),
    );
    const validated = await registerDTOSchema.validate(register);
    await dispatch(createProductThunk(validated));
    setNewProduct({ name: "", quantity: "", price: "" });
    dispatch(getAllProductsThunk());
  };

  useEffect(() => {
    dispatch(getAllProductsThunk());
    setNewProduct({ name: "", quantity: "", price: "" });
  }, []);

  return { products, newProduct, setNewProduct, createProduct, error };
};
