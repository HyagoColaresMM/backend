import { Router } from "express"
import ControllerFolhaSetores from "../controllers/folhasetores.controller.js"

const routeFolhaSetores = Router()

// GET
routeFolhaSetores.get("/folhasetores", ControllerFolhaSetores.Listar);
// POST
routeFolhaSetores.post("/folhasetores", ControllerFolhaSetores.Inserir);
// UPDATE
routeFolhaSetores.put("/folhasetores/:id", ControllerFolhaSetores.Editar);
// DELETE
routeFolhaSetores.delete("/folhasetores/:id", ControllerFolhaSetores.Deletar);

export default routeFolhaSetores