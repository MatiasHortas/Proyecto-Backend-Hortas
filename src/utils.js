import { dirname } from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const __dirname = dirname(fileURLToPath(import.meta.url));
const SECRET_KEY_JWT = "secretJWT";
export const hashData = async (data) => {
  return bcrypt.hash(data, 10);
};

export const compareData = async (data, hashedData) => {
  return bcrypt.compare(data, hashedData);
};

export const generateToken = (user) => {
  const token = jwt.sign(user, SECRET_KEY_JWT, { expiresIn: 3000 });
  console.log("mi token", token);
  return token;
};
