import { Router } from "express";
import { cartsManager } from "../CartsManager";
const router = Router();

router.post("/", async (req, res) => {});

router.get("/:idCart", async (req, res) => {});

router.post("/:idCart/product/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
});
export default router;
