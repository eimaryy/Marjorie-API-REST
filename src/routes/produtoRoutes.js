import express from "express";
import ProdutoController from "../controllers/produtoController.js";
import upload from "../services/multer.js";
import pagination from "../middlewares/pagination.js";
import { permissoes } from "../middlewares/permissoes.js";
import { autenticado } from "../middlewares/autenticado.js";

const router = express.Router();

router
  .get("/produtos", ProdutoController.listProdutos, pagination)
  .get("/produto/search/:id", ProdutoController.findProdutoId)
  .get("/produtos/category/:category", ProdutoController.findProdutoCategory, pagination)
  .get("/produtos/search/keyword/:keyword", ProdutoController.findProdutoKeyword, pagination)
  .post("/produto/create", autenticado, permissoes, upload.single("file"), ProdutoController.createProduto)
  .put("/produto/:id",  autenticado, permissoes, upload.single("file"), ProdutoController.updateProdutoId)
  .delete("/produto/:id", autenticado, permissoes, ProdutoController.deleteProdutoId);


export default router;