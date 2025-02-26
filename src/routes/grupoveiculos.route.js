import { Router } from "express"
import ControllerGrupoVeiculos from "../controllers/grupoveiculos.controller.js"

const routeGrupoVeiculos = Router()

// GET
routeGrupoVeiculos.get("/grupoveiculos", ControllerGrupoVeiculos.Listar);
// POST
routeGrupoVeiculos.post("/grupoveiculos", ControllerGrupoVeiculos.Inserir);
// UPDATE
routeGrupoVeiculos.put("/grupoveiculos/:id", ControllerGrupoVeiculos.Editar);
// DELETE
routeGrupoVeiculos.delete("/grupoveiculos/:id", ControllerGrupoVeiculos.Deletar);

export default routeGrupoVeiculos