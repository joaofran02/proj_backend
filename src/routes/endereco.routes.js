const express = require('express')
const router = express.Router()

const {
    criar,
    listar,
    atualizar,
    apagar
} = require('../controllers/endereco.controller')

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware')

// POST /endereco
router.post(
    '/',
    authMiddleware,
    criar
)

// GET /endereco
router.get(
    '/',
    authMiddleware,
    listar
)

// PATCH /endereco/:id
router.patch(
    '/:id',
    authMiddleware,
    atualizar
)

// DELETE /endereco/:id
router.delete(
    '/:id',
    authMiddleware,
    apagar
)

module.exports = router