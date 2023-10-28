import { Router } from "express";
import { products2Manager } from "../managers/products2Manager.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const product = await products2Manager.findAll();
    res.status(200).json({ message: "Producto", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    const product = await usersManager1.findById(idProduct);
    res.status(200).json({ message: "Producto", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
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

router.delete("/idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    await products2Manager.deleteOne(idProduct);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
