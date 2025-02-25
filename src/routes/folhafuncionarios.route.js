import { Router } from "express"
import ControllerFolhaFuncionarios from "../controllers/folhafuncionarios.controller.js"

const routeFolhaFuncionarios = Router()

// GET
routeFolhaFuncionarios.get("/folhafuncionarios", ControllerFolhaFuncionarios.Listar);
// POST
routeFolhaFuncionarios.post("/folhafuncionarios", ControllerFolhaFuncionarios.Inserir);
// UPDATE
routeFolhaFuncionarios.put("/folhafuncionarios/:id", ControllerFolhaFuncionarios.Editar);
// DELETE
routeFolhaFuncionarios.delete("/folhafuncionarios/:id", ControllerFolhaFuncionarios.Deletar);

export default routeFolhaFuncionarios