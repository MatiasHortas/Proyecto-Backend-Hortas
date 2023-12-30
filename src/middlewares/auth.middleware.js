import jwt from "jsonwebtoken";
import config from "../config/config.js";

const secretKeyJwt = config.secret_jwt;

export const authMiddleware = (roles) => {
  return (req, res, next) => {
    try {
      console.log("cookie", req.cookies);
      console.log("cookie", req.cookies.token);

      if (!req.cookies || !req.cookies.token) {
        return res.status(401).json("Unauthorized: Token not provided");
      }
      const token = req.cookies.token;
      console.log("TOKEN", token);
      const userToken = jwt.verify(token, secretKeyJwt);
      req.user = userToken;
      console.log(req.user);

      if (roles.includes(req.user.role)) {
        // Si el rol del usuario está permitido, continuar con la siguiente middleware/ruta
        return next();
      } else {
        // Si el rol del usuario no está permitido, devolver un 403
        return res.status(403).json("Not authorized");
      }
    } catch (error) {
      // Manejar errores de verificación del token (token inválido, expirado, etc.)
      console.error("Error verifying JWT:", error.message);
      return res.status(401).json("Unauthorized");
    }
  };
};
