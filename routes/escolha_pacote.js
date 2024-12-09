const express = require('express');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const escolhaPacoteController = require('../controllers/escolha_pacoteController');
const {verifyToken} = require('../middlewares/middleware');

router.get('/', verifyToken, escolhaPacoteController.getEscolhasPacotes);
router.post('/', verifyToken, escolhaPacoteController.createEscolhaPacote);

module.exports = router;
