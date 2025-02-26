import {
    executeQuery,
    dbOptions,
    firebird,
    executeQueryTransaction,
} from "../config/database.js";

const Listar = (risco, descricao_risco, limit, skip) => {
    return new Promise((resolve, reject) => {
        let ssql = 'SELECT';
        ssql += ` FIRST ${limit} SKIP ${skip}`
        ssql += ` ROW_NUMBER() OVER (ORDER BY CREATED_AT ASC) AS CODIGO,`
        ssql += ' ID, RISCO, DESCRICAO_RISCO FROM FOLHA_RISCOS WHERE DELETED_AT IS NULL ';
        let params = [];

        if (risco) {
            ssql += "AND RISCO = ?";
            params.push(risco);
        }

        if (descricao_risco) {
            ssql += "AND DESCRICAO_RISCO = ?";
            params.push(descricao_risco);
        }

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

const Inserir = (risco, descricao_risco, callback) => {
    let ssqlMaxId = "SELECT MAX(ID) AS MAX_ID FROM FOLHA_RISCOS";

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
            let params = [newId, risco, descricao_risco];
            let ssqlInsert = "INSERT INTO FOLHA_RISCOS(ID, RISCO, DESCRICAO_RISCO, CREATED_AT) VALUES(?, ?, ?, CURRENT_TIMESTAMP) RETURNING ID";

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

const Editar = (id, risco, descricao_risco) => {
    return new Promise((resolve, reject) => {
        let ssql = 'UPDATE FOLHA_RISCOS SET UPDATED_AT = CURRENT_TIMESTAMP, ';
        const params = [];

        if (risco) {
            ssql += "RISCO = ?, ";
            params.push(risco);
        }

        if (descricao_risco) {
            ssql += "DESCRICAO_RISCO = ?, ";
            params.push(descricao_risco);
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
        let ssql = 'UPDATE FOLHA_RISCOS SET DELETED_AT = CURRENT_TIMESTAMP, ';
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
    let ssql = "DELETE FROM FOLHA_RISCOS WHERE ID = ? "; //AND DELETED_AT = ''

    executeQuery(ssql, params, callback)
};

export default { Listar, Inserir, Editar, Deletar }