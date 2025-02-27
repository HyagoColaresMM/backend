import ServiceFabcompTmSubgrupo1 from '../services/fabcomptmsubgrupo1.service.js';

const Listar = (req, res) => {
    const tipoMaterial = req.query.fabcomp_tipomaterial_id
    const sg1Tm = req.query.fabcomp_sg1_tm_id

    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);
    const skip = (page - 1) * limit;

    ServiceFabcompTmSubgrupo1.Listar(tipoMaterial, sg1Tm, limit, skip)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
};

const Inserir = (req, res) => {
    const tipoMaterial = req.body.fabcomp_tipomaterial_id
    const sg1Tm = req.body.fabcomp_sg1_tm_id

    ServiceFabcompTmSubgrupo1.Inserir(tipoMaterial, sg1Tm, (err, result) => {
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
        res.status(200).json({ message: 'TmSubgrupo1 atualizado com sucesso' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

};

const Deletar =  (req, res) => {
    const id = parseInt(req.params.id, 10)

    ServiceFabcompTmSubgrupo1.Deletar(id)
    .then(() => {
        res.status(200).json({ message: 'TmSubgrupo1 atualizado com sucesso' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

};

const Deletar2 = (req, res) => {
    let id = parseInt(req.params.id, 10);

    ServiceFabcompTmSubgrupo1.Deletar(id, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            if (result && result.length === 0) {
                res.status(404).json({ message: "TmSubgrupo1 não encontrado." });
            } else {
                res.status(200).json({ message: "TmSubgrupo1 excluído com sucesso." });
            }
        }
    });
};

export default { Listar, Inserir, Editar, Deletar }