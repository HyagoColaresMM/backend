import { Router } from "express"
import ControllerFolhaRiscos from "../controllers/folhariscos.controller.js"

const routeFolhaRiscos = Router()

// GET
routeFolhaRiscos.get("/folhariscos", ControllerFolhaRiscos.Listar);
// POST
routeFolhaRiscos.post("/folhariscos", ControllerFolhaRiscos.Inserir);
// UPDATE
routeFolhaRiscos.put("/folhariscos/:id", ControllerFolhaRiscos.Editar);
// DELETE
routeFolhaRiscos.delete("/folhariscos/:id", ControllerFolhaRiscos.Deletar);

export default routeFolhaRiscos