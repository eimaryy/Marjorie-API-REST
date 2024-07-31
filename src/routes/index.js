import express from "express";
import produtos from "./produtoRoutes.js";
import users from "./usersRoutes.js";
import auth from "./authRoutes.js";
import carrinho from "./carrinhoRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({name: "SEJA BEM VINDO A MARJORIE`S"});
  });

  app.use(
    express.json(),
    auth,
    produtos,
    users,
    carrinho
  );
};

export default routes;

