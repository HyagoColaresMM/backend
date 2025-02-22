import { Router } from "express"
import ControllerFabcompTipoMaterial from "../controllers/fabcomptipomaterial.controller.js"

const routeFabcompTipoMaterial = Router()

// GET
routeFabcompTipoMaterial.get("/tipomaterial", ControllerFabcompTipoMaterial.Listar);
// POST
routeFabcompTipoMaterial.post("/tipomaterial", ControllerFabcompTipoMaterial.Inserir);
// UPDATE
routeFabcompTipoMaterial.put("/tipomaterial/:id", ControllerFabcompTipoMaterial.Editar);
// DELETE
routeFabcompTipoMaterial.delete("/tipomaterial/:id", ControllerFabcompTipoMaterial.Deletar);

export default routeFabcompTipoMaterial