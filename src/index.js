import express from "express";
import cors from "cors";
import routeProdutos from "./routes/produtos.route.js";
import routeFabcompTipoTora from "./routes/fabcomptipotora.route.js";
import routeFabcompTipoMaterial from "./routes/fabcomptipomaterial.route.js";
import routeGrupoEstoque from "./routes/grupoestoque.route.js";
import routeSubGrupoEstoque from "./routes/subgrupoestoque.route.js";
import routeFabcompSg1Tm from "./routes/fabcompsg1tm.route.js";
import routeFabcompSg2Tm from "./routes/fabcompsg2tm.route.js";
import routeFabcompTmSubgrupo1 from "./routes/fabcomptmsubgrupo1.route.js";
import routeFabcompTmSubgrupo2 from "./routes/fabcomptmsubgrupo2.route.js";
import routeFabcompTurnos from "./routes/fabcompturnos.route.js";
import routeFolhaRubricas from "./routes/folharubricas.route.js";
import routeFolhaFuncoes from "./routes/folhafuncoes.route.js";
import routeFolhaSetores from "./routes/folhasetores.route.js";
import routeFolhaFuncionarios from "./routes/folhafuncionarios.route.js";
import routeFolhaRiscos from "./routes/folhariscos.route.js";

const app = express();

app.use(express.json());
app.use(cors());

// Rota
app.use('/v1', routeProdutos)

/* Hyago */
app.use('/v1', routeFabcompTipoTora)
app.use('/v1', routeGrupoEstoque)
app.use('/v1', routeSubGrupoEstoque)
app.use('/v1', routeFabcompTipoMaterial)
app.use('/v1', routeFabcompSg1Tm)
app.use('/v1', routeFabcompSg2Tm)
app.use('/v1', routeFabcompTmSubgrupo1)
app.use('/v1', routeFabcompTmSubgrupo2)
app.use('/v1', routeFabcompTurnos)

app.use('/v1', routeFolhaRubricas)
app.use('/v1', routeFolhaFuncoes)
app.use('/v1', routeFolhaSetores)
app.use('/v1', routeFolhaFuncionarios)
app.use('/v1', routeFolhaRiscos)

/* Thiago */

const port = 5000;

// LISTANDO NA PORTA 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
