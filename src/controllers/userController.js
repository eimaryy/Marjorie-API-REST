import User from "../model/UserModel.js";
import NaoEncontrado from "../error/NaoEncontrado.js";
import UsuarioService from "../services/userService.js";

class UserController {
  static listUsers = async (req, res, next) => {
    try{
      const allUsers = User.find();

      req.resultado = allUsers;

      next();
    }catch(error){
      next(error);
    }
  };

  static findUserId = async (req, res, next) => {
    try{
      const id = req.usuarioId;

      const userEncontrado = await User.findById(id);

      if (userEncontrado !== null) {
        res.status(200).send(userEncontrado);
      } else {
        next(new NaoEncontrado("Usuário não localizado."));
      }
    }
    catch(error){
      next(error);
    }
  };

  static createUser = async (req, res, next) =>{
    try{
      const data = req.body;

      const newUser = await UsuarioService.cadastrar(data);

      const userResultado = await newUser.save();

      res.status(201).send(userResultado.toJSON());
    }catch(error){
      next(error);
    }
  };

  static updateUserId = async (req, res, next) =>{
    try{
      const id = req.usuarioId;
      const data = req.body;

      const userAtualizado = await UsuarioService.atualizar(id, data);
      if (userAtualizado) {
        res.status(200).send({message: "Usuário atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Usuário não localizado."));
      }

    }catch(error){
      next(error);
    }
  };
  static deleteUserId = async (req, res, next) => {
    try{
      const id = req.usuarioId;
        
      const userEncontrado = await User.findByIdAndDelete(id);

      if (userEncontrado === null) {
        return next(new NaoEncontrado("Usuário não localizado."));
      }
     
      res.status(200).json(`${userEncontrado.name} foi deletado com sucesso!`);

    }catch(error){
      next(error);
    }
  };

}

export default UserController;