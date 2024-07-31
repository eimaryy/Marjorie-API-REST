import Router from "express";
import { autenticado } from "../middlewares/autenticado.js";
import CarrinhoController from "../controllers/carrinhoController.js";

const router = Router();

router
  .post("/carrinho", autenticado, CarrinhoController.addItemCarrinho)
  .get("/carrinho", autenticado, CarrinhoController.findCarrinhoId)
  .delete("/carrinho", autenticado, CarrinhoController.deleteItemCarrinho);

export default router;