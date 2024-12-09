const db = require('../config/db');

exports.getInstrutores = (req, res) => {
    db.query('SELECT * FROM instrutor', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar instrutores');
            return;
        }
        res.json(results);
    });
};

exports.createInstrutor = (req, res) => {
    const { nome_instrutor, cpf_instrutor, telefone_instrutor, email_instrutor } = req.body;
    db.query('INSERT INTO instrutor (nome_instrutor, cpf_instrutor, telefone_instrutor, email_instrutor) VALUES (?, ?, ?, ?)',
        [nome_instrutor, cpf_instrutor, telefone_instrutor, email_instrutor], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao criar instrutor');
            return;
        }
        res.status(201).send('Instrutor criado com sucesso');
    });
};
