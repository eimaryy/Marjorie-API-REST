import Router from "express";
import { autenticado } from "../middlewares/autenticado.js";
import CarrinhoController from "../controllers/carrinhoController.js";

const router = Router();

router
  .post("/carrinho/:id", autenticado, CarrinhoController.addItemCarrinho)
  .get("/carrinho", autenticado, CarrinhoController.findCarrinhoId)
  .delete("/carrinho/:id", autenticado, CarrinhoController.deleteItemCarrinho);

export default router;