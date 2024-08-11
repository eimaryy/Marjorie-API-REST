import Produto from "../model/ProdutoModel.js";
import { deleteImage } from "../services/multer.js";
import NaoEncontrado from "../error/NaoEncontrado.js";
import RequisicaoIncorreta from "../error/requisicaoIncorreta.js";

class ProdutoController {
  static listProdutos = async (req, res, next) => {
    try {
      const allProdutos = Produto.find();

      req.resultado = allProdutos;

      next();
    }catch (error){
      next(error);
    }
  };

  static findProdutoId = async (req, res, next) => {
    try {
      const id = req.params.id;
      
      const produtoEncontrado = await Produto.findById(id);

      if (produtoEncontrado) {
        res.status(200).send(produtoEncontrado);
      } else {
        next(new NaoEncontrado("Produto não localizado."));
      }
    }catch(error){
      next(error);
    }
  };

  static findProdutoCategory = async (req, res, next) => {
    try{
      const categoria = req.params.category; 

      const produtosEncontrados = Produto.find({ category: categoria });

      req.resultado = produtosEncontrados;

      next();

    }catch(error){
      next(error);
    }
  };

  static findProdutoKeyword = async(req, res, next) =>{
    try{
      const keyword = req.params.keyword;

      const regex = RegExp(keyword, "i");

      console.log(regex);
      const produtosEncontrados = Produto.find( 
        {
          $or: 
          [{name: regex}, 
            {description: regex}, 
            {category: regex}]
        }
      );

      req.resultado = produtosEncontrados;

      next();

    }catch(error){
      next(error);
    }
  };


  static createProduto = async (req, res, next) => {
    try {
      const data = req.body;
      const file = req.file;
      
      if(!file){
        return next(new RequisicaoIncorreta("A imagem do produto deve ser adicionada"));
      }

      const produto = new Produto({
        ...data,
        src: file.filename,
      });

      await produto.save();

      res.status(201).json({ message: "Produto cadastrado com sucesso!" });
    }catch(error){
      if(req.file){
        deleteImage(req.file.filename);
      }
      next(error);
    }
  };

  static updateProdutoId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const file = req.file;
      
      const produtoEncontrado = await Produto.findById(id);
      
      if (produtoEncontrado === null) {
        if(file){
          deleteImage(file.filename);
        }
        next(new NaoEncontrado("Produto não localizado."));
      }
      
      if (file) {
        const oldPath = produtoEncontrado.src;
        produtoEncontrado.src = file.filename;
        
        if (oldPath) {
          deleteImage(oldPath);
        }
      }

      Object.assign(produtoEncontrado, data);

      await produtoEncontrado.save();
      res.status(201).json({ message: "Produto atualizado com sucesso!" });
    }catch(error){
      if(req.file){
        deleteImage(req.file.filename);
      }
      next(error);
    }
  };

  static deleteProdutoId = async (req, res, next) => {
    try {
      const id = req.params.id;
      
      const produtoEncontrado = await Produto.findByIdAndDelete(id);

      if (produtoEncontrado === null) {
        next(new NaoEncontrado("Produto não localizado."));
      }
      if(produtoEncontrado.src){
        deleteImage(produtoEncontrado.src);
      }
      res.status(200).json(`${produtoEncontrado.name} foi deletado com sucesso!`);
    }catch(error){
      next(error);
    }
  };
  
}

export default ProdutoController;
