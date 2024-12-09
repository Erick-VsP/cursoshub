const db = require('../config/db');

exports.getInscricoes = (req, res) => {
    db.query('SELECT * FROM inscricao', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar inscrições');
            return;
        }
        res.json(results);
    });
};

exports.createInscricao = (req, res) => {
    const { id_estudante, id_curso, data_inscricao } = req.body;
    db.query('INSERT INTO inscricao (id_estudante, id_curso, data_inscricao) VALUES (?, ?, ?)',
        [id_estudante, id_curso, data_inscricao], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao criar inscrição');
            return;
        }
        res.status(201).send('Inscrição criada com sucesso');
    });
};
