import jwt from "jsonwebtoken";
import "dotenv/config";
import NaoAutenticado from "../error/NaoAutenticado.js";

export const autenticado = async (req, res, next) =>{
  const token = req.headers.authorization;

  if(!token){
    next(new NaoAutenticado("Access token não informado"));
  }

  const [, accessToken] = token.split(" ");
  try {
    jwt.verify(accessToken, process.env.SECRET);

    const { _id, email} = await jwt.decode(accessToken);
    req.usuarioId = _id;
    req.usuarioEmail = email;

    next();
  } catch{
    next(new NaoAutenticado());
  }
};
