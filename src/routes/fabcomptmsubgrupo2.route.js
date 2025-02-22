import { Router } from "express"
import ControllerFabcompTmSubgrupo2 from "../controllers/fabcomptmsubgrupo2.controller.js"

const routeFabcompTmSubgrupo2 = Router()

// GET
routeFabcompTmSubgrupo2.get("/tmsubgrupo2", ControllerFabcompTmSubgrupo2.Listar);
// POST
routeFabcompTmSubgrupo2.post("/tmsubgrupo2", ControllerFabcompTmSubgrupo2.Inserir);
// UPDATE
routeFabcompTmSubgrupo2.put("/tmsubgrupo2/:id", ControllerFabcompTmSubgrupo2.Editar);
// DELETE
routeFabcompTmSubgrupo2.delete("/tmsubgrupo2/:id", ControllerFabcompTmSubgrupo2.Deletar);

export default routeFabcompTmSubgrupo2