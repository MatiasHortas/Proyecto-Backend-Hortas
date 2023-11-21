import express from "express";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import productsRouter from "./routes/products.router.js";
import chatRouter from "./routes/chat.router.js";
import cookieRouter from "./routes/cookie.router.js";
import sessionRouter from "./routes/sessions.router.js";
import cookieParser from "cookie-parser";
import fileStore from "session-file-store";
import MongoStore from "connect-mongo";
import session from "express-session";
import "./passport.js";
import passport from "passport";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { productsManager } from "./managers/productsManager.js";

//db conecction
import "./db/configDB.js";
const FileStore = fileStore(session);
const app = express();
const URI =
  "mongodb+srv://MatiHortas:matias123@cluster0.h3pwe3e.mongodb.net/ecommerce?retryWrites=true&w=majority";

// // mongo
app.use(
  session({
    store: new MongoStore({ mongoUrl: URI }),
    secret: "secretSession",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

// // // passport
app.use(passport.initialize());
app.use(passport.session());

// // // // .

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser("SecretCookie"));

///session
// // file
// app.use(
//   session({
//     store: new FileStore({ path: __dirname + "/sessions" }),
//     secret: "secretSession",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 },
//   })
// );

///handlebarss
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//routes

app.use("/api/carts", cartsRouter);
app.use("/api/views", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/chat", chatRouter);
app.use("/api/cookie", cookieRouter);
app.use("/api/sessions", sessionRouter);
const httpServer = app.listen(8080, () => {
  console.log("Funciona el puerto amigo");
});

const socketServer = new Server(httpServer);
const messages = [];
socketServer.on("connection", async (socket) => {
  console.log(`Cliente conectado ${socket.id}`);
  const products = await productsManager.getProducts({});
  socket.emit("products", products);

  socket.on("addProduct", async (productsData) => {
    console.log(productsData);
    await productsManager.addProduct(productsData);
    const productsUpdated = await productsManager.getProducts({});
    socket.emit("productsUpdated", productsUpdated);
  });

  socket.on("id", async (id) => {
    await productsManager.deleteProduct(+id);
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
