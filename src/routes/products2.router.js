import { Router } from "express";
import { products2Manager } from "../managers/products2Manager.js";
const router = Router();

router.get("/agg", async (req, res) => {
  try {
    const product = await products2Manager.findAggre();
    res.status(200).json({ message: "Producto", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const product = await products2Manager.findAll(req.query);
    res.status(200).json({ message: "Producto", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    const product = await products2Manager.findById(idProduct);
    res.status(200).json({ message: "Producto", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name, price, description, category, code } = req.body;
  if (!name || !price || !description || !category || !code) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const createdProduct = await products2Manager.createOne(req.body);
    res
      .status(200)
      .json({ message: "Product Created", product: createdProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    await products2Manager.deleteOne(idProduct);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    const productUpdated = await products2Manager.updateOne(
      idProduct,
      req.body
    );
    res.status(200).json({ message: "Product updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
