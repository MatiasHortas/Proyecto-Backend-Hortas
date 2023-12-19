import {
  findAll,
  findById,
  createOne,
  deleteOneProduct,
  updateProduct,
} from "../services/products.service.js";

export const findAllProducts = async (req, res) => {
  try {
    const product = await findAll(req.query);
    res.status(200).json({ message: "Producto", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findByIdProducts = async (req, res) => {
  const { idProduct } = req.params;
  try {
    const product = await findById(idProduct);
    res.status(200).json({ message: "Producto", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOneProduct = async (req, res) => {
  const { name, price, description, category, code } = req.body;
  if (!name || !price || !description || !category || !code) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const createdProduct = await createOne(req.body);
    res
      .status(200)
      .json({ message: "Product Created", product: createdProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletedOneProduct = async (req, res) => {
  const { idProduct } = req.params;
  try {
    await deleteOneProduct(idProduct);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatedProduct = async (req, res) => {
  const { idProduct } = req.params;
  try {
    const productUpdated = await updateOne(idProduct, req.body);
    res.status(200).json({ message: "Product updated", productUpdated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
