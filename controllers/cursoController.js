const db = require('../config/db');

exports.getCursos = (req, res) => {
    db.query('SELECT * FROM curso', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar cursos');
            return;
        }
        res.json(results);
    });
};

exports.createCurso = (req, res) => {
    const { nome_curso, descricao_curso, carga_horaria_curso, link_video, id_instrutor, id_funcionario } = req.body;
    db.query('INSERT INTO curso (nome_curso, descricao_curso, carga_horaria_curso, link_video, id_instrutor, id_funcionario) VALUES (?, ?, ?, ?, ?, ?)',
        [nome_curso, descricao_curso, carga_horaria_curso, link_video, id_instrutor, id_funcionario], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao criar curso');
            return;
        }
        res.status(201).send('Curso criado com sucesso');
    });
};
