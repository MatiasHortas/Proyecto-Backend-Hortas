import { Router } from "express";
import { cartsManager } from "../managers/cartsManager.js";

const router = Router();

router.get("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  const cart = cartsManager.findById(idCart);
  res.json({ cart });
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

router.post("/:idCart/products/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
  const cart = cartsManager.addProductToCart(idCart, idProduct);
  res.json({ cart });
});

router.post("/", async (req, res) => {
  const cart = await cartsManager.createOne();
  res.json({ cart });
});

export default router;
