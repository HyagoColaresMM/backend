import {
    executeQuery,
    dbOptions,
    firebird,
    executeQueryTransaction,
} from "../config/database.js";

const Listar = async (tipoMaterial, sg2Tm) => {
    return new Promise((resolve, reject) => {
        let ssql = 'SELECT ID, FABCOMP_TIPOMATERIAL_ID, FABCOMP_SG2_TM_ID,CREATED_AT, UPDATED_AT FROM FABCOMP_TM_SUBGRUPO2 WHERE ID > 0 ';
        const params = [];

        if (tipoMaterial) {
            ssql += 'AND FABCOMP_TIPOMATERIAL_ID = ?';
            params.push(tipoMaterial);
        }

        if (sg2Tm) {
            ssql += 'AND FABCOMP_SG2_TM_ID = ?';
            params.push(sg2Tm);
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

const Inserir = (tipoMaterial, sg2Tm, callback) => {
    let ssqlMaxId = "SELECT MAX(ID) AS MAX_ID FROM FABCOMP_TM_SUBGRUPO2";
    
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
            let params = [newId, tipoMaterial, sg2Tm];
            let ssqlInsert = "INSERT INTO FABCOMP_TM_SUBGRUPO2(ID, FABCOMP_TIPOMATERIAL_ID, FABCOMP_SG2_TM_ID, CREATED_AT) VALUES(?, ?, ?, CURRENT_TIMESTAMP) RETURNING ID";

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

const Editar = (id, tipoMaterial, sg2Tm) => {
    return new Promise((resolve, reject) => {
        let ssql = 'UPDATE FABCOMP_TM_SUBGRUPO2 SET ';
        const params = [];

        if (tipoMaterial) {
            ssql += 'FABCOMP_TIPOMATERIAL_ID = ?, ';
            params.push(tipoMaterial);
        }

        if (sg2Tm) {
            ssql += 'FABCOMP_SG2_TM_ID = ?, ';
            params.push(sg2Tm);
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
    let ssql = "DELETE FROM FABCOMP_TM_SUBGRUPO2F WHERE ID = ? "; //AND DELETED_AT = ''

    executeQuery(ssql, params, callback)
};

export default { Listar, Inserir, Editar, Deletar }