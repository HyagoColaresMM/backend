import { Router } from "express"
import ControllerFabcompSg1Tm from "../controllers/fabcompsg1tm.controller.js"

const routeFabcompSg1Tm = Router()

// GET
routeFabcompSg1Tm.get("/sg1tm", ControllerFabcompSg1Tm.Listar);
// POST
routeFabcompSg1Tm.post("/sg1tm", ControllerFabcompSg1Tm.Inserir);
// UPDATE
routeFabcompSg1Tm.put("/sg1tm/:id", ControllerFabcompSg1Tm.Editar);
// DELETE
routeFabcompSg1Tm.delete("/sg1tm/:id", ControllerFabcompSg1Tm.Deletar);

export default routeFabcompSg1Tm