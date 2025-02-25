import ServiceSubGrupoEstoque from "../services/subgrupoestoque.service.js"

const Listar = (req, res) => {
    const descricao = req.query.descricao

    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const skip = (page - 1) * limit;

    ServiceSubGrupoEstoque.Listar(descricao, limit, skip)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
};

const Inserir = (req, res) => {
    let descricao = req.body.descricao

    ServiceSubGrupoEstoque.Inserir(descricao, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json({ id: result.id });
    });
};

const Editar =  (req, res) => {
    const id = parseInt(req.params.id, 10)
    const descricao = req.body.descricao

    ServiceSubGrupoEstoque.Editar(id, descricao)
    .then(() => {
        res.status(200).json({ message: 'SubGrupoEstoque atualizado com sucesso' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

};

const Deletar =  (req, res) => {
    const id = parseInt(req.params.id, 10)

    ServiceSubGrupoEstoque.Deletar(id)
    .then(() => {
        res.status(200).json({ message: 'SubGrupoEstoque atualizado com sucesso' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

};

const Deletar2 = (req, res) => {
    let id = parseInt(req.params.id, 10);

    ServiceSubGrupoEstoque.Deletar(id, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            if (result && result.length === 0) {
                res.status(404).json({ message: "SubGrupoEstoque não encontrado." });
            } else {
                res.status(200).json({ message: "SubGrupoEstoque excluído com sucesso." });
            }
        }
    });
};

export default { Listar, Inserir, Editar, Deletar }