import {
  findAll,
  findById,
  createOne,
  updateCart,
  addProduct,
  deleteOneProduct,
  deleteAll,
} from "../services/cart.service.js";

export const findCartById = async (req, res) => {
  const { idCart } = req.params;
  const cart = await findById(idCart);
  res.json({ cart });
};

export const findAllCart = async (req, res) => {
  const cart = await findAll();
  res.json({ cart });
};
export const addProductToCart = async (req, res) => {
  const { idCart, idProduct } = req.params;
  const cart = await addProduct(idCart, idProduct);
  res.json({ cart });
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
    res.status(500).json({ message: error.message });
  }
};
export const deleteAllCart = async (req, res) => {
  try {
    const { idCart } = req.params;
    const response = await deleteAll(idCart);
    res.status(200).json({ message: "Cart delete", cart: response });
  } catch (error) {
    res.status(500).json({ message: "Error my friend", error: error });
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
    res.status(500).json({ message: "Error my friend" });
  }
};
