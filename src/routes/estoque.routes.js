const express = require('express')
const router = express.Router()

const estoqueController = require('../controllers/estoque.controller')

// Rota pública de login
router.post('/estoque', estoqueController.cadastrar)
router.patch('/estoque/:idProduto', estoqueController.atualizar)

module.exports = router
