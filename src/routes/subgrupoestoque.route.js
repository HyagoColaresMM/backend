import { Router } from "express"
import ControllerSubGrupoEstoque from "../controllers/subgrupoestoque.controller.js"

const routeSubGrupoEstoque = Router()

// GET
routeSubGrupoEstoque.get("/subgrupo-estoque", ControllerSubGrupoEstoque.Listar);
// POST
routeSubGrupoEstoque.post("/subgrupo-estoque", ControllerSubGrupoEstoque.Inserir);
// UPDATE
routeSubGrupoEstoque.put("/subgrupo-estoque/:id", ControllerSubGrupoEstoque.Editar);
// DELETE
routeSubGrupoEstoque.delete("/subgrupo-estoque/:id", ControllerSubGrupoEstoque.Deletar);

export default routeSubGrupoEstoque