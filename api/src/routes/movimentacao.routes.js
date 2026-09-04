const express = require('express');

const router = express.Router();

const movimentacaoController = require('../controllers/movimentacao.controller');

router.get('/', movimentacaoController.listarMovimentacoes);
router.post('/', movimentacaoController.registrarMovimentacao);


module.exports = router;