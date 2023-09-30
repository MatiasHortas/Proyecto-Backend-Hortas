import { Router } from "express";
import { manager } from "./../ProductsManager.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const product = await manager.getProducts(req.query);
    res.status(200).json({ message: "Producto encontrado", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await manager.getProductById(+id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json({ message: "producto encontrado", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const {
    title,
    description,
    price,
    thumbnail,
    stock,
    code,
    status,
    category,
  } = req.body;
  if (
    !title ||
    !description ||
    !price ||
    !thumbnail ||
    !stock ||
    !code ||
    !status ||
    !category
  )
    return res.status(400).json({ message: "some data is missing" });
  const products = await manager.getProducts({});
  const isCodeRepeat = products.some((product) => product.code === code);
  if (isCodeRepeat) {
    return res.status(400).json({ message: "Codigo repetido" });
  }
  try {
    const response = await manager.addProduct(req.body);
    res.status(200).json({ message: "Product created", product: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    const response = await manager.deleteProduct(+idProduct);
    if (!response) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json({ message: "producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;

  try {
    const response = await manager.updateProduct(+idProduct, req.body);
    if (!response) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json({ message: "producto actualizado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
