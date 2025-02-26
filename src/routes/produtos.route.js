import { Router } from "express"
import ControllerProdutos from "../controllers/produtos.controller.js"

const routeProdutos = Router()

// GET
routeProdutos.get("/produtos", ControllerProdutos.Listar);
// POST
routeProdutos.post("/produtos", ControllerProdutos.Inserir);
// UPDATE
routeProdutos.put("/produtos/:id", ControllerProdutos.Editar);
// DELETE
routeProdutos.delete("/produtos/:id", ControllerProdutos.Deletar);

export default routeProdutos