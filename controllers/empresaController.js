const db = require('../config/db');

exports.getEmpresas = (req, res) => {
    db.query('SELECT * FROM empresa', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar empresas');
            return;
        }
        res.json(results);
    });
};

exports.createEmpresa = (req, res) => {
    const { nome_empresa, cnpj_empresa, responsavel_empresa, telefone_empresa, id_funcionario } = req.body;
    db.query('INSERT INTO empresa (nome_empresa, cnpj_empresa, responsavel_empresa, telefone_empresa, id_funcionario) VALUES (?, ?, ?, ?, ?)',
        [nome_empresa, cnpj_empresa, responsavel_empresa, telefone_empresa, id_funcionario], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao criar empresa');
            return;
        }
        res.status(201).send('Empresa criada com sucesso');
    });
};
