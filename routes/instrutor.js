const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const instrutorController = require('../controllers/instrutorController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, instrutorController.getInstrutores);

router.post('/',
    verifyToken,
    [
        body('nome_instrutor').not().isEmpty().withMessage('Nome do instrutor é obrigatório'),
        body('cpf_instrutor').isLength({ min: 11, max: 11 }).withMessage('CPF deve ter 11 caracteres'),
        body('telefone_instrutor').isLength({ min: 10, max: 15 }).withMessage('Telefone deve ter entre 10 e 15 caracteres'),
        body('email_instrutor').isEmail().withMessage('Email deve ser válido')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        instrutorController.createInstrutor(req, res);
    }
);

module.exports = router;
