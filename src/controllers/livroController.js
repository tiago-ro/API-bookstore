import livro from "../models/Livro.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autor } from "../models/Autor.js";

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
    // const novoLivro = req.body;
    try {

      const novoLivros = new livro(req.body);
      const livroCriado = await novoLivros.save();
      console.log(livroCriado);

      res.status(201).json({message: "criado com sucesso", livro: livroCriado});

      // const autorEncontrado = await autor.findById(novoLivro.autor);
      // const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
      // const livroCriado = await livro.create(livroCompleto);
      // res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
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
        next (new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivrosPorEditora(req, res, next) {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livro.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      next(erro);
    }
  }
}

export default LivroController;
