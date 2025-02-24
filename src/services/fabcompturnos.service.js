import {
    executeQuery,
    dbOptions,
    firebird,
    executeQueryTransaction,
} from "../config/database.js";

const Listar = (turno, descricao, horaInicialTurno, horaFinalTurno, horasProgramada, tempoDeAlmoco) => {
    return new Promise((resolve, reject) => {
        let ssql = 'SELECT ID, TURNO, DESCRICAO, HORA_INICIAL_TURNO, HORA_FINAL_TURNO, HORAS_PROGRAMADA, TEMPODEALMOCO, CREATED_AT, UPDATED_AT FROM FABCOMP_TURNOS WHERE DELETED_AT IS NULL ';
        let params = [];

        if (turno) {
            ssql += 'AND TURNO = ? ';
            params.push(turno);
        }

        if (descricao) {
            ssql += 'AND DESCRICAO = ? ';
            params.push(descricao);
        }

        if (horaInicialTurno) {
            ssql += 'AND HORA_INICIAL_TURNO = ? ';
            params.push(horaInicialTurno);
        }

        if (horaFinalTurno) {
            ssql += 'AND HORA_FINAL_TURNO = ? ';
            params.push(horaFinalTurno);
        }

        if (horasProgramada) {
            ssql += 'AND HORA_PROGRAMADA = ? ';
            params.push(horaProgramada);
        }

        if (tempoDeAlmoco) {
            ssql += 'AND TEMPODEALMOCO = ? ';
            params.push(tempoDeAlmoco);
        }

        console.log('SQL:', ssql);
        console.log('Params:', params);

        firebird.attach(dbOptions, (err, db) => {
            if (err) return reject({ error: 'Erro ao conectar no banco de dados', details: err });

            db.transaction(firebird.ISOLATION_READ_COMMITTED, (err, transaction) => {
                if (err) return reject({ error: 'Erro ao iniciar transação', details: err });

                transaction.query(ssql, params, (err, result) => {
                    if (err) {
                        console.error('Erro ao executar busca:', err);
                        transaction.rollback();
                        return reject({ error: 'Erro ao executar busca', details: err });
                    }

                    transaction.commit((err) => {
                        if (err) {
                            console.error('Erro ao cometer transação:', err);
                            transaction.rollback();
                            return reject({ error: 'Erro ao cometer transação', details: err });
                        }
                        console.log('Resultado:', result);
                        resolve(result);
                    });
                });
            });
        });
    });
};

const Inserir = (turno, descricao, horaInicialTurno, horaFinalTurno, horasProgramada, tempoDeAlmoco, callback) => {
    let ssqlMaxId = "SELECT MAX(ID) AS MAX_ID FROM FABCOMP_TURNOS";
    
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
            let params = [newId, turno, descricao, horaInicialTurno, horaFinalTurno, horasProgramada, tempoDeAlmoco];
            let ssqlInsert = "INSERT INTO FABCOMP_TURNOS(ID, TURNO, DESCRICAO, HORA_INICIAL_TURNO, HORA_FINAL_TURNO, HORAS_PROGRAMADA, TEMPODEALMOCO, CREATED_AT) VALUES(?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP) RETURNING ID";

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

const Editar = (id,  turno, descricao, horaInicialTurno, horaFinalTurno, horasProgramada, tempoDeAlmoco,) => {
    return new Promise((resolve, reject) => {
        let ssql = 'UPDATE FABCOMP_TURNOS SET UPDATED_AT = CURRENT_TIMESTAMP, ';
        const params = [];

        if (turno) {
            ssql += 'TURNO = ?, ';
            params.push(turno);
        }

        if (descricao) {
            ssql += 'DESCRICAO = ?, ';
            params.push(descricao);
        }

        if (horaInicialTurno) {
            ssql += 'HORA_INICIAL_TURNO = ?, ';
            params.push(horaInicialTurno);
        }

        if (horaFinalTurno) {
            ssql += 'HORA_FINAL_TURNO = ?, ';
            params.push(horaFinalTurno);
        }

        if (horasProgramada) {
            ssql += 'HORAS_PROGRAMADA = ?, ';
            params.push(horasProgramada);
        }

        if (tempoDeAlmoco) {
            ssql += 'TEMPODEALMOCO = ?, ';
            params.push(tempoDeAlmoco);
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
        let ssql = 'UPDATE FABCOMP_TURNOS SET DELETED_AT = CURRENT_TIMESTAMP, ';
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
    let ssql = "DELETE FROM FABCOMP_TURNOS WHERE ID = ? "; //AND DELETED_AT = ''

    executeQuery(ssql, params, callback)
};

export default { Listar, Inserir, Editar, Deletar }