import { Router } from "express"
import ControllerFabcompTmSubgrupo1 from "../controllers/fabcomptmsubgrupo1.controller.js"

const routeFabcompTmSubgrupo1 = Router()

// GET
routeFabcompTmSubgrupo1.get("/tmsubgrupo1", ControllerFabcompTmSubgrupo1.Listar);
// POST
routeFabcompTmSubgrupo1.post("/tmsubgrupo1", ControllerFabcompTmSubgrupo1.Inserir);
// UPDATE
routeFabcompTmSubgrupo1.put("/tmsubgrupo1/:id", ControllerFabcompTmSubgrupo1.Editar);
// DELETE
routeFabcompTmSubgrupo1.delete("/tmsubgrupo1/:id", ControllerFabcompTmSubgrupo1.Deletar);

export default routeFabcompTmSubgrupo1