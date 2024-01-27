import { livro } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";


class LivroController {

  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
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
      const {editora, titulo} = req.query;
      
      const busca = {};

      if (editora) busca.editora = editora;
      if (titulo) busca.titulo = {$regex: titulo, $options: "i"};

      const livrosResultado = await livro.find(busca);
  
      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  }
}

export default LivroController;
