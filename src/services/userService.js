import User from "../model/UserModel.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
import RequisicaoIncorreta from "../error/requisicaoIncorreta.js";

class UsuarioService{
  static async cadastrar(data){
    const usuario = await User.findOne({
      $or: [
        { email: data.email },
        { CPF: data.CPF }
      ]
    });

    if(usuario){
      throw new RequisicaoIncorreta();
    }
    // eslint-disable-next-line no-useless-catch
    try{
      const senhaHash = await bcrypt.hash(data.password, Number(process.env.SALT_ROUNDS));

      data.password = senhaHash;

      const newUser = new User(data);

      return newUser;

    }catch(error){
      throw error;
    }
  }

  static async atualizar(id, data){
     
    // eslint-disable-next-line no-useless-catch
    try{
      const usuarioEncontrado = await User.findById(id);

      const senhaIguais = await bcrypt.compare(data.password, usuarioEncontrado.password);

      if (senhaIguais) {
        throw new RequisicaoIncorreta("Esta senha é igual a senha atual");
      }
      if(usuarioEncontrado.email === data.email){
        throw new RequisicaoIncorreta("Este email é igual ao email atual");
      }
      if(data.password){
        const saltRounds = Number(process.env.SALT_ROUNDS);
        const senhaHash = await bcrypt.hash(data.password, saltRounds);
        data.password = senhaHash;
      }

      const userAtualizado = await User.findByIdAndUpdate(id, {$set: data});

      return userAtualizado;

    }catch(error){
      throw error;
    }
  }

}

export default UsuarioService;

