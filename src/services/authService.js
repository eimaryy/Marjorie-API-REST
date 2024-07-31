import User from "../model/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import RequisicaoIncorreta from "../error/requisicaoIncorreta.js";

class AuthService {
  static async login(data){

    // eslint-disable-next-line no-useless-catch
    try{
      const query = User.where({ email: data.email });
      const usuario = await query.findOne();

      if(!usuario){
        throw new RequisicaoIncorreta("Usuario ou senha invalido");
      }

      const senhaIguais = await bcrypt.compare(data.password, usuario.password);

      if (!senhaIguais) {
        throw new RequisicaoIncorreta("Usuario ou senha invalido");
      }
    
      const accessToken = jwt.sign({
        _id: usuario._id,
        email: usuario.email
      }, process.env.SECRET, {
        expiresIn: 86400
      });
      return { accessToken };

    }catch(error){
      throw error;
    }

  }
}

export default AuthService;