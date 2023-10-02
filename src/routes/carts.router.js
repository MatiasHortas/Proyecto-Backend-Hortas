import { Router } from "express";
import { cartsManager } from "./../CartsManager.js";
const router = Router();

router.post("/", async (req, res) => {
  try {
    const newCart = await cartsManager.createCart();
    res.status(201).json({ message: "Carrito creado", cart: newCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsManager.getCartById(+cid);
    if (!cart) {
      res.status(404).json({ message: "Carrito no encontrado" });
      return;
    }
    res.status(200).json({
      message: "Productos en el carrito",
      products: cart.products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    await cartsManager.addProductToCart(+cid, +pid, quantity);
    res.status(201).json({ message: "Producto agregado al carrito con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
