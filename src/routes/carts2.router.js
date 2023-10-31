import { Router } from "express";
import { cartsManager } from "../managers/cartsManager.js";

const router = Router();

router.get("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  const cart = await cartsManager.findById(idCart);
  res.json({ cart });
});

router.get("/", async (req, res) => {
  const cart = await cartsManager.findAll();
  res.json({ cart });
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
