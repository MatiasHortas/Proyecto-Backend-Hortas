import { cartsManager } from "../DAL/daos/MongoDB/cartsManager.mongo.js";

export const findAll = () => {
  const carts = cartsManager.findAll();
  return carts;
};

export const findById = (id) => {
  const cart = cartsManager.findById(id);
  return cart;
};

export const createOne = (obj) => {
  const createdCart = cartsManager.createOne(obj);
  return createdCart;
};

export const addProduct = (idCart, idProduct) => {
  const cartModific = cartsManager.addProductToCart(idCart, idProduct);
  return cartModific;
};

export const deleteOneProduct = (idCart, idProduct) => {
  const cartModific = cartsManager.deleteOne(idCart, idProduct);
  return cartModific;
};

export const deleteAll = (idCart) => {
  const listaCarts = cartsManager.deleteAll(idCart);
  return listaCarts;
};

export const updateCart = (idCart, idProduct, quantity) => {
  const cartsModific = cartsManager.updateOne(idCart, idProduct, quantity);
  return cartsModific;
};
