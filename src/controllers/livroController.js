import { autor,  livro } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";


class LivroController {

  static async listarLivros(req, res, next) {
    try {
      let {limite = 5, pagina = 1, ordenacao = "_id: 1"} = req.query;
      
      let [campoOrdenacao, ordem] = ordenacao.split(":");

      limite = parseInt(limite);
      pagina = parseInt(pagina);
      ordem = parseInt(ordem);
      

      if (limite > 0 && pagina > 0) {
        const listaLivros = await livro.find()
          .sort({ [campoOrdenacao]: ordem}) 
          .skip((pagina - 1) * limite)
          .limit(limite)
          .populate("autor")
          .exec();

        res.status(200).json(listaLivros);
      } else {
        next(new RequisicaoIncorreta());
      }

    } catch (erro) {
      next(erro);
    }
  }

  static cadastrarLivro = async (req, res, next) => {
    try {
      const novoLivros = new livro(req.body);
      const livroCriado = await novoLivros.save();
      res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
    }
    catch (erro) {  
      
      next(erro);

    }
  };

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      if (livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizaLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndUpdate(id, req.body);
      if (livroEncontrado !== null) {
        res.status(200).json({ message: "livro atualizado" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndDelete(id);
      if (livroEncontrado !== null) {
        res.status(400).json({ message: "Livro excluido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }
  
  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = await livro
          .find(busca)
          .populate("autor");
    
  
        res.status(200).json(livrosResultado);
      } else {
        res.status(200).send([]);
      }
      
    } catch (erro) {
      next(erro);
    }
  }
}

async function processaBusca(parametros) {
  const {editora, titulo, minPaginas, maxPaginas, nomeAutor} = parametros;
      
  
  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = {$regex: titulo, $options: "i"};
  if (minPaginas || maxPaginas) busca.paginas = {};

  if (minPaginas) busca.paginas.$gte = minPaginas;
  if (maxPaginas) busca.paginas.$lte = maxPaginas;

  if (nomeAutor) 
  {
    const autorEncontrado = await autor.findOne({ nome: nomeAutor});
    if ( autorEncontrado !== null) {
      busca.autor = autorEncontrado._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;
