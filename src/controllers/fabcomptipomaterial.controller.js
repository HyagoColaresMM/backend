import ServiceFabcompTipoMaterial from "../services/fabcomptipomaterial.service.js"

const Listar = (req, res) => {
    const descricao = req.query.descricao

    ServiceFabcompTipoMaterial.Listar(descricao)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
};

const Inserir = (req, res) => {
    let descricao = req.body.descricao

    ServiceFabcompTipoMaterial.Inserir(descricao, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json({ id: result.id });
    });
};

const Editar =  (req, res) => {
    const id = parseInt(req.params.id, 10)
    const descricao = req.body.descricao

    ServiceFabcompTipoMaterial.Editar(id, descricao)
    .then(() => {
        res.status(200).json({ message: 'Grupo estoque atualizado com sucesso' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

};

const Deletar =  (req, res) => {
    const id = parseInt(req.params.id, 10)

    ServiceFabcompTipoMaterial.Deletar(id)
    .then(() => {
        res.status(200).json({ message: 'Grupo estoque atualizado com sucesso' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

};

const Deletar2 = (req, res) => {
    let id = parseInt(req.params.id, 10);

    ServiceFabcompTipoMaterial.Deletar(id, (err, result) => {
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