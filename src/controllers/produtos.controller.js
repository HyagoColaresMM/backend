import ServiceProdutos from "../services/produtos.service.js"

const Listar = (req, res) => {
    const descricao = req.query.descricao
    const p_aprazo = req.query.p_aprazo

    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);
    const skip = (page - 1) * limit;

    ServiceProdutos.Listar(descricao, p_aprazo, limit, skip, (err, result) => {
        if (err) {
            res.status(500).json(err);
        }
        
        res.status(200).json(result)
    });
};

const Inserir = (req, res) => {
    let descricao = req.body.descricao
    let p_aprazo = req.body.p_aprazo

    ServiceProdutos.Inserir(descricao, p_aprazo, (err, result) => {
        if (err) {
            res.status(500).json(err);
        }

        res.status(200).json({ id_produto: result.id_produto });
    });
};

const Editar =  (req, res) => {
    const id = req.params.id;
    const descricao = req.body.descricao
    const p_aprazo = req.body.p_aprazo

    ServiceProdutos.Editar(id, descricao, p_aprazo)
    .then(() => {
        res.status(200).json({ message: 'Produto atualizado com sucesso' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

};

const Deletar = (req, res) => {
    let id = parseInt(req.params.id, 10);

    ServiceProdutos.Deletar(id, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            if (result && result.length === 0) {
                res.status(404).json({ message: "Produto não encontrado." });
            } else {
                res.status(200).json({ message: "Produto excluído com sucesso." });
            }
        }
    });
};

export default { Listar, Inserir, Editar, Deletar }