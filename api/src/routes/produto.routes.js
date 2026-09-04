const express = require('express');

const router = express.Router();

const produtoController = require('../controllers/produto.controller');

router.get('/', produtoController.listarProdutos);

router.get('/buscar', produtoController.buscarProdutos);

router.post('/', produtoController.cadastrarProduto);

router.put('/:id', produtoController.editarProduto);

router.delete('/:id', produtoController.excluirProduto);

module.exports = router;