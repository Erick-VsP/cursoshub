const db = require('../config/db');

exports.getEstudantes = (req, res) => {
    db.query('SELECT * FROM estudante', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar estudantes');
            return;
        }
        res.json(results);
    });
};

exports.createEstudante = (req, res) => {
    const { matricula_estudante, nome_estudante, id_inst, cpf_estudante, datanascimento_estudante, idade_estudante, senha_estudante } = req.body;
    db.query('INSERT INTO estudante (matricula_estudante, nome_estudante, id_inst, cpf_estudante, datanascimento_estudante, idade_estudante, senha_estudante) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [matricula_estudante, nome_estudante, id_inst, cpf_estudante, datanascimento_estudante, idade_estudante, senha_estudante], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao criar estudante');
            return;
        }
        res.status(201).send('Estudante criado com sucesso');
    });
};
