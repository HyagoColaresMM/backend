import {
    executeQuery,
    dbOptions,
    firebird,
    executeQueryTransaction,
} from "../config/database.js";

const Listar = (idTipoPessoa, nome, cidade, fone1, fone, precoMedio, endereco, bairro, uf, cep, cxPostal, obs, rg, cpf, apelido, limit, skip) => {
    return new Promise((resolve, reject) => {
        //let ssql1 = 'SELECT ID, NOME, FOLHA_SETORES_ID, FOLHA_FUNCOES_ID, CREATED_AT FROM EXTRATORES WHERE DELETED_AT IS NULL ';
        let ssql = `SELECT`
        ssql += ` FIRST ${limit} SKIP ${skip} `
        ssql += ` ROW_NUMBER() OVER (ORDER BY CREATED_AT ASC) AS CODIGO,`
        ssql += `
            e.ID,
            tp.DESCRICAO AS DESCRICAO_TIPO,
            e.NOME,
            e.CIDADE,
            e.FONE1,
            e.FONE,
            e.PRECO_MEDIO,
            e.ENDERECO,
            e.BAIRRO,
            e.UF,
            e.CEP,
            e.CX_POSTAL,
            e.OBS,
            e.RG,
            e.CPF,
            e.APELIDO
        FROM EXTRATORES e
        LEFT JOIN TIPO_PESSOA tp ON  e.TIPO_PESSOA_ID = tp.ID
        WHERE e.DELETED_AT IS NULL
        `

        let params = [];

        firebird.attach(dbOptions, (err, db) => {
            if (err) return reject({ error: 'Erro ao conectar no banco de dados', details: err });

            db.transaction(firebird.ISOLATION_READ_COMMITTED, (err, transaction) => {
                if (err) return reject({ error: 'Erro ao iniciar transação', details: err });

                transaction.query(ssql, params, (err, result) => {
                    if (err) {
                        transaction.rollback();
                        return reject({ error: 'Erro ao executar busca', details: err });
                    }

                    transaction.commit((err) => {
                        if (err) {
                            transaction.rollback();
                            return reject({ error: 'Erro ao cometer transação', details: err });
                        }

                        resolve(result);
                    });
                });
            });
        });
    });
};

const Inserir = (idTipoPessoa, nome, cidade, fone1, fone, precoMedio, endereco, bairro, uf, cep, cxPostal, obs, rg, cpf, apelido, callback) => {
    let ssqlMaxId = "SELECT MAX(ID) AS MAX_ID FROM EXTRATORES";

    firebird.attach(dbOptions, (err, db) => {
        if (err) {
            return callback({ error: 'Erro ao conectar no banco de dados', details: err });
        }

        db.query(ssqlMaxId, [], (err, result) => {
            if (err) {
                db.detach();
                return callback({ error: 'Erro ao buscar o ID máximo', details: err });
            }

            let maxId = result[0].max_id || 0;
            let newId = maxId + 1;
            let params = [newId, idTipoPessoa, nome, cidade, fone1, fone, precoMedio, endereco, bairro, uf, cep, cxPostal, obs, rg, cpf, apelido];
            let ssqlInsert = 'INSERT INTO EXTRATORES(ID, TIPO_PESSOA_ID, NOME, CIDADE, FONE1, FONE, PRECO_MEDIO, ENDERECO, BAIRRO, UF, CEP, CX_POSTAL, OBS, RG, CPF, APELIDO, CREATED_AT) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP) RETURNING ID';

        db.transaction(firebird.ISOLATION_READ_COMMITTED, (err, transaction) => {
            if (err) {
                db.detach();
                return callback({ error: 'Erro ao iniciar transação', details: err });
            }

            transaction.query(ssqlInsert, params, (err, result) => {
                if (err) {
                    transaction.rollback();
                    db.detach();
                    return callback({ error: 'Erro ao inserir registro', details: err });
                }

                transaction.commit((err) => {
                    if (err) {
                        transaction.rollback();
                        db.detach();
                        return callback({ error: 'Erro ao cometer transação', details: err });
                    }

                    db.detach();
                    callback(null, result);
                });
            });
        });
    });
});
};

const Editar = (id, idTipoPessoa, nome, cidade, fone1, fone, precoMedio, endereco, bairro, uf, cep, cxPostal, obs, rg, cpf, apelido) => {
    return new Promise((resolve, reject) => {
        let ssql = 'UPDATE EXTRATORES SET UPDATED_AT = CURRENT_TIMESTAMP, ';
        const params = [];

        if (idTipoPessoa) {
            ssql += "TIPO_PESSOA_ID = ?, ";
            params.push(idTipoPessoa);
        }

        if (nome) {
            ssql += "NOME = ?, ";
            params.push(nome);
        }

        if (cidade) {
            ssql += "CIDADE = ?, ";
            params.push(cidade);
        }

        if (fone1) {
            ssql += "FONE1 = ?, ";
            params.push(fone1);
        }

        if (fone) {
            ssql += "FONE = ?, ";
            params.push(fone);
        }
        
        if (precoMedio) {
            ssql += "PRECO_MEDIO = ?, ";
            params.push(precoMedio);
        }

        if (endereco) {
            ssql += "ENDERECO = ?, ";
            params.push(endereco);
        }

        if (bairro) {
            ssql += "BAIRRO = ?, ";
            params.push(bairro);
        }

        if (uf) {
            ssql += "UF = ?, ";
            params.push(uf);
        }

        if (cep) {
            ssql += "CEP = ?, ";
            params.push(cep);
        }

        if (cxPostal) {
            ssql += "CX_POSTAL = ?, ";
            params.push(cxPostal);
        }

        if (obs) {
            ssql += "OBS = ?, ";
            params.push(obs);
        }

        if (rg) {
            ssql += "RG = ?, ";
            params.push(rg);
        }

        if (cpf) {
            ssql += "CPF = ?, ";
            params.push(cpf);
        }

        if (apelido) {
            ssql += "APELIDO = ?, ";
            params.push(apelido);
        }

        ssql = ssql.slice(0, -2);

        ssql += ' WHERE ID = ?';
        params.push(id);

        firebird.attach(dbOptions, (err, db) => {
            if (err) {
                return reject({ error: 'Erro ao conectar no banco de dados', details: err });
            }

            db.transaction(firebird.ISOLATION_READ_COMMITTED, (err, transaction) => {
                if (err) {
                    console.error('Erro ao iniciar transação:', err);
                }

                transaction.query(ssql, params, (err, result) => {
                    if (err) {
                        transaction.rollback();
                        console.error('Erro ao executar atualização:', err);
                        return reject({ error: 'Erro ao executar atualização', details: err });
                    } else {
                        transaction.commit((err) => {
                            if (err) {
                                transaction.rollback();
                                console.error('Erro ao cometer transação:', err);
                                return reject({ error: 'Erro ao cometer transação', details: err });
                            } else {
                                console.log('Transação bem-sucedida!');
                                resolve(result);
                            }
                        });
                    }
                });
            });
        });
    });
};

const Deletar = (id) => {
    return new Promise((resolve, reject) => {
        let ssql = 'UPDATE EXTRATORES SET DELETED_AT = CURRENT_TIMESTAMP, ';
        const params = [];

        ssql = ssql.slice(0, -2);

        ssql += ' WHERE ID = ?';
        params.push(id);

        firebird.attach(dbOptions, (err, db) => {
            if (err) {
                return reject({ error: 'Erro ao conectar no banco de dados', details: err });
            }

            db.transaction(firebird.ISOLATION_READ_COMMITTED, (err, transaction) => {
                if (err) {
                    console.error('Erro ao iniciar transação:', err);
                }

                transaction.query(ssql, params, (err, result) => {
                    if (err) {
                        transaction.rollback();
                        console.error('Erro ao excluir registro:', err);
                        return reject({ error: 'Erro ao excluir registro', details: err });
                    } else {
                        transaction.commit((err) => {
                            if (err) {
                                transaction.rollback();
                                console.error('Erro ao excluir dados:', err);
                                return reject({ error: 'Erro ao excluir dados', details: err });
                            } else {
                                console.log('Registro excluido bem-sucedida!');
                                resolve(result);
                            }
                        });
                    }
                });
            });
        });
    });
};

const Deletar2 = (id, callback) => {
    let params = [id]
    let ssql = "DELETE FROM EXTRATORES WHERE ID = ? "; //AND DELETED_AT = ''

    executeQuery(ssql, params, callback)
};

export default { Listar, Inserir, Editar, Deletar }