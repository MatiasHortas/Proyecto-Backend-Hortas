import {
  findAll,
  findById,
  createOne,
  updateCart,
  addProduct,
  deleteOneProduct,
  deleteAll,
} from "../services/cart.service.js";
import { cartsManager } from "../DAL/daos/MongoDB/cartsManager.mongo.js";
import { logger } from "../utils/logger.js";

import { findById as findByIdProduct } from "../services/products.service.js";
import jwt from "jsonwebtoken";
import { createOneT } from "../services/ticket.service.js";
import config from "../config/config.js";
import { v4 as uuidv4 } from "uuid";
// import { CartNotFound, IdNotFound } from "../errors/error.generate.js";
import { IdNotFound, CartNotFound } from "../errors/error.generate.js";
import mongoose from "mongoose";
export const findCartById = async (req, res) => {
  const { idCart } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(idCart)) {
      IdNotFound.generateError();
      return;
    }
    const cart = await findById(idCart);

    if (!cart) {
      CartNotFound.generateError();
    } else {
      res.json({ cart });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error.message, name: error.name });
  }
};

export const findAllCart = async (req, res) => {
  try {
    const cart = await findAll();
    if (!cart) {
      CartNotFound.generateError();
    }
    res.json({ cart });
    logger.info("carrito encontrado", cart);
  } catch (error) {
    logger.error(error);
  }
};
export const addProductToCart = async (req, res) => {
  const { idCart, idProduct } = req.params;

  try {
    const cart = await addProduct(idCart, idProduct);
    res
      .status(200)
      .json({ message: "Producto Agregado al carrito", carrito: cart });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const createOneCart = async (req, res) => {
  const cart = await createOne();
  res.json({ cart });
};
export const deleteOneProductCart = async (req, res) => {
  const { idCart, idProduct } = req.params;

  try {
    const result = await deleteOneProduct(idCart, idProduct);

    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error.message, name: error.name });
  }
};
export const deleteAllCart = async (req, res) => {
  try {
    const { idCart } = req.params;
    if (!mongoose.Types.ObjectId.isValid(idCart)) {
      IdNotFound.generateError();
    }
    const response = await deleteAll(idCart);

    res.status(200).json({ message: "Cart delete", cart: response });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error.message, name: error.name });
  }
};
export const updateOneCart = async (req, res) => {
  const { quantity } = req.body;
  const { idCart, idProduct } = req.params;
  try {
    const response = await updateOne(idCart, idProduct, quantity);
    console.log(response);
    res.status(200).json({ message: "Cart update", cart: response });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Error my friend" });
  }
};

export const purchaseCart = async (req, res) => {
  const { idCart } = req.params;

  try {
    const cart = await findById(idCart);
    const products = cart.products;
    const secretKeyJWT = config.secret_jwt;
    let availableProducts = [];
    let unavailableProducts = [];
    let totalAmount = 0;

    for (let item of products) {
      if (item.product.stock >= item.quantity) {
        availableProducts.push(item);
        item.product.stock -= item.quantity;
        await item.product.save();
        totalAmount += item.quantity * item.product.price;
      } else {
        unavailableProducts.push(item);
      }
    }

    cart.products = unavailableProducts;
    await cart.save();
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTkwNDI0NGM2OGIxZjllMmZhY2I3YzkiLCJtYWlsIjoiaGVybmVzdG9iYXJyZXJhQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzAzOTUyOTcyLCJleHAiOjE3MDM5NTU5NzJ9.hFYP2-USeFoJTnAB1H98qsgVrIU97nk64k82mmfRYNs";
    // ingresar token de usuario
    const userToken = jwt.verify(token, secretKeyJWT);
    if (availableProducts.length) {
      const ticket = {
        code: uuidv4(),
        dateOfPurchase: new Date(),
        amount: totalAmount,
        purchaserName: userToken.mail,
      };

      await createOneT(ticket);

      res.status(200).json({ availableProducts, totalAmount, ticket });
    } else {
      res.status(200).json({ unavailableProducts });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error.message });
  }
};
