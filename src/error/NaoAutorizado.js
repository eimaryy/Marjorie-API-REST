import ErroBase from "./ErrorBase.js";

class NaoAutorizado extends ErroBase {
  constructor(mensagem = "Usuário não autorizado"){
    super(mensagem, 403);
  }
}

export default NaoAutorizado;