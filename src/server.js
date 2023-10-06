import express from "express";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { manager } from "./ProductsManager.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

///handlebarss
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//routes

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/views", viewsRouter);

const httpServer = app.listen(8080, () => {
  console.log("Funciona el puerto amigo");
});

const socketServer = new Server(httpServer);

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
});
