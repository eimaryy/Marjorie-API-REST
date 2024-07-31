import AuthService from "../services/authService.js";

class AuthController{
  static async login(req, res, next){
    try{

      const data = req.body;

      const login = await AuthService.login(data);

      res.status(200).send(login);      
    }
    catch(error){
      next(error);
    }
  }
}

export default AuthController;