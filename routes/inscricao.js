const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const inscricaoController = require('../controllers/inscricaoController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, inscricaoController.getInscricoes);

router.post('/',
    verifyToken,
    [
        body('id_estudante').isInt().withMessage('ID do estudante deve ser um número inteiro'),
        body('id_curso').isInt().withMessage('ID do curso deve ser um número inteiro'),
        body('data_inscricao').isDate().withMessage('Data de inscrição deve ser uma data válida')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        inscricaoController.createInscricao(req, res);
    }
);

module.exports = router;
