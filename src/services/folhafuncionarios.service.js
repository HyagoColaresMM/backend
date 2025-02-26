import {
    executeQuery,
    dbOptions,
    firebird,
    executeQueryTransaction,
} from "../config/database.js";

const Listar = (nome, folhaSetores, folhaFuncoes, limit, skip) => {
    return new Promise((resolve, reject) => {
        //let ssql1 = 'SELECT ID, NOME, FOLHA_SETORES_ID, FOLHA_FUNCOES_ID, CREATED_AT FROM FOLHA_FUNCIONARIOS WHERE DELETED_AT IS NULL ';
        let ssql = `SELECT`
        ssql += ` FIRST ${limit} SKIP ${skip} `
        ssql += ` ROW_NUMBER() OVER (ORDER BY CREATED_AT ASC) AS CODIGO,`
        ssql += `
            f.ID,
            f.NOME,
            fs.DESCRICAO AS DESCRICAO_FOLHA_SETORES,
            ff.DESCRICAO AS DESCRICAO_FOLHA_FUNCOES
        FROM FOLHA_FUNCIONARIOS f
        LEFT JOIN FOLHA_SETORES fs ON  f.FOLHA_SETORES_ID = fs.ID
        LEFT JOIN FOLHA_FUNCOES ff ON f.FOLHA_FUNCOES_ID = ff.ID
        WHERE f.DELETED_AT IS NULL
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

const Inserir = (nome, folhaSetores, folhaFuncoes, callback) => {
    let ssqlMaxId = "SELECT MAX(ID) AS MAX_ID FROM FOLHA_FUNCIONARIOS";
    
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
            let params = [newId, nome, folhaSetores, folhaFuncoes];
            let ssqlInsert = "INSERT INTO FOLHA_FUNCIONARIOS(ID, NOME, FOLHA_SETORES_ID, FOLHA_FUNCOES_ID, CREATED_AT) VALUES(?, ?, ?, ?, CURRENT_TIMESTAMP) RETURNING ID";

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

const Editar = (id, nome, folhaSetores, folhaFuncoes) => {
    return new Promise((resolve, reject) => {
        let ssql = 'UPDATE FOLHA_FUNCIONARIOS SET UPDATED_AT = CURRENT_TIMESTAMP, ';
        const params = [];

        if (nome) {
            ssql += "NOME = ?, ";
            params.push(nome);
        }

        if (folhaSetores) {
            ssql += "FOLHA_SETORES_ID = ?, ";
            params.push(folhaSetores);
        }

        if (folhaFuncoes) {
            ssql += "FOLHA_FUNCOES_ID = ?, ";
            params.push(folhaFuncoes);
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
        let ssql = 'UPDATE FOLHA_FUNCIONARIOS SET DELETED_AT = CURRENT_TIMESTAMP, ';
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
    let ssql = "DELETE FROM FOLHA_FUNCIONARIOS WHERE ID = ? "; //AND DELETED_AT = ''

    executeQuery(ssql, params, callback)
};

export default { Listar, Inserir, Editar, Deletar }