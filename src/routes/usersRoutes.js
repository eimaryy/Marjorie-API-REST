import express from "express";
import UserController from "../controllers/userController.js";
import pagination from "../middlewares/pagination.js";
import { autenticado } from "../middlewares/autenticado.js";
import { permissoes } from "../middlewares/permissoes.js";

const router = express.Router();

router
  .get("/users", autenticado, permissoes, UserController.listUsers, pagination)
  .get("/user", autenticado, UserController.findUserId)
  .post("/user/create", UserController.createUser)
  .put("/user", autenticado, UserController.updateUserId)
  .delete("/user", autenticado, UserController.deleteUserId);

export default router;