const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const pacoteController = require('../controllers/pacoteController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, pacoteController.getPacotes);

router.post('/',
    verifyToken,
    [
        body('nome_pacote').not().isEmpty().withMessage('Nome do pacote é obrigatório'),
        body('descricao_pacote').not().isEmpty().withMessage('Descrição é obrigatória')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        pacoteController.createPacote(req, res);
    }
);

module.exports = router;
