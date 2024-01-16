import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";


class AutorController {
  
  static async listarAutores (req, res) {
    try {
      const listarAutores = await autor.find({});
      res.status(200).json(listarAutores);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static async cadastrarAutor (req, res) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({message: "Criado com sucesso", Autor: novoAutor})
    } catch (erro) {
      res.status(500).json({message: `${erro.message} - falha ao cadastrar Autor`});
    }
  };

  static async listarAutorPorID (req, res) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);
      res.status(200).json(autorEncontrado);
    } catch (erro) {
      res.status(500).json({message: `${erro.message} - falha na requisição`})
    }
  };

  static async atualizarAutor (req, res) {
    try {
      const id = res.params.id;
      await autor.findByIdandUpdate(id, req.body);
      res.status(200).json({message: "Autor atualizado" });
    } catch (erro) {
      res.status(500).json({message: `${erro.message} - falha na atualização`})
    }
  };
  
  static async excluirAutor (req, res) {
    try {
      const id = res.params.id;
      await findByIdAndDelete(id);
      res.status(400).json({message: "Autor excluido com sucesso"})
    } catch (erro) {
      res.status(500).json({message: `${erro.message} - falha na exclusão`})
    }
  };

};

export default AutorController;