import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class RequisicaoSemAutor extends RequisicaoIncorreta {
  constructor() {
    super("O autor(a) é obrigatório");
  } 
}

export default RequisicaoSemAutor;
