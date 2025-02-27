import {
    executeQuery,
    dbOptions,
    firebird,
    executeQueryTransaction,
} from "../config/database.js";

//// PRODUTOS -------------------------------------

const Listar = (descricao, p_aprazo, limit, skip, callback) => {
    let filter = [];
    let ssql = 'SELECT';
    ssql += ` FIRST ${limit} SKIP ${skip}`
    //ssql += ` ROW_NUMBER() OVER (ORDER BY CREATED_AT ASC) AS CODIGO,`
    //ssql += ` COUNT(*) OVER () AS TOTAL_REGISTROS,`
    ssql += " * FROM PRODUTOS WHERE ID_PRODUTO > 0 "; //AND DELETED_AT = ''

    if (descricao) {
        ssql += "and descricao like ?";
        filter.push("%" + descricao + "%");
    }

    if (p_aprazo) {
        ssql += "and p_aprazo >= ?";
        filter.push(p_aprazo);
    }

    executeQuery(ssql, filter, callback);
};

const Inserir = (descricao, p_aprazo, callback) => {
    let params = [descricao, p_aprazo];
    let ssql =
        "INSERT INTO PRODUTOS(DESCRICAO, p_aprazo) VALUES(?, ?) RETURNING ID_PRODUTO";

    executeQuery(ssql, params, callback);
};

const Editar = (id, descricao, p_aprazo) => {
    return new Promise((resolve, reject) => {
        let ssql = 'UPDATE PRODUTOS SET ';
        const params = [];

        if (descricao) {
            ssql += "DESCRICAO = ?, ";
            params.push(descricao);
        }

        if (p_aprazo) {
            ssql += "p_aprazo = ?, ";
            params.push(p_aprazo);
        }

        ssql = ssql.slice(0, -2);

        ssql += ' WHERE ID_PRODUTO = ?';
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
    let ssql = "DELETE FROM PRODUTOS WHERE ID_PRODUTO = ?";

    executeQuery(ssql, params, callback)
};

export default { Listar, Inserir, Editar, Deletar }