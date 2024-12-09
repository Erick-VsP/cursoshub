const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const estudanteController = require('../controllers/estudanteController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, estudanteController.getEstudantes);

router.post('/',
    verifyToken,
    [
        body('matricula_estudante').isInt().withMessage('Matrícula deve ser um número inteiro'),
        body('nome_estudante').not().isEmpty().withMessage('Nome do estudante é obrigatório'),
        body('id_inst').isInt().withMessage('ID da instituição deve ser um número inteiro'),
        body('cpf_estudante').isLength({ min: 11, max: 11 }).withMessage('CPF deve ter 11 caracteres'),
        body('datanascimento_estudante').isDate().withMessage('Data de nascimento deve ser uma data válida'),
        body('idade_estudante').isInt().withMessage('Idade deve ser um número inteiro'),
        body('senha_estudante').not().isEmpty().withMessage('Senha é obrigatória')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        estudanteController.createEstudante(req, res);
    }
);

module.exports = router;
