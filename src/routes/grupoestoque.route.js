import { Router } from "express"
import ControllerGrupoEstoque from "../controllers/grupoestoque.controller.js"

const routeGrupoEstoque = Router()

// GET
routeGrupoEstoque.get("/grupo-estoque", ControllerGrupoEstoque.Listar);
// POST
routeGrupoEstoque.post("/grupo-estoque", ControllerGrupoEstoque.Inserir);
// UPDATE
routeGrupoEstoque.put("/grupo-estoque/:id", ControllerGrupoEstoque.Editar);
// DELETE
routeGrupoEstoque.delete("/grupo-estoque/:id", ControllerGrupoEstoque.Deletar);

export default routeGrupoEstoque