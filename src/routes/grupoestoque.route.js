import { Router } from "express"
import ControllerGrupoEstoque from "../controllers/grupoestoque.controller.js"

const routeGrupoEstoque = Router()

// GET
routeGrupoEstoque.get("/grupoestoque", ControllerGrupoEstoque.Listar);
// POST
routeGrupoEstoque.post("/grupoestoque", ControllerGrupoEstoque.Inserir);
// UPDATE
routeGrupoEstoque.put("/grupoestoque/:id", ControllerGrupoEstoque.Editar);
// DELETE
routeGrupoEstoque.delete("/grupoestoque/:id", ControllerGrupoEstoque.Deletar);

export default routeGrupoEstoque