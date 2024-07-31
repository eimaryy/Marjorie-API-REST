import mongoose from "mongoose";
import ErrorBase from "../error/ErrorBase.js";
import RequisicaoIncorreta from "../error/requisicaoIncorreta.js";
import ErroValidacao from "../error/errorValidacao.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  }else if(erro instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(erro).enviarResposta(res);
  }else if(erro instanceof RequisicaoIncorreta){
    return erro.enviarResposta(res);
  }else if (erro instanceof ErrorBase) {
    erro.enviarResposta(res);
  } else {
    new ErrorBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;

