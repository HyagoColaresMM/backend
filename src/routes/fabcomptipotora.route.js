import { Router } from "express"
import ControllerFabcompTipoTora from "../controllers/fabcomptipotora.controller.js"

const routeFabcompTipoTora = Router()

// GET
routeFabcompTipoTora.get("/tipotora", ControllerFabcompTipoTora.Listar);
// POST
routeFabcompTipoTora.post("/tipotora", ControllerFabcompTipoTora.Inserir);
// UPDATE
routeFabcompTipoTora.put("/tipotora/:id", ControllerFabcompTipoTora.Editar);
// DELETE
routeFabcompTipoTora.delete("/tipotora/:id", ControllerFabcompTipoTora.Deletar);

export default routeFabcompTipoTora