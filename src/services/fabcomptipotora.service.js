import {
    executeQuery,
    dbOptions,
    firebird,
    executeQueryTransaction,
} from "../config/database.js";

const Listar = async (descricao) => {
    return new Promise((resolve, reject) => {
        let ssql = 'SELECT ID, DESCRICAO FROM FABCOMP_TIPO_TORA WHERE ID > 0 ';
        const params = [];

        if (descricao) {
            ssql += 'AND DESCRICAO = ?';
            params.push(descricao);
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

const Inserir = (id, descricao, callback) => {
    let params = [id, descricao];
    let ssql =
        "INSERT INTO FABCOMP_TIPO_TORA(ID, DESCRICAO) VALUES(?, ?) RETURNING ID";

    executeQuery(ssql, params, callback);
};

const Editar = (id, descricao) => {
    return new Promise((resolve, reject) => {
        let ssql = 'UPDATE FABCOMP_TIPO_TORA SET ';
        const params = [];

        if (descricao) {
            ssql += "DESCRICAO = ?, ";
            params.push(descricao);
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

const Deletar = (id, callback) => {
    let params = [id]
    let ssql = "DELETE FROM FABCOMP_TIPO_TORA WHERE ID = ? "; //AND DELETED_AT = ''

    executeQuery(ssql, params, callback)
};

export default { Listar, Inserir, Editar, Deletar }