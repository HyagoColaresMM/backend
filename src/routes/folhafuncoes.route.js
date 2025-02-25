import { Router } from "express"
import ControllerFolhaFuncoes from "../controllers/folhafuncoes.controller.js"

const routeFolhaFuncoes = Router()

// GET
routeFolhaFuncoes.get("/folhafuncoes", ControllerFolhaFuncoes.Listar);
// POST
routeFolhaFuncoes.post("/folhafuncoes", ControllerFolhaFuncoes.Inserir);
// UPDATE
routeFolhaFuncoes.put("/folhafuncoes/:id", ControllerFolhaFuncoes.Editar);
// DELETE
routeFolhaFuncoes.delete("/folhafuncoes/:id", ControllerFolhaFuncoes.Deletar);

export default routeFolhaFuncoes