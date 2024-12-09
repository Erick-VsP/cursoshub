const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.register = (req, res) => {
    const { nome_funcionario, cpf_funcionario, telefone_funcionario, email_funcionario, senha_funcionario } = req.body;
    const hashedPassword = bcrypt.hashSync(senha_funcionario, 8);

    db.query('INSERT INTO funcionario (nome_funcionario, cpf_funcionario, telefone_funcionario, email_funcionario, senha_funcionario) VALUES (?, ?, ?, ?, ?)',
        [nome_funcionario, cpf_funcionario, telefone_funcionario, email_funcionario, hashedPassword], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao registrar funcionário');
            return;
        }
        res.status(201).send('Funcionário registrado com sucesso');
    });
};

exports.login = (req, res) => {
    const { email_funcionario, senha_funcionario } = req.body;

    db.query('SELECT * FROM funcionario WHERE email_funcionario = ?', [email_funcionario], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar funcionário');
            return;
        }

        if (results.length === 0 || !bcrypt.compareSync(senha_funcionario, results[0].senha_funcionario)) {
            res.status(401).send('Email ou senha inválidos');
            return;
        }

        const token = jwt.sign({ id: results[0].id_funcionario }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ auth: true, token: token });
    });
};
