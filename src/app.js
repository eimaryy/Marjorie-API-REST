import express from "express";
import cors from "cors";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipulador404 from "./middlewares/manipuladorDeErros.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

const app = express();
app.use(cors());
app.use(express.json());
routes(app);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/dist", express.static(path.join(__dirname + "/dist")));
app.use(manipulador404);
app.use(manipuladorDeErros);

export default app;