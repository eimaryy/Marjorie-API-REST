import Carrinho from "../model/carrinhoModel.js";
import NaoEncontrado from "../error/NaoEncontrado.js";
import Produto from "../model/ProdutoModel.js";
import CarrinhoService from "../services/carrinhoService.js";

class CarrinhoController {

  static addItemCarrinho = async (req, res, next) => {
    try{
      const usuarioId = req.usuarioId;
      const { produtoId } = req.body;
    
      const produto = await Produto.findById(produtoId);

      if (!produto) {
        next(new NaoEncontrado("Produto não localizado."));
      }
    
      const carrinhoExistente = await Carrinho.findOne({ userId: usuarioId });

      if(!carrinhoExistente){
        const newCarrinho = await CarrinhoService.criar(usuarioId, produto);
        await newCarrinho.save();

        return res.status(201).json({message: "Carrinho criado com sucesso!"});
      }
      
      const newCarrinho = await CarrinhoService.adicionarItem(carrinhoExistente, produto, produtoId);
      await newCarrinho.save();

      res.status(200).send(newCarrinho);

    }catch(error){
      next(error);
    }
  };

  static findCarrinhoId = async (req, res, next) =>{
    try{
      const id = req.usuarioId;

      const carrinhoEncontrado = await Carrinho.find({ userId: id});

      if (carrinhoEncontrado) {
        res.status(200).send(carrinhoEncontrado);
      } else {
        next(new NaoEncontrado("Carrinho não localizado."));
      }
    }
    catch(error){
      next(error);
    };
  };

  static deleteItemCarrinho = async (req, res, next) => {
    try{
      const usuarioId = req.usuarioId;
      const { produtoId } = req.body;

      const carrinhoExistente = await Carrinho.findOne({ userId: usuarioId });

      if(!carrinhoExistente){
        return next(new NaoEncontrado("Carrinho não localizado."));
      }

      const produto = await Produto.findById(produtoId);

      if (!produto) {
        return next(new NaoEncontrado("Produto não localizado."));
      }
    
      const newCarrinho = await CarrinhoService.deleteItem(produto, produtoId, carrinhoExistente);
      
      if(newCarrinho instanceof Error){
        next(newCarrinho);
      }else{
        await newCarrinho.save(); 
        res.status(200).send(newCarrinho);
      }
    }catch(error){
      next(error);
    }
  };


}

export default CarrinhoController;