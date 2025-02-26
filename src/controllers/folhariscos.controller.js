import ServiceFolhaRiscos from "../services/folhariscos.service.js"

const Listar = (req, res) => {
    const risco = req.query.risco
    const descricao = req.query.descricao_risco

    const limit = parseInt(req.query.limit, 10) || 10
    const page = parseInt(req.query.page, 10) || 1
    const skip = (page - 1) * limit

    ServiceFolhaRiscos.Listar(risco, descricao, limit, skip)
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch((err) => {
            return res.status(500).json(err)
        })
};

const Inserir = (req, res) => {
    const risco = req.body.risco
    const descricao = req.body.descricao_risco

    ServiceFolhaRiscos.Inserir(risco, descricao, (err, result) => {
        if (err) {
            return res.status(500).json(err)
        }

        return res.status(200).json({ id: result.id })
    })
}

const Editar = (req, res) => {
    const id = parseInt(req.params.id, 10)
    const risco = req.body.risco
    const descricao = req.body.descricao_risco

    ServiceFolhaRiscos.Editar(id, risco, descricao)
        .then(() => {
            res.status(200).json({ message: 'FolhaRiscos atualizado com sucesso' })
        })
        .catch((err) => {
            res.status(500).json(err)
        })

};

const Deletar = (req, res) => {
    const id = parseInt(req.params.id, 10)

    ServiceFolhaRiscos.Deletar(id)
        .then(() => {
            res.status(200).json({ message: 'FolhaRiscos atualizado com sucesso' })
        })
        .catch((err) => {
            res.status(500).json(err)
        })

};

const Deletar2 = (req, res) => {
    let id = parseInt(req.params.id, 10)

    ServiceFolhaRiscos.Deletar(id, (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            if (result && result.length === 0) {
                res.status(404).json({ message: "FolhaRiscos não encontrado." })
            } else {
                res.status(200).json({ message: "FolhaRiscos excluído com sucesso." })
            }
        }
    })
}

export default { Listar, Inserir, Editar, Deletar }