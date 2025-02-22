import { Router } from "express"
import ControllerFabcompTipoTora from "../controllers/fabcomptipotora.controller.js"

const routeFabcompTipoTora = Router()

// GET
routeFabcompTipoTora.get("/tipo-tora", ControllerFabcompTipoTora.Listar);
// POST
routeFabcompTipoTora.post("/tipo-tora", ControllerFabcompTipoTora.Inserir);
// UPDATE
routeFabcompTipoTora.put("/tipo-tora/:id", ControllerFabcompTipoTora.Editar);
// DELETE
routeFabcompTipoTora.delete("/tipo-tora/:id", ControllerFabcompTipoTora.Deletar);

export default routeFabcompTipoTora