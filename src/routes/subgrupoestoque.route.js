import { Router } from "express"
import ControllerSubGrupoEstoque from "../controllers/subgrupoestoque.controller.js"

const routeSubGrupoEstoque = Router()

// GET
routeSubGrupoEstoque.get("/subgrupoestoque", ControllerSubGrupoEstoque.Listar);
// POST
routeSubGrupoEstoque.post("/subgrupoestoque", ControllerSubGrupoEstoque.Inserir);
// UPDATE
routeSubGrupoEstoque.put("/subgrupoestoque/:id", ControllerSubGrupoEstoque.Editar);
// DELETE
routeSubGrupoEstoque.delete("/subgrupoestoque/:id", ControllerSubGrupoEstoque.Deletar);

export default routeSubGrupoEstoque