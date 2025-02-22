import { Router } from "express"
import ControllerFabcompTurnos from "../controllers/fabcompturnos.controller.js"

const routeFabcompTurnos = Router()

// GET
routeFabcompTurnos.get("/turnos", ControllerFabcompTurnos.Listar);
// POST
routeFabcompTurnos.post("/turnos", ControllerFabcompTurnos.Inserir);
// UPDATE
routeFabcompTurnos.put("/turnos/:id", ControllerFabcompTurnos.Editar);
// DELETE
routeFabcompTurnos.delete("/turnos/:id", ControllerFabcompTurnos.Deletar);

export default routeFabcompTurnos