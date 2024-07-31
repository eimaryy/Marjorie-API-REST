import mongoose from "mongoose";

const carrinhoSchema = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  userId:{ type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  items: [
    {
      produtoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produto",
        required: true
      },
      quantity: { 
        type: Number, 
        required: true, 
        min: 1 
      },
      price: { 
        type: Number, 
        required: true 
      }
    }
  ],
  dateCreation: {
    type: Date,
    default: Date.now 
  },
}, 
{
  versionKey: false
}
);

const Carrinho = mongoose.model("Carrinho", carrinhoSchema);
  
export default Carrinho;