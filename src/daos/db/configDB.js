import mongoose from "mongoose";

const URI =
  "mongodb+srv://MatiHortas:matias123@cluster0.h3pwe3e.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => console.log("conectado a la base de datos"))
  .catch((error) => console.log(error));
