import NaoAutorizado from "../error/NaoAutorizado.js";
import NaoEncontrado from "../error/NaoEncontrado.js";
import User from "../model/UserModel.js";

export const permissoes = async (req, res, next) => {
  const usuarioId = req.usuarioId;
  
  const usuario = await User.findById(usuarioId);
    
  if(!usuario){
    next(new NaoEncontrado());
  }else if(usuario.role === "Cliente"){
    next(new NaoAutorizado());
  }
  req.resultado = usuario;
  next();
};