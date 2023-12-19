import { productsManager } from "../daos/MongoDB/productsManager.mongo.js";

export const findAll = () => {
  const productModific = productsManager.findAll();
  return productModific;
};

export const findById = (id) => {
  const productModific = productsManager.findById(id);
  return productModific;
};

export const createOne = (obj) => {
  const productModific = productsManager.createOne(obj);
  return productModific;
};

export const deleteOneProduct = (idCart, idProduct) => {
  const productModific = productsManager.deleteOne(idCart, idProduct);
  return productModific;
};

export const updateProduct = (id, obj) => {
  const productModific = productsManager.updateOne(id, obj);
  return productModific;
};
