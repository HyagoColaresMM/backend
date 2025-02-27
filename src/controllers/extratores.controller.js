import ServiceExtratores from "../services/extratores.service.js"

const Listar = (req, res) => {
    const idTipoPessoa = req.query.tipo_pessoa_id
    const nome = req.query.nome
    const cidade = req.query.cidade
    const fone1 = req.query.fone1
    const fone = req.query.fone
    const precoMedio = req.query.preco_medio
    const endereco = req.query.endereco
    const bairro = req.query.bairro
    const uf = req.query.uf
    const cep = req.query.cep
    const cxPostal = req.query.cx_postal
    const obs = req.query.obs
    const rg = req.query.rg
    const cpf = req.query.cpf
    const apelido = req.query.apelido
    
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);
    const skip = (page - 1) * limit;

    ServiceExtratores.Listar(idTipoPessoa, nome, cidade, fone1, fone, precoMedio, endereco, bairro, uf, cep, cxPostal, obs, rg, cpf, apelido, limit, skip)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
};

const Inserir = (req, res) => {
    const idTipoPessoa = req.body.tipo_pessoa_id
    const nome = req.body.nome
    const cidade = req.body.cidade
    const fone1 = req.body.fone1
    const fone = req.body.fone
    const precoMedio = req.body.preco_medio
    const endereco = req.body.endereco
    const bairro = req.body.bairro
    const uf = req.body.uf
    const cep = req.body.cep
    const cxPostal = req.body.cx_postal
    const obs = req.body.obs
    const rg = req.body.rg
    const cpf = req.body.cpf
    const apelido = req.body.apelido

    ServiceExtratores.Inserir(idTipoPessoa, nome, cidade, fone1, fone, precoMedio, endereco, bairro, uf, cep, cxPostal, obs, rg, cpf, apelido, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json({ id: result.id });
    });
};

const Editar =  (req, res) => {
    const id = parseInt(req.params.id, 10)
    const idTipoPessoa = req.body.tipo_pessoa_id
    const nome = req.body.nome
    const cidade = req.body.cidade
    const fone1 = req.body.fone1
    const fone = req.body.fone
    const precoMedio = req.body.preco_medio
    const endereco = req.body.endereco
    const bairro = req.body.bairro
    const uf = req.body.uf
    const cep = req.body.cep
    const cxPostal = req.body.cx_postal
    const obs = req.body.obs
    const rg = req.body.rg
    const cpf = req.body.cpf
    const apelido = req.body.apelido

    ServiceExtratores.Editar(id, idTipoPessoa, nome, cidade, fone1, fone, precoMedio, endereco, bairro, uf, cep, cxPostal, obs, rg, cpf, apelido,)
    .then(() => {
        res.status(200).json({ message: 'Extratores atualizado com sucesso' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

};

const Deletar =  (req, res) => {
    const id = parseInt(req.params.id, 10)

    ServiceExtratores.Deletar(id)
    .then(() => {
        res.status(200).json({ message: 'Extratores atualizado com sucesso' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

};

const Deletar2 = (req, res) => {
    let id = parseInt(req.params.id, 10);

    ServiceExtratores.Deletar(id, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            if (result && result.length === 0) {
                res.status(404).json({ message: "Extratores não encontrado." });
            } else {
                res.status(200).json({ message: "Extratores excluído com sucesso." });
            }
        }
    });
};

export default { Listar, Inserir, Editar, Deletar }