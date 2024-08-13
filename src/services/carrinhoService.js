import Carrinho from "../model/CarrinhoModel.js";
import NaoEncontrado from "../error/NaoEncontrado.js";

class CarrinhoService {

  static async criar(usuarioId, produto){
    try{
      const newCarrinho = new Carrinho({
        userId: usuarioId, 
        items: [{
          produtoId: produto._id,
          quantity: 1,
          price: produto.price
        }]
      });
    
      return newCarrinho; 
    }
    catch(error){
      return error;
    }
  }

  static async adicionarItem(carrinhoExistente, produto, produtoId){
    try{
      const produtoExiste = await carrinhoExistente.items.find(item => item.produtoId.equals(produto._id));

      if (produtoExiste) {
        produtoExiste.quantity += 1;
      } else {
        carrinhoExistente.items.push({ produtoId, quantity: 1, price: produto.price });
      }

      return carrinhoExistente;
    }
    catch(error){
      return error;
    }
  }

  static async deleteItem (produto, produtoId, carrinhoExistente){
    try{
      const produtoIndex = await carrinhoExistente.items.findIndex(item => item.produtoId.equals(produto._id));

      if (produtoIndex === -1) {
        return new NaoEncontrado("Produto não encontrado no carrinho");
      } else if(carrinhoExistente.items[produtoIndex].quantity === 1){
        carrinhoExistente.items.splice(produtoIndex, 1);
        return carrinhoExistente;
      }
      carrinhoExistente.items[produtoIndex].quantity -= 1;

      return carrinhoExistente;

    }catch(error){
      return error;
    }
  }
}


export default CarrinhoService;