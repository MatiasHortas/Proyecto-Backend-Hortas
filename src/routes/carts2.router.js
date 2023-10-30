import { Router } from "express";
import { cartsManager } from "../managers/cartsManager.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const cart = await cartsManager.createOne(req.body);
    res.status(200).json({ message: "Cart created", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsManager.findById(cid);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart found", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const response = await cartsManager.createIndexes(cid, pid);
    res.status(200).json({ message: "Product added", cart: response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    await cartsManager.deteleAll();
    res.status(200).json({ message: "Products Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
