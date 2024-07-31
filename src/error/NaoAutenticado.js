import ErroBase from "./ErrorBase.js";

class NaoAutenticado extends ErroBase{
  constructor(mensagem = "Usuário não autenticado"){
    super(mensagem, 401);
  }
}

export default NaoAutenticado;