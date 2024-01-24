import mongoose from "mongoose";
import { logger } from "../../../logger.js";

const URI =
  "mongodb+srv://MatiHortas:matias123@cluster0.h3pwe3e.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => logger.info("conectado a la base de datos"))
  .catch((error) => logger.error(error));
