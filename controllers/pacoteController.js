const db = require('../config/db');

exports.getPacotes = (req, res) => {
    db.query('SELECT * FROM pacote', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar pacotes');
            return;
        }
        res.json(results);
    });
};

exports.createPacote = (req, res) => {
    const { nome_pacote, descricao_pacote } = req.body;
    db.query('INSERT INTO pacote (nome_pacote, descricao_pacote) VALUES (?, ?)',
        [nome_pacote, descricao_pacote], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao criar pacote');
            return;
        }
        res.status(201).send('Pacote criado com sucesso');
    });
};
