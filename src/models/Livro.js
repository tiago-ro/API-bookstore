import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { 
    type: String, 
    required: [true, "O título do livro é obrigatório"]
  },
  editora: {
    type: String,
    required: [true, "A editora é obrigatória"],
    enum: {
      values: ["Casa do código", "Alura", "Classicos"],
      message: "A editora {VALUE} não é um valor permitido."
    }
  },
  preco: {type: Number},
  paginas: {
    type: Number,
    min: [10, "O número de páginas deve estar entre 10 e 5000. Valor fornecido {VALUE}"],
    max: [5000, "O número de páginas deve estar entre 10 e 5000. Valor fornecido {VALUE}"]
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O(a) autor(a) é obrigatório"],
    autopopulate: true
  },
  
}, {versionKey: false});

livroSchema.plugin(autopopulate);

const livro = mongoose.model("livros", livroSchema);

export default livro;

