const express = require('express')
const cors = require('cors')

const app = express()

// ------------------ Middlewares globais ------------------
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
// ---------------------------------------------------------


// ------------------------- Rotas -------------------------
const usuarioRoutes = require('../routes/usuario.routes')
const authRoutes = require('../routes/auth.routes')
const produtoRoutes = require('../routes/produto.routes')
const pedidoRoutes = require('../routes/pedido.routes')
const estoqueRoutes = require('../routes/estoque.routes')
// ---------------------------------------------------------


// -------------------- Rotas Públicas ---------------------
// Usuário
app.use('/usuario', usuarioRoutes)

// Login
app.use('/', authRoutes)
// ---------------------------------------------------------


// -------------------- Rotas Privadas ---------------------
// Pedido
app.use('/pedido', pedidoRoutes)

// Produto
app.use('/produto', produtoRoutes)

// Estoque
app.use('/produto', estoqueRoutes)
// ---------------------------------------------------------


app.get('/', (req, res) => {

    res.status(200).json({message: 'API funcionando!'})
})

module.exports = app
