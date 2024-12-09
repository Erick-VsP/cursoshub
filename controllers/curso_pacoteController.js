const db = require('../config/db');

exports.getCursosPacotes = (req, res) => {
    db.query('SELECT * FROM curso_pacote', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar cursos dos pacotes');
            return;
        }
        res.json(results);
    });
};

exports.createCursoPacote = (req, res) => {
    const { id_curso, id_pacote } = req.body;
    db.query('INSERT INTO curso_pacote (id_curso, id_pacote) VALUES (?, ?)',
        [id_curso, id_pacote], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao criar curso do pacote');
            return;
        }
        res.status(201).send('Curso do pacote criado com sucesso');
    });
};
