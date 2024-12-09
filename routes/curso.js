const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, cursoController.getCursos);

router.post('/',
    verifyToken,
    [
        body('nome_curso').not().isEmpty().withMessage('Nome do curso é obrigatório'),
        body('descricao_curso').not().isEmpty().withMessage('Descrição é obrigatória'),
        body('carga_horaria_curso').isInt().withMessage('Carga horária deve ser um número inteiro'),
        body('link_video').isURL().withMessage('Link do vídeo deve ser uma URL válida'),
        body('id_instrutor').isInt().withMessage('ID do instrutor deve ser um número inteiro'),
        body('id_funcionario').isInt().withMessage('ID do funcionário deve ser um número inteiro')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        cursoController.createCurso(req, res);
    }
);

module.exports = router;
