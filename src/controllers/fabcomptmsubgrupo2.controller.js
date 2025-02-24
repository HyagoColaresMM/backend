import ServiceFabcompTmSubgrupo2 from '../services/fabcomptmsubgrupo2.service.js';

const Listar = (req, res) => {
    const tipoMaterial = req.params.fabcomp_tipomaterial_id
    const sg2Tm = req.params.fabcomp_sg2_tm_id

    ServiceFabcompTmSubgrupo2.Listar(tipoMaterial, sg2Tm)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
};

const Inserir = (req, res) => {
    const tipoMaterial = req.body.fabcomp_tipomaterial_id
    const sg2Tm = req.body.fabcomp_sg2_tm_id

    ServiceFabcompTmSubgrupo2.Inserir(tipoMaterial, sg2Tm, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json({ id: result.id });
    });
};

const Editar =  (req, res) => {
    const id = parseInt(req.params.id, 10)
    const tipoMaterial = req.body.fabcomp_tipomaterial_id
    const sg2Tm = req.body.fabcomp_sg2_tm_id

    ServiceFabcompTmSubgrupo2.Editar(id, tipoMaterial, sg2Tm)
    .then(() => {
        res.status(200).json({ message: 'Grupo estoque atualizado com sucesso' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

};

const Deletar =  (req, res) => {
    const id = parseInt(req.params.id, 10)

    ServiceFabcompTmSubgrupo2.Deletar(id)
    .then(() => {
        res.status(200).json({ message: 'Grupo estoque atualizado com sucesso' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

};

const Deletar2 = (req, res) => {
    let id = parseInt(req.params.id, 10);

    ServiceFabcompTmSubgrupo2.Deletar(id, (err, result) => {
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