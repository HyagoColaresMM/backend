import {
    executeQuery,
    dbOptions,
    firebird,
    executeQueryTransaction,
} from "../config/database.js";

const Listar = async (tipoMaterial, sg1Tm) => {
    return new Promise((resolve, reject) => {
        let ssql = 'SELECT ID, FABCOMP_TIPOMATERIAL_ID, FABCOMP_SG1_TM_ID FROM FABCOMP_TM_SUBGRUPO1 WHERE ID > 0 ';
        const params = [];

        if (tipoMaterial) {
            ssql += 'AND FABCOMP_TIPOMATERIAL_ID = ?';
            params.push(tipoMaterial);
        }

        if (sg1Tm) {
            ssql += 'AND FABCOMP_SG1_TM_ID = ?';
            params.push(sg1Tm);
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

const Inserir = (id,  tipoMaterial, sg1Tm, callback) => {
    let params = [id, tipoMaterial, sg1Tm];
    let ssql =
        "INSERT INTO FABCOMP_TM_SUBGRUPO1(ID, FABCOMP_TIPOMATERIAL_ID, FABCOMP_SG1_TM_ID) VALUES(?, ?, ?) RETURNING ID";

    executeQuery(ssql, params, callback);
};

const Editar = (id, tipoMaterial, sg1Tm) => {
    return new Promise((resolve, reject) => {
        let ssql = 'UPDATE FABCOMP_TM_SUBGRUPO1 SET ';
        const params = [];

        if (tipoMaterial) {
            ssql += 'FABCOMP_TIPOMATERIAL_ID = ?, ';
            params.push(tipoMaterial);
        }

        if (sg1Tm) {
            ssql += 'FABCOMP_SG1_TM_ID = ?, ';
            params.push(sg1Tm);
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
    let ssql = "DELETE FROM FABCOMP_TM_SUBGRUPO1 WHERE ID = ? "; //AND DELETED_AT = ''

    executeQuery(ssql, params, callback)
};

export default { Listar, Inserir, Editar, Deletar }