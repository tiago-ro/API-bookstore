import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase {
  constructor(mensagem = "Um ou mais daos fornecidos estão incorretos") {
    super(mensagem, 400);
  }
}

export default RequisicaoIncorreta;