import { Router } from "express"
import ControllerGrupoDespesas from "../controllers/grupodespesas.controller.js"

const routeGrupoDespesas = Router()

// GET
routeGrupoDespesas.get("/gruposdespesas", ControllerGrupoDespesas.Listar);
// POST
routeGrupoDespesas.post("/gruposdespesas", ControllerGrupoDespesas.Inserir);
// UPDATE
routeGrupoDespesas.put("/gruposdespesas/:id", ControllerGrupoDespesas.Editar);
// DELETE
routeGrupoDespesas.delete("/gruposdespesas/:id", ControllerGrupoDespesas.Deletar);

export default routeGrupoDespesas