import { Router } from "express"
import ControllerFabcompSg2Tm from "../controllers/fabcompsg2tm.controller.js"

const routeFabcompSg2Tm = Router()

// GET
routeFabcompSg2Tm.get("/sg2tm", ControllerFabcompSg2Tm.Listar);
// POST
routeFabcompSg2Tm.post("/sg2tm", ControllerFabcompSg2Tm.Inserir);
// UPDATE
routeFabcompSg2Tm.put("/sg2tm/:id", ControllerFabcompSg2Tm.Editar);
// DELETE
routeFabcompSg2Tm.delete("/sg2tm/:id", ControllerFabcompSg2Tm.Deletar);

export default routeFabcompSg2Tm