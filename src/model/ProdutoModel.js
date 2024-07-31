import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema(
  {
    id: {type: mongoose.Schema.Types.ObjectId},
    category: {
      type: String,
      required: [true, "É necessário informar a categoria do produto."],
      lowercase:true
    },
    amount: {
      type: Number, 
      required: [true, "A quantidade de produto em estoque deve ser informada."]
    },
    status: {type: String},
    name: {
      type: String,
      required: [true, "É necessário informar o nome do produto."],
      lowercase: true
    },
    src:{
      type: String,
      required: [true, "A imagem do produto é obrigatório"]
    },
    alt: {
      type: String,
      required: [true, "É necessário informar a descrição da imagem."]
    },
    description: {
      type: String,
      required: [true, "É necessário informar a descrição do produto."],
      lowercase: true,
    },
    price:{
      type: Number,
      required: [true, "O valor do produto deve ser informado"]
    },
  },
  {
    versionKey: false
  }
);
  
const Produto = mongoose.model("Produto", produtoSchema);
  
export default Produto;