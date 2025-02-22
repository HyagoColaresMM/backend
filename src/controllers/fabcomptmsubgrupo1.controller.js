import ServiceFabcompTmSubgrupo1 from '../services/fabcomptmsubgrupo1.service.js';

const Listar = (req, res) => {
    const tipoMaterial = req.params.fabcomp_tipomaterial_id
    const sg1Tm = req.params.fabcomp_sg1_tm_id

    ServiceFabcompTmSubgrupo1.Listar(tipoMaterial, sg1Tm)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
};

const Inserir = (req, res) => {
    const id = parseInt(req.body.id, 10)
    const tipoMaterial = req.body.fabcomp_tipomaterial_id
    const sg1Tm = req.body.fabcomp_sg1_tm_id

    ServiceFabcompTmSubgrupo1.Inserir(id, tipoMaterial, sg1Tm, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json({ id: result.id });
    });
};

const Editar =  (req, res) => {
    const id = parseInt(req.params.id, 10)
    const tipoMaterial = req.body.fabcomp_tipomaterial_id
    const sg1Tm = req.body.fabcomp_sg1_tm_id

    ServiceFabcompTmSubgrupo1.Editar(id, tipoMaterial, sg1Tm)
    .then(() => {
        res.status(200).json({ message: 'Grupo estoque atualizado com sucesso' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

};

const Deletar = (req, res) => {
    let id = parseInt(req.params.id, 10);

    ServiceFabcompTmSubgrupo1.Deletar(id, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            if (result && result.length === 0) {
                res.status(404).json({ message: "Grupo-Estoque não encontrado." });
            } else {
                res.status(200).json({ message: "Grupo-Estoque excluído com sucesso." });
            }
        }
    });
};

export default { Listar, Inserir, Editar, Deletar }