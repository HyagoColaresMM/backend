import ServiceFolhaFuncionarios from "../services/folhafuncionarios.service.js"

const Listar = (req, res) => {
    const nome = req.query.nome;
    const folhaSetores = req.query.folha_setores_id;
    const folhaFuncoes = req.query.folha_funcoes_id;
    
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const skip = (page - 1) * limit;

    ServiceFolhaFuncionarios.Listar(nome, folhaSetores, folhaFuncoes, limit, skip)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
};

const Inserir = (req, res) => {
    const nome = req.body.nome
    const folhaSetores = req.body.folha_setores_id
    const folhaFuncoes = req.body.folha_funcoes_id

    ServiceFolhaFuncionarios.Inserir(nome, folhaSetores, folhaFuncoes, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json({ id: result.id });
    });
};

const Editar =  (req, res) => {
    const id = parseInt(req.params.id, 10)
    const nome = req.body.nome
    const folhaSetores = req.body.folha_setores_id
    const folhaFuncoes = req.body.folha_funcoes_id

    ServiceFolhaFuncionarios.Editar(id, nome, folhaSetores, folhaFuncoes)
    .then(() => {
        res.status(200).json({ message: 'FolhaFuncionarios atualizado com sucesso' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

};

const Deletar =  (req, res) => {
    const id = parseInt(req.params.id, 10)

    ServiceFolhaFuncionarios.Deletar(id)
    .then(() => {
        res.status(200).json({ message: 'FolhaFuncionarios atualizado com sucesso' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

};

const Deletar2 = (req, res) => {
    let id = parseInt(req.params.id, 10);

    ServiceFolhaFuncionarios.Deletar(id, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            if (result && result.length === 0) {
                res.status(404).json({ message: "FolhaFuncionarios não encontrado." });
            } else {
                res.status(200).json({ message: "FolhaFuncionarios excluído com sucesso." });
            }
        }
    });
};

export default { Listar, Inserir, Editar, Deletar }