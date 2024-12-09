const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const cursoPacoteController = require('../controllers/curso_pacoteController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, cursoPacoteController.getCursosPacotes);

router.post('/',
    verifyToken,
    [
        body('id_curso').isInt().withMessage('ID do curso deve ser um número inteiro'),
        body('id_pacote').isInt().withMessage('ID do pacote deve ser um número inteiro')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        cursoPacoteController.createCursoPacote(req, res);
    }
);

module.exports = router;
