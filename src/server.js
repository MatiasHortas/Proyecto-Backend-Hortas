import express from "express";
import cartsRouter from "./routes/carts.router.js";
import carts2Router from "./routes/carts2.router.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import products2Router from "./routes/products2.router.js";
import chatRouter from "./routes/chat.router.js";
import cookieParser from "cookie-parser";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { manager } from "./ProductsManager.js";

//db conecction
import "./db/configDB.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser("SecretCookie"));

///handlebarss
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//routes

app.use("/api/carts", cartsRouter);
app.use("/api/carts2", carts2Router);
app.use("/api/views", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/products2", products2Router);
app.use("/api/chat", chatRouter);

const httpServer = app.listen(8080, () => {
  console.log("Funciona el puerto amigo");
});

const socketServer = new Server(httpServer);
const messages = [];
socketServer.on("connection", async (socket) => {
  console.log(`Cliente conectado ${socket.id}`);
  const products = await manager.getProducts({});
  socket.emit("products", products);

  socket.on("addProduct", async (productsData) => {
    console.log(productsData);
    await manager.addProduct(productsData);
    const productsUpdated = await manager.getProducts({});
    socket.emit("productsUpdated", productsUpdated);
  });

  socket.on("id", async (id) => {
    await manager.deleteProduct(+id);
    socket.emit("productsUpdated", products);
  });

  socket.on("message", (info) => {
    messages.push(info);
    socketServer.emit("chat", messages);
  });
});

app.get("/crear", (req, res) => {
  res
    .cookie("cookie1", "CamaronDormido", { maxAge: 220000 })
    .send("probando cookies");
});

app.get("/crear1", (req, res) => {
  res
    .cookie("cookie2", "CookieFirmada", { signed: true })
    .send("probando cookies 2");
});

app.get("/leer", (req, res) => {
  const { cookie1 } = req.cookies;
  const { cookie2 } = req.signedCookies;
  res.json({ cookies: cookie1, signedCookies: cookie2 });
  // res.send(`leyendo cookies: ${cookie1}`);
});

app.get("/borrar", (req, res) => {
  res.clearCookie("cookie1").send("cookie eliminada");
});
