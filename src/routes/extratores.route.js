import { Router } from "express"
import ControllerExtratores from "../controllers/extratores.controller.js"

const routeExtratores = Router()

// GET
routeExtratores.get("/extratores", ControllerExtratores.Listar);
// POST
routeExtratores.post("/extratores", ControllerExtratores.Inserir);
// UPDATE
routeExtratores.put("/extratores/:id", ControllerExtratores.Editar);
// DELETE
routeExtratores.delete("/extratores/:id", ControllerExtratores.Deletar);

export default routeExtratores