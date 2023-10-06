import { Router } from "express";
import { manager } from "../ProductsManager.js";
const router = Router();

//ruta handlebars
router.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts({});
    res.render("home", { response: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realTimeProducts");
  } catch (error) {
    throw new Error(error.message);
  }
});

//
export default router;
