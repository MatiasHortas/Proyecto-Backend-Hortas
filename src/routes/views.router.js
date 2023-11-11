import { Router } from "express";
import { productsManager } from "../managers/productsManager.js";
import { usersManager } from "../managers/usersManager.js";
import { cartsManager } from "../managers/cartsManager.js";
const router = Router();

//ruta handlebars
// router.get("/", async (req, res) => {
//   try {
//     const products = await manager.getProducts({});
//     res.render("home", { response: products });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realTimeProducts");
  } catch (error) {
    throw new Error(error.message);
  }
});

router.get("/products", async (req, res) => {
  try {
    let products = await productsManager.findAll(req.query);
    if (!products) {
      console.error("No se encontraron productos");
      return res.status(404).send("No se encontraron productos");
    }
    const { info: payload, ...product } = products;

    console.log("que tenemos aca", payload);
    console.log("y que tenemos aca", product);

    res.render("products", {
      products: product.results,
      paginate: payload,
      style: "product",
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return res.status(500).send("Error interno del servidor");
  }
});

router.get("/profile", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/api/views/login");
    }

    const products = await productsManager.findAll(req.query);

    if (!products || !products.results || products.results.length === 0) {
      console.error("No se encontraron productos");
      return res.status(404).send("No se encontraron productos");
    }

    const { info: paginationInfo, results: productResults } = products;

    console.log("Información de paginación:", paginationInfo);
    console.log("Resultados de productos:", productResults);

    res.render("profile", {
      user: req.session.user,
      products: productResults,
      paginate: paginationInfo,
      style: "product",
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return res.status(500).send("Error interno del servidor");
  }
});

router.get("/signup", async (req, res) => {
  if (req.session.user) {
    return res.redirect("/api/views/profile");
  }
  res.render("signup");
});
router.get("/login", async (req, res) => {
  if (req.session.user) {
    return res.redirect("/api/views/profile");
  }
  res.render("login");
});

router.get("/chat/:idUser", async (req, res) => {
  const { idUser } = req.params;
  try {
    const user = await usersManager.findById(idUser);
    const { first_name, last_name } = user;
    res.render("chat", { first_name, last_name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/cookies", async (req, res) => {
  res.render("cookies");
});

router.post("/cookies", async (req, res) => {
  const { name, email } = req.body;
  req.session.name = name;
  req.session.email = email;
  res.send("session");

  // res.render("cookies");
});

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
