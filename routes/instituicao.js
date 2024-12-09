const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const instituicaoController = require('../controllers/instituicaoController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, instituicaoController.getInstituicoes);

router.post('/',
    verifyToken,
    [
        body('nome_inst').not().isEmpty().withMessage('Nome da instituição é obrigatório'),
        body('cnpj_inst').isLength({ min: 14, max: 14 }).withMessage('CNPJ deve ter 14 caracteres'),
        body('responsavel_inst').not().isEmpty().withMessage('Nome do responsável é obrigatório'),
        body('telefone_inst').isLength({ min: 10, max: 15 }).withMessage('Telefone deve ter entre 10 e 15 caracteres'),
        body('id_funcionario').isInt().withMessage('ID do funcionário deve ser um número inteiro')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        instituicaoController.createInstituicao(req, res);
    }
);

module.exports = router;
