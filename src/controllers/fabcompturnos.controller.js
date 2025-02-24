import ServiceFabcompTurnos from '../services/fabcompturnos.service.js'

const Listar = (req, res) => {
    const turno = req.params.turno
    const descricao = req.params.descricao
    const horaInicialTurno = req.params.hora_inicial_turno
    const horaFinalTurno = req.params.hora_final_turno
    const horasProgramada = req.params.horas_programada
    const tempoDeAlmoco = req.params.tempodealmoco

    ServiceFabcompTurnos.Listar(turno, descricao, horaInicialTurno, horaFinalTurno, horasProgramada, tempoDeAlmoco)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
};

const Inserir = (req, res) => {
    const turno = req.body.turno
    const descricao = req.body.descricao
    const horaInicialTurno = req.body.hora_inicial_turno
    const horaFinalTurno = req.body.hora_final_turno
    const horasProgramada = req.body.horas_programada
    const tempoDeAlmoco = req.body.tempodealmoco

    ServiceFabcompTurnos.Inserir(turno, descricao, horaInicialTurno, horaFinalTurno, horasProgramada, tempoDeAlmoco, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json({ id: result.id });
    });
};

const Editar = (req, res) => {
    const id = parseInt(req.params.id, 10)
    const turno = req.body.turno
    const descricao = req.body.descricao
    const horaInicialTurno = req.body.hora_inicial_turno
    const horaFinalTurno = req.body.hora_final_turno
    const horaProgramada = req.body.horas_programada
    const tempoDeAlmoco = req.body.tempodealmoco

    ServiceFabcompTurnos.Editar(id, turno, descricao, horaInicialTurno, horaFinalTurno, horaProgramada, tempoDeAlmoco,)
        .then(() => {
            res.status(200).json({ message: 'Grupo estoque atualizado com sucesso' });
        })
        .catch((err) => {
            res.status(500).json(err);
        });

};

const Deletar =  (req, res) => {
    const id = parseInt(req.params.id, 10)

    ServiceFabcompTurnos.Deletar(id)
    .then(() => {
        res.status(200).json({ message: 'Grupo estoque atualizado com sucesso' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

};

const Deletar2 = (req, res) => {
    let id = parseInt(req.params.id, 10);

    ServiceFabcompTurnos.Deletar(id, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            if (result && result.length === 0) {
                res.status(404).json({ message: "Grupo-Estoque não encontrado." });
            } else {
                res.status(200).json({ message: "Grupo-Estoque excluído com sucesso." });
            }
        }
    });
};

export default { Listar, Inserir, Editar, Deletar }