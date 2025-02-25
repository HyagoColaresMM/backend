import ServiceFolhaSetores from "../services/folhasetores.service.js"

const Listar = (req, res) => {
    const descricao = req.query.descricao

    ServiceFolhaSetores.Listar(descricao)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
};

const Inserir = (req, res) => {
    const descricao = req.body.descricao;

    ServiceFolhaSetores.Inserir(descricao, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json({ id: result.id });
    });
};

const Editar =  (req, res) => {
    const id = parseInt(req.params.id, 10)
    const descricao = req.body.descricao

    ServiceFolhaSetores.Editar(id, descricao)
    .then(() => {
        res.status(200).json({ message: 'FolhaSetores atualizado com sucesso' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

};

const Deletar =  (req, res) => {
    const id = parseInt(req.params.id, 10)

    ServiceFolhaSetores.Deletar(id)
    .then(() => {
        res.status(200).json({ message: 'FolhaSetores atualizado com sucesso' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

};

const Deletar2 = (req, res) => {
    let id = parseInt(req.params.id, 10);

    ServiceFolhaSetores.Deletar(id, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            if (result && result.length === 0) {
                res.status(404).json({ message: "FolhaSetores não encontrado." });
            } else {
                res.status(200).json({ message: "FolhaSetores excluído com sucesso." });
            }
        }
    });
};

export default { Listar, Inserir, Editar, Deletar }