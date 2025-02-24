import { Router } from "express"
import ControllerFolhaRubricas from "../controllers/folharubricas.controller.js"

const routeFolhaRubricas = Router()

// GET
routeFolhaRubricas.get("/folharubricas", ControllerFolhaRubricas.Listar);
// POST
routeFolhaRubricas.post("/folharubricas", ControllerFolhaRubricas.Inserir);
// UPDATE
routeFolhaRubricas.put("/folharubricas/:id", ControllerFolhaRubricas.Editar);
// DELETE
routeFolhaRubricas.delete("/folharubricas/:id", ControllerFolhaRubricas.Deletar);

export default routeFolhaRubricas