import { Router } from "express"
import ControllerTipoPessoa from "../controllers/tipopessoa.controller.js"

const routeTipoPessoa = Router()

// GET
routeTipoPessoa.get("/tipopessoa", ControllerTipoPessoa.Listar);
// POST
routeTipoPessoa.post("/tipopessoa", ControllerTipoPessoa.Inserir);
// UPDATE
routeTipoPessoa.put("/tipopessoa/:id", ControllerTipoPessoa.Editar);
// DELETE
routeTipoPessoa.delete("/tipopessoa/:id", ControllerTipoPessoa.Deletar);

export default routeTipoPessoa