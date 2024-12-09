const db = require('../config/db');

exports.getEscolhasPacotes = (req, res) => {
    db.query('SELECT * FROM escolha_pacote', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar escolhas dos pacotes');
            return;
        }
        res.json(results);
    });
};

exports.createEscolhaPacote = (req, res) => {
    const { id_inst, id_empresa, id_pacote } = req.body;
    db.query('INSERT INTO escolha_pacote (id_inst, id_empresa, id_pacote) VALUES (?, ?, ?)',
        [id_inst, id_empresa, id_pacote], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao criar escolha do pacote');
            return;
        }
        res.status(201).send('Escolha do pacote criada com sucesso');
    });
};
