import { Router } from "express";
import { manager } from "../ProductsManager.js";
import { products2Manager } from "../managers/products2Manager.js";
import { usersManager1 } from "../managers/usersManager.js";
import { cartsManager } from "../managers/cartsManager.js";
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

router.get("/products", async (req, res) => {
  try {
    const products = await products2Manager.findAll(req.query);
    console.log("products", products);
    res.render("products", { response: products, style: "product" });
  } catch (error) {
    throw new Error(error.message);
  }
});
router.get("/homeuser/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const user = await usersManager1.findById(idUser);
  const { first_name, last_name } = user;
  res.render("homeuser", { first_name, last_name });
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/chat/:idUser", async (req, res) => {
  const { idUser } = req.params;
  try {
    const user = await usersManager1.findById(idUser);
    const { first_name, last_name } = user;
    res.render("chat", { first_name, last_name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/cookies", async (req, res) => {
  res.render("cookies");
});

// router.get("/cart/:idCart", async (req, res) => {
//   try {
//     const { idCart } = req.params;
//     const cart = await cartsManager.findById(idCart);
//     console.log("cart", cart);
//     res.render("cart", { response: cart });
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

router.get("/carts/:idCart", async (req, res) => {
  const { idCart } = req.params;
  try {
    const cart = await cartsManager.findById(idCart);
    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }
    const cartProducts = cart.products.map((doc) => doc.toObject());

    console.log(cartProducts);
    res.render("cart", { response: cartProducts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});
router.get("/cart/", async (req, res) => {
  try {
    const cart = await cartsManager.findAll();
    console.log("cart", cart);
    res.render("cart", { response: cart });
  } catch (error) {
    throw new Error(error.message);
  }
});
//
export default router;
