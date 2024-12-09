const db = require('../config/db');
const redisClient = require('../config/redis');

exports.getInstituicoes = (req, res) => {
    redisClient.get('instituicoes', (err, data) => {
        if (err) throw err;

        if (data !== null) {
            return res.json(JSON.parse(data));
        } else {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;

            db.query('SELECT * FROM instituicao LIMIT ?, ?', [offset, limit], (err, results) => {
                if (err) {
                    res.status(500).send('Erro ao buscar instituições');
                    return;
                }
                redisClient.setex('instituicoes', 3600, JSON.stringify(results)); // Cache por 1 hora
                res.json(results);
            });
        }
    });
};



exports.createInstituicao = (req, res) => {
    const { nome_inst, cnpj_inst, responsavel_inst, telefone_inst, id_funcionario } = req.body;
    db.query('INSERT INTO instituicao (nome_inst, cnpj_inst, responsavel_inst, telefone_inst, id_funcionario) VALUES (?, ?, ?, ?, ?)',
        [nome_inst, cnpj_inst, responsavel_inst, telefone_inst, id_funcionario], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao criar instituição');
            return;
        }
        res.status(201).send('Instituição criada com sucesso');
    });
};
