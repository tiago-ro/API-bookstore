import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class RequisicaoSemAutor extends RequisicaoIncorreta {
  constructor(mensagem = "O autor(a) é obrigatório") {
    super(mensagem);
  } 
}

export default RequisicaoSemAutor;
